
const path = require('path');
const db = require('../database/models');


let userController = {

    getForm: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        db.asesores.findOne({raw: true, where: { name : req.session.name } }).then((asesor) => {

            res.render(path.join(__dirname, '../views/editar_datos'), {asesorData : asesor});    

        }).catch((err)=>console.log(err));
    },

    postForm: (req,res) => {


        db.asesores.update({

            name: req.body.usuario || "-",
            password: req.body.contrasena || "-"
        },
        {
          where:{id: req.body.id}
        }).then( () => {res.redirect('/inicio');}).catch((err) => console.log(err));

    }
}

module.exports = userController;