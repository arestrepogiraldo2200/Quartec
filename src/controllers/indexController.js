
const path = require('path');
const db = require('../database/models');
const bcrypt = require('bcrypt');


let indexController = {

    main: (req,res) => {

        res.render(path.join(__dirname,'../views/index.ejs'));

    },

    login: (req,res) => {


        db.asesores.findAll({raw: true}).then((lista_asesores) => {

            const { asesor, password } = req.body;
            let listaAsesores = lista_asesores;

            const user = listaAsesores.find((user) => user.name === asesor);

            if (!user) {
                return res.render(path.join(__dirname,'../views/index.ejs'));
            }

            if (bcrypt.compareSync(password, user.password)){

                req.session.isAuthenticated = true; 
                req.session.name = asesor;
                req.session.isAdmin = user.is_admin;
    
                res.redirect("/inicio");

            } else {

                if (user.password === password){

                    req.session.isAuthenticated = true; 
                    req.session.name = asesor;
                    req.session.isAdmin = user.is_admin;
        
                    res.redirect("/inicio");
                    
                } else {
                    return res.render(path.join(__dirname,'../views/index.ejs'));
                }
            }

        }).catch((err)=>console.log(err));
    },

    logout: (req,res) => {

        req.session.destroy();
        res.redirect('/');

    }
}


module.exports = indexController;