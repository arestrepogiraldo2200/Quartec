
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

    },

    createUser: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');

        res.render(path.join(__dirname, '../views/crear_asesor'));    

    },

    createUserPost:  (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');


        db.asesores.create({

            name: req.body.usuario,
            password: req.body.contrasena,
            is_admin: 0,

        }).then( () => {res.redirect('/inicio');}).catch((err) => console.log(err));

    },

    deleteUser: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');

        db.asesores.findAll({raw: true}).then((asesores) => {

            res.render(path.join(__dirname, '../views/eliminar_asesor'), {Asesores: asesores});    

        }).catch((err)=>console.log(err));
    },

    deleteUserPost: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');

        db.asesores.destroy({
            where :{
              name : req.body.select
            }
          }).then( () => {
  
              res.redirect('/inicio');
  
          }).catch((err) => console.log(err));

    }
}

module.exports = userController;