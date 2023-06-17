
const path = require('path');
const db = require('../database/models');
var Excel = require('exceljs');

let cotizacionController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        
        db.clientes.findAll({raw: true}).then((listadeclientes)=>
        {
            db.asesores.findAll({raw: true}).then((listadeasesores) => {

                res.render(path.join(__dirname, '../views/cotizacion'), {clientes : listadeclientes, asesor : req.session.name});    

            }).catch((err)=>console.log(err));

        }).catch((err)=>console.log(err));
    },

    createFile: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
      
        db.clientes.findOne({raw: true, where: { client: req.body.selectclient } }).then((clientFound) => {


            var workbook = new Excel.Workbook();

            workbook.xlsx.readFile('./PlantillaCotizaciones.xlsm').then(  function() {
            
                let worksheet = workbook.getWorksheet('Cot. Cliente');

                // Datos cliente

                let NITorCC;

                if (clientFound.NIT == "-"){
                    NITorCC = clientFound.CC;
                } else {
                    NITorCC = clientFound.NIT;
                }

                worksheet.getCell('D9').value = clientFound.client;
                worksheet.getCell('D10').value = NITorCC;
                worksheet.getCell('D11').value = clientFound.direction;
                worksheet.getCell('D12').value = clientFound.direction_send;
                worksheet.getCell('D13').value = clientFound.telefono1;
                worksheet.getCell('D14').value = clientFound.name;
                worksheet.getCell('D15').value = clientFound.email1;
                worksheet.getCell('D16').value = clientFound.billing_email;

                // Datos cotización
                let fechasplit = req.body.fecha.split("-");
                let fecha = fechasplit[2]+"/"+fechasplit[1]+"/"+fechasplit[0];
    
                let fecha_aprobacionsplit = req.body.fecha_aprobacion.split("-");
                let fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
    
                worksheet.getCell('L9').value = req.body.num;
                worksheet.getCell('L11').value = fecha;
                worksheet.getCell('L12').value = req.body.validez;
                worksheet.getCell('L13').value = req.body.entrega;
                worksheet.getCell('L14').value = req.body.selectcondiciones;
                worksheet.getCell('L15').value = req.session.name;
                worksheet.getCell('J16').value = req.body.selectestado;
                worksheet.getCell('N16').value = fecha_aprobacion;

                workbook.xlsx.writeFile( "./" + req.body.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  req.body.proyecto.replaceAll(" ","_") + ".xlsx").then(
                    res.download(path.join(__dirname, "../../" + req.body.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  req.body.proyecto.replaceAll(" ","_") + ".xlsx")) 
                );
            });

            res.redirect('/inicio');

        }).catch((err)=>console.log(err));

    }
}

module.exports = cotizacionController;