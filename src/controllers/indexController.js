
const path = require('path');
const db = require('../database/models');


let indexController = {

    main: (req,res) => {

        res.render(path.join(__dirname,'../views/index.ejs'));

    },

    login: (req,res) => {


        db.asesores.findAll({raw: true}).then((lista_asesores) => {

            const { asesor, password } = req.body;
            let listaAsesores = lista_asesores;

            const user = listaAsesores.find((user) => user.name === asesor);

            if (!user || user.password !== password) {
                return res.render(path.join(__dirname,'../views/index.ejs'));
            }

            req.session.isAuthenticated = true; 
            req.session.name = asesor;
            res.redirect("/inicio");

        }).catch((err)=>console.log(err));
    },

    logout: (req,res) => {

        req.session.destroy();
        res.redirect('/');

    }


}


module.exports = indexController;