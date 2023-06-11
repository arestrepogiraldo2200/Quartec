
const path = require('path');
const db = require('../database/models');


let cotizacionController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        
        db.clientes.findAll({raw: true}).then((listadeclientes)=>
        {

            db.asesores.findAll({raw: true}).then((listadeasesores) => {

                res.render(path.join(__dirname, '../views/cotizacion'), {clientes : listadeclientes, asesores : listadeasesores});    

            }).catch((err)=>console.log(err));

        }).catch((err)=>console.log(err));
    }
}

module.exports = cotizacionController;