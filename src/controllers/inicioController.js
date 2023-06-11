
const path = require('path');

let inicioController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        res.render(path.join(__dirname,'../views/inicio.ejs'));

    }
}


module.exports = inicioController;