
const path = require('path');
const db = require('../database/models');


let inicioController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        res.render(path.join(__dirname,'../views/inicio.ejs'),{isAdmin: req.session.isAdmin} );

    }
}

module.exports = inicioController;