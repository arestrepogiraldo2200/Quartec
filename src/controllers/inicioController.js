
const path = require('path');
const db = require('../database/models');
const fs = require('fs');


let inicioController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        // Removes all files in directory files
        const rmDir = function (dirPath, removeSelf) {
            if (removeSelf === undefined)
                removeSelf = true;
            try {
                var files = fs.readdirSync(dirPath);
            } catch (e) {
                // throw e
                return;
            }
            if (files.length > 0)
                for (let i = 0; i < files.length; i++) {
                const filePath = path.join(dirPath, files[i]);
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    rmDir(filePath);
                }
            if (removeSelf)
                fs.rmdirSync(dirPath);
        };

        
        rmDir('./public/files',false);
        res.render(path.join(__dirname,'../views/inicio.ejs'),{isAdmin: req.session.isAdmin} );

    }
}

module.exports = inicioController;