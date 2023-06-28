
const path = require('path');
const db = require('../database/models');
var Excel = require('exceljs');
var sessionStorage = require('sessionstorage');

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
                                    let fecha_aprobacion;
                                    if (fecha_aprobacionsplit != ""){
                                        fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                    } else {
                                        fecha_aprobacion = "";
                                    }
                        
                                    // Datos generales
                                    worksheet.getCell('L9').value = req.body.num;
                                    worksheet.getCell('L11').value = fecha;
                                    worksheet.getCell('L12').value = req.body.validez;
                                    worksheet.getCell('L13').value = req.body.entrega;
                                    worksheet.getCell('L14').value = req.body.selectcondiciones;
                                    worksheet.getCell('L15').value = req.session.name;
                                    worksheet.getCell('J16').value = req.body.selectestado;
                                    worksheet.getCell('N16').value = fecha_aprobacion;
                                    worksheet.getCell('C24').value = req.body.proyecto;
                
                                    // Condiciones comerciales
                                    worksheet.getCell('A19').value = req.body.forma_pago;
                                    worksheet.getCell('A20').value = req.body.transporte;
                                    worksheet.getCell('A21').value = req.body.materiales;

                                    // Condiciones comerciales
                                    worksheet.getCell('D22').value = req.body.observ1;
                                    worksheet.getCell('D23').value = req.body.observ2;

                                    // Se escriben los datos en la base de datos
                                    db.cotizacion.create(
                                        {        
                                            num: req.body.num,
                                            client: req.body.selectclient,
                                            fecha: req.body.fecha,
                                            validez: req.body.validez,
                                            entrega: req.body.entrega,
                                            condiciones: req.body.selectcondiciones,
                                            estado: req.body.selectestado,
                                            aprobacion: req.body.fecha_aprobacion,
                                            proyecto: req.body.proyecto,
                                            pago: req.body.forma_pago,
                                            transporte: req.body.transporte,
                                            materiales: req.body.materiales,
                                            asesor: req.session.name,
                                            observ1: req.body.observ1,
                                            observ2: req.body.observ2,
                                            aprob: 0,
                                        }).then(() => {}).catch((err) => console.log(err));
                                        
                                    // Información del formulario
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
                                            worksheet.getCell(`J${26+i}`).value = "Und";
                                        } else {
                                            // Llenado de filas caso cobro corte/doblez
                                            worksheet.getCell(`A${26+i}`).value = i;
                                            worksheet.getCell(`B${26+i}`).value = req.body[`descrip${i}`] + ". Material: " + req.body[`material${i}`] + ". Espesor: " + req.body[`espesor${i}`] + ".";
                                            worksheet.getCell(`H${26+i}`).value = req.body[`cantidad${i}`];
                                            worksheet.getCell(`J${26+i}`).value = "Und";

                                            // Costos
                                            let corte_por_mm = listadecorte.filter(element => element.width == req.body[`espesor${i}`])[0][req.body[`material${i}`]];
                                            let piercing_por_pieza = listadepiercing.filter(element => element.width == req.body[`espesor${i}`])[0]["piercing"];
                                            let doblez = listadedoblez.filter(element => element.width == req.body[`espesor${i}`])[0]["fold"];
                                            let material_por_mm2 = listadematerial.filter(element => element.width == req.body[`espesor${i}`])[0][req.body[`material${i}`]];

                                            // Variables
                                            let perimetro = parseFloat(req.body[`perimetro${i}`]) || 0;
                                            let piercings = parseFloat(req.body[`piercings${i}`]) || 1;
                                            let numdoblez = parseFloat(req.body[`dobleces${i}`]) || 0;
                                            let longdobleces = parseFloat(req.body[`longitud_doblez${i}`]) || 1;

                                            let longdoblezfactor = 1;
                                            if (longdobleces >= 1500) {
                                                longdoblezfactor = 2;
                                            } 

                                            let area = parseFloat(req.body[`area${i}`]) || 0;
                                            if (req.body[`con_material${i}`] == "No" || req.body[`con_material${i}`] == "") {
                                                area = 0;
                                            } 

                                            // Costo por unidad de pieza
                                            let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez + area*material_por_mm2;

                                            worksheet.getCell(`L${26+i}`).value = costo_unidad;
                                            worksheet.getCell(`N${26+i}`).value = parseFloat(req.body[`cantidad${i}`])*costo_unidad;
                                        }
                                        
                                        // Se escriben los datos en la base de datos
                                        db.cotizacion_datos.create(
                                            {        
                                                num: req.body.num,
                                                cantidad: req.body[`cantidad${i}`],
                                                descripcion: req.body[`descrip${i}`],
                                                precio: req.body[`precio${i}`],
                                                material: req.body[`material${i}`],
                                                espesor: req.body[`espesor${i}`],
                                                perimetroautocad:  req.body[`perimetro_autocad${i}`],
                                                factorcorte: req.body[`factor_corte${i}`],
                                                perimetro: req.body[`perimetro${i}`],
                                                largoautocad: req.body[`largo_autocad${i}`],                        
                                                anchoautocad: req.body[`ancho_autocad${i}`],
                                                factorarea: req.body[`factor_area${i}`],
                                                area:  req.body[`area${i}`],
                                                piercings: req.body[`piercings${i}`],
                                                dobleces: req.body[`dobleces${i}`],
                                                longdoblez: req.body[`longitud_doblez${i}`],
                                                conmaterial: req.body[`con_material${i}`]

                                            }).then(() => {}).catch((err) => console.log(err));
                                    }
                
                                    let filename = req.body.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  req.body.proyecto.replaceAll(" ","_") + ".xlsx";
                                    workbook.xlsx.writeFile( "./" + filename);
                                });
               
                                res.redirect('/downloadfile/'+req.body.num + '-' + clientFound.client.replaceAll(" ","_") + "-" +  req.body.proyecto.replaceAll(" ","_"));

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

        let param = req.params.nombrearchivo;
        param = param.split('-');
        let filename = param[0] + "_" + param[1] +  "_" +  param[2] + ".xlsx";
        console.log(filename, ".....................................................................")

        // let filename = req.params.num + "_" + req.params.cliente +  "_" +  req.params.proyecto + ".xlsx";

        let filePath = path.join(__dirname, "../../" + filename)
        let resolvedPath = path.resolve(filePath);

        res.sendFile(resolvedPath);
        res.sendFile(resolvedPath);

        res.redirect('/inicio');   

        // res.download(resolvedPath, {root: __dirname }, function(err) {
        //     console.log(err); 
        //     res.redirect('/inicio');         
        //  });
    },

    selectCotizacion: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        db.cotizacion.findAll({raw: true}).then((listadecotizaciones)=>{
            res.render(path.join(__dirname, '../views/select_cotizacion'), {cotizaciones : listadecotizaciones});    
        }).catch((err)=>console.log(err));
        
    },

    selectCotizacionPost: (req,res) => {

        if (!req.body.select) return res.redirect('/edit-cotizacion');
        
        sessionStorage.setItem("cotizacionToEdit", req.body.select);
        res.redirect("/edit-cotizacion-form");
    },

    editCotizacionGetForm: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let cotizacionToEdit = sessionStorage.getItem("cotizacionToEdit");

        db.cotizacion.findOne({raw: true, where: { num: cotizacionToEdit } }).then((cotizacionFound) => {
            db.cotizacion_datos.findAll({raw: true, where: { num: cotizacionToEdit } }).then((rowsFound) => {
                db.clientes.findAll({raw: true}).then((listadeclientes)=>{

                    if (cotizacionFound){
                        sessionStorage.removeItem("cotizacionToEdit");
                        //console.log(rowsFound)
                        res.render(path.join(__dirname, '../views/editar_cotizacion_form'), {cotizaciongeneral : cotizacionFound, filas: rowsFound.sort((a, b) => (a.id > b.id) ? 1 : -1), clientes : listadeclientes}); 
                    } else {
                        res.redirect('/edit-cotizacion');
                    }

                }).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err));
         }).catch((err)=>console.log(err));
    },

    registerGet: (req,res) => {
        
        if (!req.session.isAuthenticated) return res.redirect('/');

        db.cotizacion.findAll({raw: true}).then((listadecotizaciones)=>{
            res.render(path.join(__dirname, '../views/aprobacion_cotizacion'), {cotizaciones : listadecotizaciones});    
        }).catch((err)=>console.log(err));

    },

    registerPost: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        db.cotizacion.update({
            aprob: 1,
            aprobacion: req.body.fecha_aprobacion,
        },
        {
          where:{num: req.body.select}
        }).then( () => {res.redirect('/inicio');}).catch((err) => console.log(err));        
    }
}

module.exports = cotizacionController;