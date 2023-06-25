
const path = require('path');
const db = require('../database/models');


let preciosController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');

        db.corte.findAll({raw: true}).then((listadecorte)=>{
            db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                    db.material.findAll({raw: true}).then((listadematerial)=>{

                        res.render(path.join(__dirname, '../views/precios'), {listaDeCorte: listadecorte, listaDeDoblez: listadedoblez, listaDePiercing: listadepiercing, listaDeMaterial: listadematerial} );

                    }).catch((err)=>console.log(err));
                }).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err));
         }).catch((err)=>console.log(err));
    },

    writeData: (req,res) => {

        console.log(req.body);
        res.redirect("/");


    }
}

module.exports = preciosController;