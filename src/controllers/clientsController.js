
const path = require('path');
const db = require('../database/models');


let clientsController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        res.render(path.join(__dirname, '../views/cliente'));
    },

    create: (req,res) => {

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
                       
            client: req.body.cliente || "",
            name: req.body.clientealt || "",
            name2: req.body.clientealt1 || "",
            NIT: NIT_or_CC[0] || "",
            CC: NIT_or_CC[1] || "",
            direction: req.body.direccion || "",
            direction_send: req.body.direccionenvio || "",
            telefono1: req.body.telefono1 || "",
            telefono2: req.body.telefono2 || "",
            telefono3: req.body.telefono3 || "",
            billing_email: req.body.emailfacturacion || "",
            email1: req.body.email1 || "",
            email2: req.body.email2 || "",
            email3: req.body.email3 || "",
            email4: req.body.email4 || "",

            }).then( () => {
                
                res.redirect('/inicio');
            
            }).catch((err) => console.log(err));
        
    }
}

module.exports = clientsController;