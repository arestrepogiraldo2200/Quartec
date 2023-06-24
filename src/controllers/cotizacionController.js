
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

            if (clientFound) {

                db.corte.findAll({raw: true}).then((listadecorte)=>{
                    db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                        db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                            db.material.findAll({raw: true}).then((listadematerial)=>{

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
                                    worksheet.getCell('C24').value = req.body.proyecto;
                
                                    worksheet.getCell('A19').value = req.body.forma_pago;
                                    worksheet.getCell('A20').value = req.body.transporte;
                                    worksheet.getCell('A21').value = req.body.materiales;
                
                                    // console.log(listadecorte)
                                    // console.log(listadedoblez)
                                    // console.log(listadepiercing)
                                    // console.log(listadematerial)
                
                                    for(let i = 1; i <= 60; i++){

                                        // Caso interpretado como fila vacía
                                        if (req.body[`cantidad${i}`] == '' && req.body[`descrip${i}`] == '' && req.body[`material${i}`] == '' && req.body[`precio${i}`] == '' && req.body[`espesor${i}`] == ''){
                                            break;
                                        } else if (req.body[`material${i}`] == '' && req.body[`espesor${i}`] == '' && req.body[`perimetro${i}`] == '' && req.body[`area${i}`] == ''){
                                            // Llenado de filas de caso cobro diferente a corte/doblez
                                            worksheet.getCell(`A${26+i}`).value = i;
                                            worksheet.getCell(`B${26+i}`).value = req.body[`descrip${i}`] + ".";
                                            worksheet.getCell(`H${26+i}`).value = req.body[`cantidad${i}`];
                                            worksheet.getCell(`L${26+i}`).value = req.body[`precio${i}`];
                                            worksheet.getCell(`N${26+i}`).value = parseFloat(req.body[`cantidad${i}`])*parseFloat(req.body[`precio${i}`]);
                                        } else {
                                            // Llenado de filas caso cobro corte/doblez
                                            worksheet.getCell(`A${26+i}`).value = i;
                                            worksheet.getCell(`B${26+i}`).value = req.body[`descrip${i}`] + ". Material: " + req.body[`material${i}`] + ". Espesor: " + req.body[`espesor${i}`] + ".";
                                            worksheet.getCell(`H${26+i}`).value = req.body[`cantidad${i}`];

                                            // Costos
                                            let corte_por_mm = listadecorte.filter(element => element.width == req.body[`espesor${i}`])[0][req.body[`material${i}`]];
                                            let piercing_por_pieza = listadepiercing.filter(element => element.width == req.body[`espesor${i}`])[0]["piercing"];
                                            let doblez = listadedoblez.filter(element => element.width == req.body[`espesor${i}`])[0]["fold"];
                                            let material_por_mm2 = listadematerial.filter(element => element.width == req.body[`espesor${i}`])[0][req.body[`material${i}`]];

                                            // Variables
                                            let perimetro = parseFloat(req.body[`perimetro${i}`]) || 0;
                                            let piercings = parseFloat(req.body[`piercings${i}`]) || 0;
                                            let numdoblez = parseFloat(req.body[`dobleces${i}`]) || 0;
                                            let longdobleces = parseFloat(req.body[`longitud_doblez${i}`]) || 0;

                                            let longdoblezfactor = 1;
                                            if (longdobleces >= 1500) {
                                                longdoblezfactor = 2;
                                            } 

                                            let area = parseFloat(req.body[`area${i}`]) || 0;
                                            if (req.body[`con_material${i}`] == "No") {
                                                area = 0;
                                            } 

                                            // Costo por unidad de pieza
                                            let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez + area*material_por_mm2;

                                            worksheet.getCell(`L${26+i}`).value = costo_unidad;
                                            worksheet.getCell(`N${26+i}`).value = parseFloat(req.body[`cantidad${i}`])*costo_unidad;
                                        }
                                    }
                
                                    let filename = req.body.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  req.body.proyecto.replaceAll(" ","_") + ".xlsx";
                                    workbook.xlsx.writeFile( "./" + filename);
                                });
                
                                res.redirect('/downloadfile/'+req.body.num+'/' + clientFound.client.replaceAll(" ","_") + "/" +  req.body.proyecto.replaceAll(" ","_"));

                            }).catch((err)=>console.log(err));
                        }).catch((err)=>console.log(err));
                    }).catch((err)=>console.log(err));
                 }).catch((err)=>console.log(err));

            } else {
                res.redirect('/cotizacion')
            }

        }).catch((err)=>{
            res.redirect('/cotizacion')
            console.log(err)
        });
    },

    downloadfile: (req,res) => {

        let filename = req.params.num + "_" + req.params.cliente +  "_" +  req.params.proyecto + ".xlsx";

        let filePath = path.join(__dirname, "../../" + filename)
        let resolvedPath = path.resolve(filePath);

        res.sendFile(resolvedPath);
        res.redirect('/inicio');   

        // res.download(resolvedPath, {root: __dirname }, function(err) {
        //     console.log(err); 
        //     res.redirect('/inicio');         
        //  });
    }
}

module.exports = cotizacionController;