
const path = require('path');
const db = require('../database/models');
var sessionStorage = require('sessionstorage');
const ls = require('local-storage');


let clientsController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        res.render(path.join(__dirname, '../views/cliente'));
    },

    create: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let NIT_or_CC = [];

        if (req.body.nitorcc == "NIT"){
            NIT_or_CC.push(req.body.nit_cc);
            NIT_or_CC.push("");
        } else {
            NIT_or_CC.push("");
            NIT_or_CC.push(req.body.nit_cc);
        }

        db.clientes.create(
            {
                       
            client: req.body.cliente || "-",
            name: req.body.clientealt || "-",
            name2: req.body.clientealt1 || "-",
            NIT: NIT_or_CC[0] || "-",
            CC: NIT_or_CC[1] || "-",
            direction: req.body.direccion || "-",
            direction_send: req.body.direccionenvio || "-",
            telefono1: req.body.telefono1 || "-",
            telefono2: req.body.telefono2 || "-",
            telefono3: req.body.telefono3 || "-",
            billing_email: req.body.emailfacturacion || "-",
            email1: req.body.email1 || "-",
            email2: req.body.email2 || "-",
            email3: req.body.email3 || "-",
            email4: req.body.email4 || "-",

            }).then( () => {
                
                res.redirect('/inicio');
            
            }).catch((err) => console.log(err));
        
    },

    selectClient: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        
        db.clientes.findAll({raw: true}).then((listadeclientes) => {

            res.render(path.join(__dirname, '../views/editar_cliente'), {clientes : listadeclientes});    

        }).catch((err)=>console.log(err));
    },

    selectClientPost: (req,res) => {

        if (!req.body.select) return res.redirect('/editar-cliente');

        ls.set("clientToEdit", req.body.select);
        res.redirect("/editar-cliente-form");
    },

    editClientGetForm: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let clientToEdit = ls.get("clientToEdit");

        db.clientes.findOne({raw: true, where: { client: clientToEdit } }).then((clientFound) => {

            if (clientFound){
                ls.remove("clientToEdit");
                res.render(path.join(__dirname, '../views/editar_cliente_form'), {cliente : clientFound}); 
            } else {
                res.redirect('/editar-cliente');
            }

        }).catch((err)=>{
            console.log(err)
        });
    },

    editClientPostForm: (req,res) => {

        let NIT_or_CC = [];

        if (req.body.nitorcc == "NIT"){
            NIT_or_CC.push(req.body.nit_cc);
            NIT_or_CC.push("");
        } else {
            NIT_or_CC.push("");
            NIT_or_CC.push(req.body.nit_cc);
        }


        db.clientes.update({

            client: req.body.cliente || "-",
            name: req.body.clientealt || "-",
            name2: req.body.clientealt1 || "-",
            NIT: NIT_or_CC[0] || "-",
            CC: NIT_or_CC[1] || "-",
            direction: req.body.direccion || "-",
            direction_send: req.body.direccionenvio || "-",
            telefono1: req.body.telefono1 || "-",
            telefono2: req.body.telefono2 || "-",
            telefono3: req.body.telefono3 || "-",
            billing_email: req.body.emailfacturacion || "-",
            email1: req.body.email1 || "-",
            email2: req.body.email2 || "-",
            email3: req.body.email3 || "-",
            email4: req.body.email4 || "-",

        },
        {
          where:{id: req.body.id}
        }).then( () => {res.redirect('/inicio');}).catch((err) => console.log(err));

    },

    deleteClient: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/');
        
        db.clientes.findAll({raw: true}).then((listadeclientes) => {

            res.render(path.join(__dirname, '../views/eliminar_cliente'), {clientes : listadeclientes});    

        }).catch((err)=>console.log(err));

    },

    deleteClientPost: (req,res) => {

        if (!req.session.isAdmin) return res.redirect('/');
        if (!req.body.select) return res.redirect('/eliminar-cliente');


        db.clientes.destroy({
          where :{
            client : req.body.select
          }
        }).then( () => {

            res.redirect('/inicio');

        }).catch((err) => console.log(err));
        
    },
}



module.exports = clientsController;