
const path = require('path');
const db = require('../database/models');


let preciosController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/inicio');

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

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/inicio');

        let numcalibres = 25;

        // Edit the cut prices --------------------------------------------------------------------------------------------------
        for (let i = 0; i < numcalibres; i++){

            db.corte.update({
                "Ac. H.R": req.body[`corte_precio_HR${i}`],
                "Ac. C.R": req.body[`corte_precio_CR${i}`],
                "Ac. Inox. 304": req.body[`corte_precio_304${i}`],
                "Ac. Inox. 316": req.body[`corte_precio_316${i}`],
                "Ac. Inox. 430": req.body[`corte_precio_430${i}`],
                "Galv.": req.body[`corte_precio_Galv${i}`],
                "Alum.": req.body[`corte_precio_Alum${i}`],
                "Bronce": req.body[`corte_precio_Bronce${i}`],
                "Cobre": req.body[`corte_precio_Cobre${i}`],
                "Latón": req.body[`corte_precio_Laton${i}`],
            },{ where:{id: req.body[`corte_id${i}`] }}).then(() => {}).catch((err)=>console.log(err));
        }

        // Edit the folding prices --------------------------------------------------------------------------------------------------
        for (let i = 0; i < numcalibres; i++){

            db.doblez.update({
                "fold": req.body[`doblez_precio${i}`],
            },{ where:{id: req.body[`doblez_id${i}`] }}).then(() => {}).catch((err)=>console.log(err));
        }

        // Edit the piercing prices --------------------------------------------------------------------------------------------------
        for (let i = 0; i < numcalibres; i++){

            db.piercing.update({
                "piercing": req.body[`piercing_precio${i}`],
            },{ where:{id: req.body[`piercing_id${i}`] }}).then(() => {}).catch((err)=>console.log(err));
        }

        // Edit the material prices --------------------------------------------------------------------------------------------------
        // for (let i = 0; i < numcalibres; i++){

        //     db.material.update({
        //         "Ac. H.R": req.body[`material_precio_HR${i}`],
        //         "Ac. C.R": req.body[`material_precio_CR${i}`],
        //         "Ac. Inox. 304": req.body[`material_precio_304${i}`],
        //         "Ac. Inox. 316": req.body[`material_precio_316${i}`],
        //         "Ac. Inox. 430": req.body[`material_precio_430${i}`],
        //         "Galv.": req.body[`material_precio_Galv${i}`],
        //         "Alum.": req.body[`material_precio_Alum${i}`],
        //         "Bronce": req.body[`material_precio_Bronce${i}`],
        //         "Cobre": req.body[`material_precio_Cobre${i}`],
        //         "Latón": req.body[`material_precio_Laton${i}`],
        //     },{ where:{id: req.body[`material_id${i}`] }}).then(() => {}).catch((err)=>console.log(err));
        // }
                
        let updateData = {};
        updateData[req.body.materialcambio] = req.body.preciocambio/req.body.areacambio;

        db.material.update(updateData,{ where:{width: req.body.espesorcambio }}).then(() => {}).catch((err)=>console.log(err));
       
        res.redirect("/inicio");
    }
}

module.exports = preciosController;