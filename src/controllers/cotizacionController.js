
const path = require('path');
const db = require('../database/models');
var Excel = require('exceljs');
var sessionStorage = require('sessionstorage');
const JSZip = require("jszip");
const fs = require('fs');
const AdmZip = require('adm-zip');

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

// ----------------------------- Se escribe la base de datos ------------------------------------------------------------------
            
                                // Datos cliente
                                let NITorCC;
            
                                if (clientFound.NIT == "-"){
                                    NITorCC = clientFound.CC;
                                } else {
                                    NITorCC = clientFound.NIT;
                                }
                    
                                let fecha_aprobacionsplit = req.body.fecha_aprobacion.split("-");
                                let fecha_aprobacion;
                                if (fecha_aprobacionsplit != ""){
                                    fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                } else {
                                    fecha_aprobacion = "";
                                }

                                // Datos de aprobación
                                let aprobado;
                                if (req.body.selectestado == "Aprobado"){
                                    aprobado = 1;
                                } else {
                                    aprobado = 0;
                                }

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
                                        aprob: aprobado,
                                    }).then(() => {}).catch((err) => console.log(err));
                                    
                                // Información del formulario
                                for(let i = 1; i <= 60; i++){

                                    // Caso interpretado como fila vacía
                                    if (req.body[`cantidad${i}`] == '' && req.body[`descrip${i}`] == '' && req.body[`material${i}`] == '' && req.body[`precio${i}`] == '' && req.body[`espesor${i}`] == ''){
                                        break;
                                    }                                         
                                    // Se escriben los datos en la base de datos
                                    db.cotizacion_datos.create(
                                        {        
                                            num: req.body.num,
                                            cantidad: req.body[`cantidad${i}`] || null,
                                            descripcion: req.body[`descrip${i}`] || null,
                                            precio: req.body[`precio${i}`] || null,
                                            material: req.body[`material${i}`] || null,
                                            espesor: req.body[`espesor${i}`] || null,
                                            perimetroautocad:  req.body[`perimetro_autocad${i}`] || null,
                                            factorcorte: req.body[`factor_corte${i}`] || null,
                                            perimetro: req.body[`perimetro${i}`] || null,
                                            largoautocad: req.body[`largo_autocad${i}`] || null,                        
                                            anchoautocad: req.body[`ancho_autocad${i}`] || null,
                                            factorarea: req.body[`factor_area${i}`] || null,
                                            area:  req.body[`area${i}`] || null,
                                            piercings: req.body[`piercings${i}`] || null,
                                            dobleces: req.body[`dobleces${i}`] || null,
                                            longdoblez: req.body[`longitud_doblez${i}`] || null,
                                            conmaterial: req.body[`con_material${i}`] || null

                                        }).then(() => {}).catch((err) => console.log(err));
                                }

                                res.redirect('/inicio');

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
    },

    downloadSelect: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        db.cotizacion.findAll({raw: true}).then((listadecotizaciones)=>{
            res.render(path.join(__dirname, '../views/select_download'), {cotizaciones : listadecotizaciones});    
        }).catch((err)=>console.log(err));

    },

    downloadSelectPost: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        
        if (req.body.select){
            sessionStorage.setItem("cotizacionToDownload", req.body.select);
            res.redirect("/download-cotizacion-docs");
        } else {
            res.redirect("/download-cotizacion");
        }

    },

    downloadDocs: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let cotizacionToDownload = sessionStorage.getItem("cotizacionToDownload");

        db.cotizacion.findOne({raw: true, where: { num: cotizacionToDownload } }).then((cotizacionFound) => {
            db.cotizacion_datos.findAll({raw: true, where: { num: cotizacionToDownload } }).then((rowsFound) => {
                db.clientes.findOne({raw: true, where: { client: cotizacionFound.client } }).then((clientFound)=>{
                    db.corte.findAll({raw: true}).then((listadecorte)=>{
                        db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                            db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                                db.material.findAll({raw: true}).then((listadematerial)=>{
                    

                                    if (cotizacionFound){

                                        sessionStorage.removeItem("cotizacionToDownload");
                                        
                // ----------------------------- Se escribe el archivo de cotizacion ----------------------------------------------------------------------

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
                                            let fechasplit = cotizacionFound.fecha.split("-");
                                            let fecha = fechasplit[2]+"/"+fechasplit[1]+"/"+fechasplit[0];
                                
                                            let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
                                            let fecha_aprobacion;
                                            if (fecha_aprobacionsplit != ""){
                                                fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                            } else {
                                                fecha_aprobacion = "";
                                            }

                                            // Datos de aprobación
                                            let aprobado;
                                            if (cotizacionFound.estado == "Aprobado"){
                                                aprobado = 1;
                                            } else {
                                                aprobado = 0;
                                            }
                                
                                            // Datos generales
                                            worksheet.getCell('L9').value = cotizacionFound.num;
                                            worksheet.getCell('L11').value = fecha;
                                            worksheet.getCell('L12').value = cotizacionFound.validez;
                                            worksheet.getCell('L13').value = cotizacionFound.entrega;
                                            worksheet.getCell('L14').value = cotizacionFound.condiciones;
                                            worksheet.getCell('L15').value = req.session.name;
                                            worksheet.getCell('J16').value = cotizacionFound.estado;
                                            worksheet.getCell('N16').value = fecha_aprobacion;
                                            worksheet.getCell('C24').value = cotizacionFound.proyecto;
                        
                                            // Condiciones comerciales
                                            worksheet.getCell('A19').value = cotizacionFound.pago;
                                            worksheet.getCell('A20').value = cotizacionFound.transporte;
                                            worksheet.getCell('A21').value = cotizacionFound.materiales;

                                            // Observaciones
                                            worksheet.getCell('D22').value = cotizacionFound.observ1;
                                            worksheet.getCell('D23').value = cotizacionFound.observ2;
                                                
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){

                                                // Caso interpretado como fila vacía
                                                if (rowsFound[i][`cantidad`] == null && rowsFound[i][`descripcion`] == null && rowsFound[i][`material`] == null && rowsFound[i][`precio`] == null && rowsFound[i][`espesor`] == null){
                                                    break;
                                                } else if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && rowsFound[i][`perimetro`] == null && rowsFound[i][`area`] == null){
                                                    // Llenado de filas de caso cobro diferente a corte/doblez
                                                    worksheet.getCell(`A${27+i}`).value = i+1;
                                                    worksheet.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ".";
                                                    worksheet.getCell(`H${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet.getCell(`L${27+i}`).value = rowsFound[i][`precio`];
                                                    worksheet.getCell(`N${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]);
                                                    worksheet.getCell(`J${27+i}`).value = "Und";
                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet.getCell(`A${27+i}`).value = i+1;
                                                    worksheet.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet.getCell(`H${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet.getCell(`J${27+i}`).value = "Und";

                                                    // Costos
                                                    let corte_por_mm = listadecorte.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]];
                                                    let piercing_por_pieza = listadepiercing.filter(element => element.width == rowsFound[i][`espesor`])[0]["piercing"];
                                                    let doblez = listadedoblez.filter(element => element.width == rowsFound[i][`espesor`])[0]["fold"];
                                                    let material_por_mm2 = listadematerial.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]];

                                                    // Variables
                                                    let perimetro = parseFloat(rowsFound[i][`perimetro`]) || 0;
                                                    let piercings = parseFloat(rowsFound[i][`piercings`]) || 1;
                                                    let numdoblez = parseFloat(rowsFound[i][`dobleces`]) || 0;
                                                    let longdobleces = parseFloat(rowsFound[i][`longdoblez`]) || 1;

                                                    let longdoblezfactor = 1;
                                                    if (longdobleces >= 1500) {
                                                        longdoblezfactor = 2;
                                                    } 

                                                    let area;
                                                    if (rowsFound[i][`conmaterial`] == "No" || rowsFound[i][`conmaterial`] == null) {
                                                        area = 0;
                                                    } else {
                                                        area = parseFloat(rowsFound[i][`area`]);
                                                    }

                                                    // Costo por unidad de pieza
                                                    let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez + area*material_por_mm2;

                                                    worksheet.getCell(`L${27+i}`).value = costo_unidad;
                                                    worksheet.getCell(`N${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                                }
                                            }
                        
                                            let filename = cotizacionFound.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  cotizacionFound.proyecto.replaceAll(" ","_") + ".xlsx";
                                            workbook.xlsx.writeFile( "./public/files/" + filename);
                                        });

// ----------------------------- Se escribe el archivo de cotización de datos ------------------------------------------------------------------
                                
                                        var workbook1 = new Excel.Workbook();
                                        workbook1.xlsx.readFile('./PlantillaDatos.xlsm').then(  function() {

                                            let worksheet1 = workbook1.getWorksheet('Cotizacion');

                                            // Datos cliente
                                            let NITorCC;
                        
                                            if (clientFound.NIT == "-"){
                                                NITorCC = clientFound.CC;
                                            } else {
                                                NITorCC = clientFound.NIT;
                                            }
                        
                                            worksheet1.getCell('D9').value = clientFound.client;
                                            worksheet1.getCell('D10').value = NITorCC;
                                            worksheet1.getCell('D11').value = clientFound.direction;
                                            worksheet1.getCell('D12').value = clientFound.direction_send;
                                            worksheet1.getCell('D13').value = clientFound.telefono1;
                                            worksheet1.getCell('D14').value = clientFound.name;
                                            worksheet1.getCell('D15').value = clientFound.email1;
                                            worksheet1.getCell('D16').value = clientFound.billing_email;
                        
                                            // Datos cotización
                                            let fechasplit = cotizacionFound.fecha.split("-");
                                            let fecha = fechasplit[2]+"/"+fechasplit[1]+"/"+fechasplit[0];
                                
                                            let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
                                            let fecha_aprobacion;
                                            if (fecha_aprobacionsplit != ""){
                                                fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                            } else {
                                                fecha_aprobacion = "";
                                            }

                                            // Datos de aprobación
                                            let aprobado;
                                            if (cotizacionFound.estado == "Aprobado"){
                                                aprobado = 1;
                                            } else {
                                                aprobado = 0;
                                            }
                                
                                            // Datos generales
                                            worksheet1.getCell('L9').value = cotizacionFound.num;
                                            worksheet1.getCell('L11').value = fecha;
                                            worksheet1.getCell('L12').value = cotizacionFound.validez;
                                            worksheet1.getCell('L13').value = cotizacionFound.entrega;
                                            worksheet1.getCell('L14').value = cotizacionFound.condiciones;
                                            worksheet1.getCell('L15').value = req.session.name;
                                            worksheet1.getCell('J16').value = cotizacionFound.estado;
                                            worksheet1.getCell('N16').value = fecha_aprobacion;
                                            worksheet1.getCell('C24').value = cotizacionFound.proyecto;
                        
                                            // Condiciones comerciales
                                            worksheet1.getCell('A19').value = cotizacionFound.pago;
                                            worksheet1.getCell('A20').value = cotizacionFound.transporte;
                                            worksheet1.getCell('A21').value = cotizacionFound.materiales;

                                            // Observaciones
                                            worksheet1.getCell('D22').value = cotizacionFound.observ1;
                                            worksheet1.getCell('D23').value = cotizacionFound.observ2;
        
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){

                                                // Caso interpretado como fila vacía
                                                if (rowsFound[i][`cantidad`] == null && rowsFound[i][`descripcion`] == null && rowsFound[i][`material`] == null && rowsFound[i][`precio`] == null && rowsFound[i][`espesor`] == null){
                                                    break;
                                                } else if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && rowsFound[i][`perimetro`] == null && rowsFound[i][`area`] == null){
                                                    // Llenado de filas de caso cobro diferente a corte/doblez
                                                    worksheet1.getCell(`A${27+i}`).value = i;
                                                    worksheet1.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ".";
                                                    worksheet1.getCell(`E${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet1.getCell(`F${27+i}`).value = "Und";
                                                    worksheet1.getCell(`H${27+i}`).value = rowsFound[i][`precio`];
                                                    worksheet1.getCell(`P${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]) || 0;
                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet1.getCell(`A${27+i}`).value = i;
                                                    worksheet1.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet1.getCell(`E${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet1.getCell(`F${27+i}`).value = "Und";

                                                    // Costos
                                                    let corte_por_mm = listadecorte.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]];
                                                    let piercing_por_pieza = listadepiercing.filter(element => element.width == rowsFound[i][`espesor`])[0]["piercing"];
                                                    let doblez = listadedoblez.filter(element => element.width == rowsFound[i][`espesor`])[0]["fold"];
                                                    let material_por_mm2 = listadematerial.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]];

                                                    // Variables
                                                    let perimetro = parseFloat(rowsFound[i][`perimetro`]) || 0;
                                                    let piercings = parseFloat(rowsFound[i][`piercings`]) || 1;
                                                    let numdoblez = parseFloat(rowsFound[i][`dobleces`]) || 0;
                                                    let longdobleces = parseFloat(rowsFound[i][`longdoblez`]) || 1;

                                                    let longdoblezfactor = 1;
                                                    if (longdobleces >= 1500) {
                                                        longdoblezfactor = 2;
                                                    } 
                                                    
                                                    let area;
                                                    if (rowsFound[i][`conmaterial`] == "No" || rowsFound[i][`conmaterial`] == null) {
                                                        area = 0;
                                                    } else {
                                                        area = parseFloat(rowsFound[i][`area`]);
                                                    }

                                                    // Costo por unidad de pieza
                                                    let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez + area*material_por_mm2;
                                                    
                                                    worksheet1.getCell(`H${27+i}`).value = area*material_por_mm2;
                                                    worksheet1.getCell(`J${27+i}`).value = perimetro*corte_por_mm;
                                                    worksheet1.getCell(`L${27+i}`).value = piercings*piercing_por_pieza;
                                                    worksheet1.getCell(`N${27+i}`).value = longdoblezfactor*numdoblez*doblez;
                                                    worksheet1.getCell(`P${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                                }
                                            }
                        
                                            let filename = cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_Datos.xlsx";
                                            workbook1.xlsx.writeFile( "./public/files/" + filename);
                                        })

// ----------------------------- Se escribe el archivo de remisión ----------------------------------------------------------------------
                                
                                        var workbook2 = new Excel.Workbook();
                                        workbook2.xlsx.readFile('./PlantillaRemision.xlsm').then(  function() {
        
                                            let worksheet2 = workbook2.getWorksheet('Remision');
        
                                            // Datos cliente
                                            let NITorCC;
                        
                                            if (clientFound.NIT == "-"){
                                                NITorCC = clientFound.CC;
                                            } else {
                                                NITorCC = clientFound.NIT;
                                            }
                        
                                            worksheet2.getCell('D9').value = clientFound.client;
                                            worksheet2.getCell('D10').value = NITorCC;
                                            worksheet2.getCell('D11').value = clientFound.direction;
                                            worksheet2.getCell('D12').value = clientFound.direction_send;
                                            worksheet2.getCell('D13').value = clientFound.telefono1;
                                            worksheet2.getCell('D14').value = clientFound.name;
                                            worksheet2.getCell('D15').value = clientFound.email1;
                                            worksheet2.getCell('D16').value = clientFound.billing_email;
                        
                                            // Datos cotización
                                            let fechasplit = cotizacionFound.fecha.split("-");
                                            let fecha = fechasplit[2]+"/"+fechasplit[1]+"/"+fechasplit[0];
                                
                                            let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
                                            let fecha_aprobacion;
                                            if (fecha_aprobacionsplit != ""){
                                                fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                            } else {
                                                fecha_aprobacion = "";
                                            }

                                            // Datos de aprobación
                                            let aprobado;
                                            if (cotizacionFound.estado == "Aprobado"){
                                                aprobado = 1;
                                            } else {
                                                aprobado = 0;
                                            }
                                
                                            // Datos generales
                                            worksheet2.getCell('J9').value = cotizacionFound.num;
                                            worksheet2.getCell('J13').value = fecha;
                                            worksheet2.getCell('J15').value = req.session.name;
                                            worksheet2.getCell('C18').value = cotizacionFound.proyecto;
        
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){
        
                                                // Caso interpretado como fila vacía
                                                if (rowsFound[i][`cantidad`] == null && rowsFound[i][`descripcion`] == null && rowsFound[i][`material`] == null && rowsFound[i][`precio`] == null && rowsFound[i][`espesor`] == null){
                                                    break;
                                                } else if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && rowsFound[i][`perimetro`] == null && rowsFound[i][`area`] == null){
                                                    // Llenado de filas de caso cobro diferente a corte/doblez
                                                    worksheet2.getCell(`A${21+i}`).value = i+1;
                                                    worksheet2.getCell(`B${21+i}`).value = rowsFound[i][`descripcion`] + ".";
                                                    worksheet2.getCell(`H${21+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet2.getCell(`J${21+i}`).value = "Und";
                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet2.getCell(`A${21+i}`).value = i;
                                                    worksheet2.getCell(`B${21+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet2.getCell(`H${21+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet2.getCell(`J${21+i}`).value = "Und";
                                                }
                                            }
                        
                                            let filename = cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_Remision.xlsx";
                                            workbook2.xlsx.writeFile( "./public/files/" + filename);
                                        })

// ----------------------------- Se escribe el archivo de orden de corte ----------------------------------------------------------------------
                                
                                        var workbook3 = new Excel.Workbook();
                                        workbook3.xlsx.readFile('./PlantillaOrdenCorte.xlsm').then(  function() {
        
                                            let worksheet3 = workbook3.getWorksheet('Orden de Trabajo CORTE');

                                            worksheet3.getCell('E1').value = cotizacionFound.num;
                                            worksheet3.getCell('B4').value = clientFound.client;
                                            worksheet3.getCell('B5').value = cotizacionFound.proyecto;

                                            // índice para el llenado de filas
                                            let j = 1;
        
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){
        
                                                // Caso interpretado como fila vacía
                                                if (rowsFound[i][`cantidad`] == null && rowsFound[i][`descripcion`] == null && rowsFound[i][`material`] == null && rowsFound[i][`precio`] == null && rowsFound[i][`espesor`] == null){
                                                    break;
                                                } else if (rowsFound[i][`perimetro`] == null){
                                                    continue;
                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet3.getCell(`A${8+j}`).value = j;
                                                    worksheet3.getCell(`B${8+j}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    if (rowsFound[i][`conmaterial`] == 'Sí'){
                                                        worksheet3.getCell(`F${8+j}`).value = "Q.I.";
                                                    } else {
                                                        worksheet3.getCell(`F${8+j}`).value = "Cliente";
                                                    }
                                                    worksheet3.getCell(`G${8+j}`).value = rowsFound[i][`cantidad`];
                                                    worksheet3.getCell(`H${8+j}`).value = rowsFound[i][`perimetro`];
                                                    j += 1;
                                                }
                                            }
                        
                                            let filename = cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_OrdenCorte.xlsx";
                                            workbook3.xlsx.writeFile("./public/files/" + filename);
                                        })

                                 
// ----------------------------- Se escribe el archivo de orden de doblez ----------------------------------------------------------------------
                                
                                        var workbook4 = new Excel.Workbook();
                                        workbook4.xlsx.readFile('./PlantillaOrdenDoblez.xlsm').then(  function() {
        
                                            let worksheet4 = workbook4.getWorksheet('Orden de Trabajo DOBLEZ');

                                            worksheet4.getCell('E1').value = cotizacionFound.num;
                                            worksheet4.getCell('B4').value = clientFound.client;
                                            worksheet4.getCell('B5').value = cotizacionFound.proyecto;

                                            // índice para el llenado de filas
                                            let j = 1;
        
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){
        
                                                // Caso interpretado como fila vacía
                                                if (rowsFound[i][`cantidad`] == null && rowsFound[i][`descripcion`] == null && rowsFound[i][`material`] == null && rowsFound[i][`precio`] == null && rowsFound[i][`espesor`] == null){
                                                    break;
                                                } else if (rowsFound[i][`dobleces`]== null){
                                                    continue;
                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet4.getCell(`A${8+j}`).value = j;
                                                    worksheet4.getCell(`B${8+j}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet4.getCell(`F${8+j}`).value = rowsFound[i][`dobleces`];
                                                    worksheet4.getCell(`G${8+j}`).value = rowsFound[i][`longdoblez`];
                                                    worksheet4.getCell(`H${8+j}`).value = rowsFound[i][`cantidad`];
                                                    j += 1;
                                                }
                                            }
                        
                                            let filename = cotizacionFound.num + "_" +cotizacionFound.proyecto.replaceAll(" ","_") + "_OrdenDoblez.xlsx";
                                            workbook4.xlsx.writeFile( "./public/files/" + filename);
                                        })

// -------------------------------------------------------------------------------------------------------------------------------------                                                

                                        res.render(path.join(__dirname, '../views/buttons_download'), 
                                        {
                                            numcot: cotizacionToDownload, 
                                            filecotizacion: cotizacionFound.num + "_" + clientFound.client.replaceAll(" ","_") +  "_" +  cotizacionFound.proyecto.replaceAll(" ","_") + ".xlsx",
                                            fileremision: cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_Remision.xlsx",
                                            filedatos: cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_Datos.xlsx",
                                            filecorte: cotizacionFound.num + "_" + cotizacionFound.proyecto.replaceAll(" ","_") + "_OrdenCorte.xlsx",
                                            filedoblez: cotizacionFound.num + "_" +cotizacionFound.proyecto.replaceAll(" ","_") + "_OrdenDoblez.xlsx",
                                        })

                                    } else {
                                        res.redirect('/download-cotizacion');
                                    }

                                }).catch((err)=>console.log(err));
                            }).catch((err)=>console.log(err));
                        }).catch((err)=>console.log(err));
                    }).catch((err)=>console.log(err));
                }).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err));
         }).catch((err)=>console.log(err));
    }

}

module.exports = cotizacionController;