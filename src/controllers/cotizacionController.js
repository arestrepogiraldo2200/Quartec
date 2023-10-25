
const path = require('path');
const db = require('../database/models');
var Excel = require('exceljs');
const PDFDocument = require('pdfkit');
const sessionStorage = require('sessionstorage');
const ls = require('local-storage');
const JSZip = require("jszip");
const fs = require('fs');
const AdmZip = require('adm-zip');
const { resolve } = require('path');

// Para la conversión a pdf
const fsp = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

let cotizacionController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        
        db.clientes.findAll({raw: true}).then((listadeclientes)=>{
            db.corte.findAll({raw: true}).then((listadecorte)=>{
                db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                    db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                        db.material.findAll({raw: true}).then((listadematerial)=>{

                            fs.readFile(path.join(__dirname,'../../cotizacion0.txt'), 'utf8', (err, data) => {
                                if (err) {
                                  console.error(err);
                                  return;
                                }
                                let num0;
                                num0 = parseInt(data);

                                // Update number file
                                fs.writeFile(path.join(__dirname,'../../cotizacion0.txt'), String(num0+1), (err) => {
                                    if (err) throw err;
                                })

                                res.render(path.join(__dirname, '../views/cotizacion'), {clientes : listadeclientes, asesor : req.session.name, corte: listadecorte, doblez : listadedoblez, piercing : listadepiercing, material : listadematerial,  nummin : num0});    
                            });

                            // console.log(listadecorte);
                            // console.log("-----------------------------------------------------------------------------");
                            // console.log(listadedoblez);
                            // console.log("-----------------------------------------------------------------------------");
                            // console.log(listadepiercing);
                            // console.log("-----------------------------------------------------------------------------");
                            // console.log(listadematerial);

                        }).catch((err)=>console.log(err));
                    }).catch((err)=>console.log(err));
                }).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err));
        }).catch((err)=>console.log(err));
    },

    createFile: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
      
        db.clientes.findOne({raw: true, where: { client: req.body.selectclient } }).then((clientFound) => {

            // console.log("REQ:",req.body);

            if (clientFound) {

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

// ----------------------------- Se eliminan las entradas ya existentes en la base de datos y se escriben las nuevas------------------------------------------------------------------

                // Se eliminan entradas en la base de datos cotizacion
                    db.cotizacion.destroy({
                        where :{
                            num: req.body.num
                        }
                      }).then( () => {
                                    
                    // Se escriben los datos generales
                        db.cotizacion.create(
                            {        
                                num: req.body.num,
                                client: req.body.selectclient,
                                fecha: req.body.fecha,
                                validez: req.body.validez,
                                entrega: req.body.entrega,
                                condiciones: req.body.selectcondiciones,
                                estado: req.body.selectestado,
                                aprobacion: req.body.fecha_aprobacion || null,
                                proyecto: req.body.proyecto,
                                pago: req.body.forma_pago,
                                transporte: req.body.transporte,
                                materiales: req.body.materiales,
                                asesor: req.session.name,
                                observ1: req.body.observ1 || null,
                                observ2: req.body.observ2 || null,
                                aprob: aprobado,
                            },
                            ).then(() => {}).catch((err) => console.log(err));
                    }).catch((err) => console.log(err));


                    // Se eliminan entradas en la base de datos de parámetros globales -----------------------------------------------------
                    db.globalparams.destroy({
                        where :{
                            num: req.body.num
                        }
                      }).then( () => {
                                    
                    // Se escriben los datos de globalparams
                        db.globalparams.create(
                            {        
                                num: req.body.num,
                                globalcorte: req.body.globcorte,
                                globalmaterial: req.body.globmaterial,
                                globaldoblez:  req.body.globdoblez
                            },
                            ).then(() => {}).catch((err) => console.log(err));
                    }).catch((err) => console.log(err));


                    // Se eliminan entradas en la base de datos cotizacion_datos ----------------------------------------------------------
                    db.cotizacion_datos.destroy({
                        where :{
                            num: req.body.num
                        }
                      }).then( () => {
                        
                        // console.log(req.body);

                        // Información del formulario
                        for(let i = 1; i <= 60; i++){

                            if (req.body[`eliminar${i}`] && req.body[`eliminar${i}`] == 'on'){
                                continue;
                            }
                            // Caso interpretado como fila vacía
                            if (req.body[`cantidad${i}`] == '' && req.body[`descrip${i}`] == '' && req.body[`material${i}`] == '' && req.body[`precio${i}`] == '' && req.body[`espesor${i}`] == ''  && req.body[`perimetro${i}`] == '' ){
                                break;
                            }                                         
                            // Se escriben los datos
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

                    }).catch((err) => console.log(err));

                    res.redirect('/inicio');

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
        
        ls.set("cotizacionToEdit", req.body.select);
        res.redirect("/edit-cotizacion-form");
    },

    editCotizacionGetForm: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let cotizacionToEdit = ls.get("cotizacionToEdit");

        db.cotizacion.findOne({raw: true, where: { num: cotizacionToEdit } }).then((cotizacionFound) => {
            db.cotizacion_datos.findAll({raw: true, where: { num: cotizacionToEdit } }).then((rowsFound) => {
                db.clientes.findAll({raw: true}).then((listadeclientes)=>{
                    db.corte.findAll({raw: true}).then((listadecorte)=>{
                        db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                            db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                                db.material.findAll({raw: true}).then((listadematerial)=>{
                                    db.globalparams.findAll({raw: true, where: { num: cotizacionToEdit }}).then((paramsfound)=>{

                                    if (cotizacionFound){
                                        ls.remove("cotizacionToEdit");
                                        
                                        let preciosarray = [];
                                        let totaltotal = 0;
                                        let preciospormaterial = [];
                                        let rows = rowsFound.sort((a, b) => (a.id > b.id) ? 1 : -1);

                                        for (let i = 0; i < rows.length; i++){
                                            
                                            if (rows[i].precio != null){
                                                preciosarray.push({
                                                    total: 0,
                                                    corte: 0,
                                                    piercing: 0,
                                                    doblez: 0,
                                                    material: 0,
                                                    totalporpieza: 0                                            
                                                });

                                                totaltotal = totaltotal + rows[i].precio*rows[i].cantidad;
                                            } else {

                                                let costocortepormm = listadecorte.filter(el => el.width == rows[i].espesor)[0][rows[i].material] || 0;
                                                let costopiercing = listadepiercing.filter(el => el.width == rows[i].espesor)[0]["piercing"] || 0;
                                                let costodoblez = listadedoblez.filter(el => el.width == rows[i].espesor)[0]["fold"] || 0;
                                                let costomaterialmm2 = listadematerial.filter(el => el.width == rows[i].espesor)[0][rows[i].material] || 0;

                                                let cantidad = rows[i].cantidad || 0;
                                                let perimetro = rows[i].perimetro || 0;
                                                let area = rows[i].area || 0;
                                                let numdobleces = rows[i].dobleces || 0;
                                                let numpiercings = rows[i].piercings || 0;
                                                let longdoblez = rows[i].longdoblez || 0;
                                                let conmaterial = rows[i].conmaterial || 0;

                                                // console.log(paramsfound[0].globaldoblez)

                                                let porpiezacorte = perimetro*costocortepormm;
                                                let porpiezapiercing = costopiercing*numpiercings;
                                                let porpiezadoblez = longdoblez > 1500? 2*costodoblez*numdobleces*paramsfound[0].globaldoblez : costodoblez*numdobleces*paramsfound[0].globaldoblez;
                                                let porpiezamaterial = conmaterial=="Sí"? area*costomaterialmm2 : 0;
                                                let totalporpieza = porpiezacorte + porpiezapiercing + porpiezadoblez + porpiezamaterial;
                                                let totalpiezastodas = cantidad*totalporpieza

                                                preciosarray.push({
                                                    total: totalpiezastodas.toFixed(0),
                                                    corte: porpiezacorte,
                                                    piercing: porpiezapiercing,
                                                    doblez: porpiezadoblez,
                                                    material: porpiezamaterial,   
                                                    totalporpieza: totalporpieza                                                                               
                                                });

                                                preciospormaterial.push({
                                                    row: i,
                                                    material: rows[i].material + "|" + rows[i].espesor,
                                                    totalpiezas: cantidad*(porpiezacorte + porpiezapiercing)
                                                });

                                                totaltotal = totaltotal + cantidad*totalporpieza;
                                            }
                                        }

                                        // calculation of total per material and width
                                        let preciospormaterialnotrepeated = Object.values(
                                            preciospormaterial.reduce((acc, current) => {
                                                acc[current.material] = acc[current.material] ?? [];
                                                acc[current.material].push(current);
                                                return acc;
                                            }, {})
                                        );

                                        let preciospormaterialdefinitive = []

                                        for (let i = 0; i < preciospormaterialnotrepeated.length; i++){

                                            let suma = 0;

                                            for (let j = 0; j < preciospormaterialnotrepeated[i].length; j++){
                                                suma += preciospormaterialnotrepeated[i][j].totalpiezas
                                            }
                                            let splitmaterial = preciospormaterialnotrepeated[i][0].material.split("|");

                                            preciospormaterialdefinitive.push({
                                                material: splitmaterial[0],
                                                width: splitmaterial[1],
                                                total: suma.toFixed(0)
                                            })
                                        }

                                        // console.log(preciospormaterialnotrepeated)
                                        // console.log(preciospormaterialdefinitive)

                                        fs.readFile(path.join(__dirname,'../../cotizacion0.txt'), 'utf8', (err, data) => {
                                            if (err) {
                                              console.error(err);
                                              return;
                                            }
                                            let num0;
                                            num0 = parseInt(data);

                                            // Update number file
                                            fs.writeFile(path.join(__dirname,'../../cotizacion0.txt'), String(num0+1), (err) => {
                                                if (err) throw err;
                                            })

                                            res.render(path.join(__dirname, '../views/editar_cotizacion_form'), {cotizaciongeneral : cotizacionFound, filas: rowsFound.sort((a, b) => (a.id > b.id) ? 1 : -1), clientes : listadeclientes, corte: listadecorte, doblez : listadedoblez, piercing : listadepiercing, material : listadematerial, precios: preciosarray, tot: totaltotal, totalespormaterial: preciospormaterialdefinitive,  nummin : num0,  numcurrent: cotizacionFound.num, globalparams: paramsfound}); 
                                        });

                                    } else {
                                        res.redirect('/edit-cotizacion');
                                    }

                                    }).catch((err)=>console.log(err));
                                }).catch((err)=>console.log(err));
                            }).catch((err)=>console.log(err));
                        }).catch((err)=>console.log(err));
                    }).catch((err)=>console.log(err));
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
            estado: "Aprobado",
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

        // Removes all files in directory files
        const rmDir = function (dirPath, removeSelf) {
            if (removeSelf === undefined)
                removeSelf = true;
            try {
                var files = fs.readdirSync(dirPath);
            } catch (e) {
                // throw e
                return;
            }
            if (files.length > 0)
                for (let i = 0; i < files.length; i++) {
                const filePath = path.join(dirPath, files[i]);
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    rmDir(filePath);
                }
            if (removeSelf)
                fs.rmdirSync(dirPath);
        };

        rmDir('./public/files',false);
        
        if (req.body.select){
            ls.set("cotizacionToDownload", req.body.select);
            res.redirect("/download-cotizacion-docs");
        } else {
            res.redirect("/download-cotizacion");
        }

    },

    downloadDocs: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        let cotizacionToDownload = ls.get("cotizacionToDownload");

        // Función para esperar -------------------------------------------------------
        function wait(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
          }

        // Función para convertir a .pdf -------------------------------------------------------
        async function convertPDF(filenametoconvert) {

            await wait(4000);

            const ext = 'pdf'; // Output extension
            const inputPath =  path.join("./public", filenametoconvert);
            const outputPath = path.join("./public/files/", filenametoconvert.slice(0, -5)+`.${ext}`);

            // Read the input file.
            const xlsxBuf = await fsp.readFile(inputPath);

            // Convert to PDF format with an undefined filter
	        let pdfBuf = await libre.convertAsync(xlsxBuf, ext, undefined);

            // Save the converted PDF
	        await fsp.writeFile(outputPath, pdfBuf);
        }

        // Función para borrar archivos -------------------------------------------------------
        async function deleteDirFilesUsingPattern(pattern){

            await wait(10000);

            dirPath = path.join(__dirname, "../../public");
          
            fs.readdir(dirPath, (err, fileNames) => {

                if (err) throw err;
          
              for (const name of fileNames) {
          
                if (name.includes(pattern)) {
                    fs.unlink(dirPath+"/"+name, (err) => {
                    if (err) throw err;
                    // console.log(`Deleted ${name}`);
                  });
                }
              }
            });
          }


        // Función para pasar de números a palabras -------------------------------------------------------

          var numeroALetras = (function() {
            // Código basado en el comentario de @sapienman
            // Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
            function Unidades(num) {
        
                switch (num) {
                    case 1:
                        return 'UN';
                    case 2:
                        return 'DOS';
                    case 3:
                        return 'TRES';
                    case 4:
                        return 'CUATRO';
                    case 5:
                        return 'CINCO';
                    case 6:
                        return 'SEIS';
                    case 7:
                        return 'SIETE';
                    case 8:
                        return 'OCHO';
                    case 9:
                        return 'NUEVE';
                }
        
                return '';
            } //Unidades()
        
            function Decenas(num) {
        
                let decena = Math.floor(num / 10);
                let unidad = num - (decena * 10);
        
                switch (decena) {
                    case 1:
                        switch (unidad) {
                            case 0:
                                return 'DIEZ';
                            case 1:
                                return 'ONCE';
                            case 2:
                                return 'DOCE';
                            case 3:
                                return 'TRECE';
                            case 4:
                                return 'CATORCE';
                            case 5:
                                return 'QUINCE';
                            default:
                                return 'DIECI' + Unidades(unidad);
                        }
                    case 2:
                        switch (unidad) {
                            case 0:
                                return 'VEINTE';
                            default:
                                return 'VEINTI' + Unidades(unidad);
                        }
                    case 3:
                        return DecenasY('TREINTA', unidad);
                    case 4:
                        return DecenasY('CUARENTA', unidad);
                    case 5:
                        return DecenasY('CINCUENTA', unidad);
                    case 6:
                        return DecenasY('SESENTA', unidad);
                    case 7:
                        return DecenasY('SETENTA', unidad);
                    case 8:
                        return DecenasY('OCHENTA', unidad);
                    case 9:
                        return DecenasY('NOVENTA', unidad);
                    case 0:
                        return Unidades(unidad);
                }
            } //Unidades()
        
            function DecenasY(strSin, numUnidades) {
                if (numUnidades > 0)
                    return strSin + ' Y ' + Unidades(numUnidades)
        
                return strSin;
            } //DecenasY()
        
            function Centenas(num) {
                let centenas = Math.floor(num / 100);
                let decenas = num - (centenas * 100);
        
                switch (centenas) {
                    case 1:
                        if (decenas > 0)
                            return 'CIENTO ' + Decenas(decenas);
                        return 'CIEN';
                    case 2:
                        return 'DOSCIENTOS ' + Decenas(decenas);
                    case 3:
                        return 'TRESCIENTOS ' + Decenas(decenas);
                    case 4:
                        return 'CUATROCIENTOS ' + Decenas(decenas);
                    case 5:
                        return 'QUINIENTOS ' + Decenas(decenas);
                    case 6:
                        return 'SEISCIENTOS ' + Decenas(decenas);
                    case 7:
                        return 'SETECIENTOS ' + Decenas(decenas);
                    case 8:
                        return 'OCHOCIENTOS ' + Decenas(decenas);
                    case 9:
                        return 'NOVECIENTOS ' + Decenas(decenas);
                }
        
                return Decenas(decenas);
            } //Centenas()
        
            function Seccion(num, divisor, strSingular, strPlural) {
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)
        
                let letras = '';
        
                if (cientos > 0)
                    if (cientos > 1)
                        letras = Centenas(cientos) + ' ' + strPlural;
                    else
                        letras = strSingular;
        
                if (resto > 0)
                    letras += '';
        
                return letras;
            } //Seccion()
        
            function Miles(num) {
                let divisor = 1000;
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)
        
                let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
                let strCentenas = Centenas(resto);
        
                if (strMiles == '')
                    return strCentenas;
        
                return strMiles + ' ' + strCentenas;
            } //Miles()
        
            function Millones(num) {
                let divisor = 1000000;
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)
        
                let strMillones = Seccion(num, divisor, 'UN MILLON', 'MILLONES');
                let strMiles = Miles(resto);
        
                if (strMillones == '')
                    return strMiles;
        
                return strMillones + ' ' + strMiles;
            } //Millones()
            
            
            function MilesMillones(num) {
                let divisor = 1000000000;
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)
        
                let strMillones = Seccion(num, divisor, 'UN MIL MILLON', 'MIL MILLONES');
                let strMiles = Millones(resto);
        
                if (strMillones == '')
                    return strMiles;
        
                return strMillones + ' ' + strMiles;
            } //Millones()
        
            return function NumeroALetras(num, currency) {
                currency = currency || {};
                let data = {
                    numero: num,
                    enteros: Math.floor(num),
                    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                    letrasCentavos: '',
                    letrasMonedaPlural: currency.plural || 'PESOS COLOMBIANOS', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
                    letrasMonedaSingular: currency.singular || 'PESO COLOMBIANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                    letrasMonedaCentavoPlural: currency.centPlural || '',
                    letrasMonedaCentavoSingular: currency.centSingular || ''
                };
        
                if (data.centavos > 0) {
                    data.letrasCentavos = 'CON ' + (function() {
                        if (data.centavos == 1)
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                        else
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                    })();
                };
        
                if (data.enteros == 0)
                    return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
                if (data.enteros == 1)
                    return MilesMillones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
                else
                    return MilesMillones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            };
        
        })();
        
                  
        db.cotizacion.findOne({raw: true, where: { num: cotizacionToDownload } }).then((cotizacionFound) => {
            db.cotizacion_datos.findAll({raw: true, where: { num: cotizacionToDownload } }).then((rowsFound) => {
                db.clientes.findOne({raw: true, where: { client: cotizacionFound.client } }).then((clientFound)=>{
                    db.corte.findAll({raw: true}).then((listadecorte)=>{
                        db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                            db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                                db.material.findAll({raw: true}).then((listadematerial)=>{
                                    db.globalparams.findAll({raw: true, where: { num: cotizacionToDownload }}).then((paramsfound)=>{

                                    if (cotizacionFound){

                                        ls.remove("cotizacionToDownload");

                                        let filename = cotizacionFound.num + "_" + String(clientFound.client).replace(" ","_") +  "_" +  cotizacionFound.proyecto.replace(" ","_") + ".xlsx";
                                        let filename1 = cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_Datos.xlsx";
                                        let filename2 = cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_Remision.xlsx";
                                        let filename3 = cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_OrdenCorte.xlsx";
                                        let filename4 = cotizacionFound.num + "_" +cotizacionFound.proyecto.replace(" ","_") + "_OrdenDoblez.xlsx";
                                        
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
                                
                                            let fecha_aprobacion;
                                            if (cotizacionFound.aprobacion != null){
                                                let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
                                                fecha_aprobacion = fecha_aprobacionsplit[2]+"/"+fecha_aprobacionsplit[1]+"/"+fecha_aprobacionsplit[0];
                                            } else {
                                                fecha_aprobacion = "";
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

                                            // Total cotizacion 
                                            let total = 0;
                                                
                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){

                                                if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && (rowsFound[i][`perimetro`] == null || rowsFound[i][`perimetro`] == 0) && (rowsFound[i][`area`] == null || rowsFound[i][`area`] == 0) && rowsFound[i][`dobleces`] == null && rowsFound[i][`longdoblez`] == null){
                                                    // Llenado de filas de caso cobro diferente a corte/doblez
                                                    worksheet.getCell(`A${27+i}`).value = i+1;
                                                    worksheet.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ".";
                                                    worksheet.getCell(`H${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet.getCell(`L${27+i}`).value = rowsFound[i][`precio`];
                                                    worksheet.getCell(`N${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]);
                                                    worksheet.getCell(`J${27+i}`).value = "Und";
                                                    total += parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]) || 0;

                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet.getCell(`A${27+i}`).value = i+1;
                                                    worksheet.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet.getCell(`H${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet.getCell(`J${27+i}`).value = "Und";

                                                    // Costos
                                                    let corte_por_mm = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadecorte.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                    let piercing_por_pieza = rowsFound[i][`espesor`] != null? listadepiercing.filter(element => element.width == rowsFound[i][`espesor`])[0]["piercing"] : 0;
                                                    let doblez = rowsFound[i][`espesor`] != null? listadedoblez.filter(element => element.width == rowsFound[i][`espesor`])[0]["fold"] : 0;
                                                    let material_por_mm2 = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadematerial.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                    
                                                    // Variables
                                                    let perimetro = rowsFound[i][`perimetro`] != null? parseFloat(rowsFound[i][`perimetro`]) : 0;
                                                    let piercings = rowsFound[i][`piercings`] != null? parseFloat(rowsFound[i][`piercings`]) : 0;
                                                    let numdoblez = rowsFound[i][`dobleces`] != null? parseFloat(rowsFound[i][`dobleces`]) : 0;
                                                    let longdobleces = rowsFound[i][`longdoblez`] != null? parseFloat(rowsFound[i][`longdoblez`]) : 1;

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
                                                    let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez*paramsfound[0].globaldoblez + area*material_por_mm2;

                                                    worksheet.getCell(`L${27+i}`).value = costo_unidad;
                                                    worksheet.getCell(`N${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                                    total += parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                                }
                                            }



                                            worksheet.getCell(`N${37+rowsFound.length}`).value = { formula: `SUM(N27:N${27+rowsFound.length})`, date1904: false };
                                            worksheet.getCell(`N${38+rowsFound.length}`).value = { formula: `N${37+rowsFound.length}*0.19`, date1904: false };
                                            worksheet.getCell(`N${39+rowsFound.length}`).value = { formula: `N${37+rowsFound.length}+N${38+rowsFound.length}`, date1904: false };

                                            // Unmerge Cells
                                            worksheet.unMergeCells(`B${37+rowsFound.length}:G${37+rowsFound.length}`)
                                            worksheet.unMergeCells(`H${37+rowsFound.length}:I${37+rowsFound.length}`)
                                            worksheet.unMergeCells(`J${37+rowsFound.length}:K${37+rowsFound.length}`)
                                            worksheet.unMergeCells(`B${38+rowsFound.length}:G${38+rowsFound.length}`)
                                            worksheet.unMergeCells(`H${38+rowsFound.length}:I${38+rowsFound.length}`)
                                            worksheet.unMergeCells(`J${38+rowsFound.length}:K${38+rowsFound.length}`)
                                            worksheet.unMergeCells(`B${39+rowsFound.length}:G${39+rowsFound.length}`)
                                            worksheet.unMergeCells(`H${39+rowsFound.length}:I${39+rowsFound.length}`)
                                            worksheet.unMergeCells(`J${39+rowsFound.length}:K${39+rowsFound.length}`)
                                            worksheet.unMergeCells(`B${40+rowsFound.length}:G${40+rowsFound.length}`)
                                            worksheet.unMergeCells(`H${40+rowsFound.length}:I${40+rowsFound.length}`)
                                            worksheet.unMergeCells(`J${40+rowsFound.length}:K${40+rowsFound.length}`)
                                            worksheet.unMergeCells(`L${40+rowsFound.length}:M${40+rowsFound.length}`)
                                            worksheet.unMergeCells(`N${40+rowsFound.length}:O${40+rowsFound.length}`)
                                            worksheet.unMergeCells(`B${41+rowsFound.length}:G${41+rowsFound.length}`)
                                            worksheet.unMergeCells(`H${41+rowsFound.length}:I${41+rowsFound.length}`)
                                            worksheet.unMergeCells(`J${41+rowsFound.length}:K${41+rowsFound.length}`)
                                            worksheet.unMergeCells(`L${41+rowsFound.length}:M${41+rowsFound.length}`)
                                            worksheet.unMergeCells(`N${41+rowsFound.length}:O${41+rowsFound.length}`)

                                            // Merge cells
                                            worksheet.mergeCells(`A${37+rowsFound.length}:K${38+rowsFound.length}`);
                                            worksheet.mergeCells(`A${39+rowsFound.length}`, `K${39+rowsFound.length}`);
                                            worksheet.mergeCells(`A${41+rowsFound.length}`, `O${41+rowsFound.length}`);
                                            worksheet.mergeCells(`A${40+rowsFound.length}`, `O${40+rowsFound.length}`);

                                            // Write the tail file format
                                            worksheet.getCell(`L${37+rowsFound.length}`).value = 'SUBTOTAL';
                                            worksheet.getCell(`L${38+rowsFound.length}`).value = 'IVA (19%)';
                                            worksheet.getCell(`L${39+rowsFound.length}`).value = 'TOTAL';
                                            worksheet.getCell(`L${41+rowsFound.length}`).value = 'Favor consignar en la Cuenta Corriente # 277-000027-16 de BANCOLOMBIA (A nombre de Quartec Ingenieria S.A.S.)';
                                            worksheet.getCell(`A${39+rowsFound.length}`).value = numeroALetras(parseInt(Math.round(total*1.19)), {
                                                plural: "PESOS",
                                                singular: "PESO",
                                                centPlural: "CENTAVOS",
                                                centSingular: "CENTAVO"
                                              });

                                            //   Bold style
                                            worksheet.getCell(`L${37+rowsFound.length}`).font = { name: 'Calibri', size: 12, bold: true};
                                            worksheet.getCell(`L${38+rowsFound.length}`).font = { name: 'Calibri', size: 12, bold: true};
                                            worksheet.getCell(`L${39+rowsFound.length}`).font = { name: 'Calibri', size: 12, bold: true};
                                            worksheet.getCell(`L${41+rowsFound.length}`).font = { name: 'Calibri', size: 12, bold: true};
                                            worksheet.getCell(`A${39+rowsFound.length}`).font = { name: 'Calibri', size: 12, bold: true};

                                            worksheet.spliceRows(42 + rowsFound.length, 90);
                        
                                            //workbook.xlsx.writeFile( "./public/files/" + filename);
                                            workbook.xlsx.writeFile( "./public/" + filename).then(convertPDF(filename));
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
                                
                                            let fecha_aprobacion;
                                            if (cotizacionFound.aprobacion != null){
                                                let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
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
                                            worksheet1.getCell('M9').value = cotizacionFound.num;
                                            worksheet1.getCell('M11').value = fecha;
                                            worksheet1.getCell('M12').value = cotizacionFound.validez;
                                            worksheet1.getCell('M13').value = cotizacionFound.entrega;
                                            worksheet1.getCell('M14').value = cotizacionFound.condiciones;
                                            worksheet1.getCell('M15').value = req.session.name;
                                            worksheet1.getCell('J16').value = cotizacionFound.estado;
                                            worksheet1.getCell('O16').value = fecha_aprobacion;
                                            worksheet1.getCell('C24').value = cotizacionFound.proyecto;
                        
                                            // Condiciones comerciales
                                            worksheet1.getCell('A19').value = cotizacionFound.pago;
                                            worksheet1.getCell('A20').value = cotizacionFound.transporte;
                                            worksheet1.getCell('A21').value = cotizacionFound.materiales;

                                            // Observaciones
                                            worksheet1.getCell('D22').value = cotizacionFound.observ1;
                                            worksheet1.getCell('D23').value = cotizacionFound.observ2;

                                            // Total de la cotización
                                            let total = 0;

                                            // Información del formulario
                                            for(let i = 0; i < rowsFound.length ; i++){

                                                if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && (rowsFound[i][`perimetro`] == null || rowsFound[i][`perimetro`] == 0) && (rowsFound[i][`area`] == null || rowsFound[i][`area`] == 0) && rowsFound[i][`dobleces`] == null && rowsFound[i][`longdoblez`] == null){
                                                    // Llenado de filas de caso cobro diferente a corte/doblez
                                                    worksheet1.getCell(`A${27+i}`).value = i+1;
                                                    worksheet1.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ".";
                                                    worksheet1.getCell(`E${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet1.getCell(`F${27+i}`).value = "Und";
                                                    worksheet1.getCell(`H${27+i}`).value = rowsFound[i][`precio`];
                                                    worksheet1.getCell(`J${27+i}`).value = 0;
                                                    worksheet1.getCell(`L${27+i}`).value = 0;
                                                    worksheet1.getCell(`N${27+i}`).value = 0;
                                                    worksheet1.getCell(`P${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]) || 0;
                                                    total += parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]) || 0;

                                                } else {
                                                    // Llenado de filas caso cobro corte/doblez
                                                    worksheet1.getCell(`A${27+i}`).value = i+1;
                                                    worksheet1.getCell(`B${27+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet1.getCell(`E${27+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet1.getCell(`F${27+i}`).value = "Und";

                                                    // Costos
                                                    let corte_por_mm = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadecorte.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                    let piercing_por_pieza = rowsFound[i][`espesor`] != null? listadepiercing.filter(element => element.width == rowsFound[i][`espesor`])[0]["piercing"] : 0;
                                                    let doblez = rowsFound[i][`espesor`] != null? listadedoblez.filter(element => element.width == rowsFound[i][`espesor`])[0]["fold"] : 0;
                                                    let material_por_mm2 = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadematerial.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                    
                                                    // Variables
                                                    let perimetro = rowsFound[i][`perimetro`] != null? parseFloat(rowsFound[i][`perimetro`]) : 0;
                                                    let piercings = rowsFound[i][`piercings`] != null? parseFloat(rowsFound[i][`piercings`]) : 0;
                                                    let numdoblez = rowsFound[i][`dobleces`] != null? parseFloat(rowsFound[i][`dobleces`]) : 0;
                                                    let longdobleces = rowsFound[i][`longdoblez`] != null? parseFloat(rowsFound[i][`longdoblez`]) : 1;

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
                                                    let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez*paramsfound[0].globaldoblez + area*material_por_mm2;
                                                    
                                                    worksheet1.getCell(`H${27+i}`).value = area*material_por_mm2;
                                                    worksheet1.getCell(`J${27+i}`).value = perimetro*corte_por_mm;
                                                    worksheet1.getCell(`L${27+i}`).value = piercings*piercing_por_pieza;
                                                    worksheet1.getCell(`N${27+i}`).value = longdoblezfactor*numdoblez*doblez*paramsfound[0].globaldoblez;
                                                    worksheet1.getCell(`P${27+i}`).value = parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                                    total += parseFloat(rowsFound[i][`cantidad`])*costo_unidad;

                                                }
                                            }

                                            worksheet1.getCell('P91').value = { formula: 'SUM(P27:P90)', date1904: false };
                                            worksheet1.getCell('P92').value = { formula: 'P91*0.19', date1904: false };
                                            worksheet1.getCell('P93').value = { formula: 'P91+P92', date1904: false };
                                            worksheet1.getCell('A93').value = numeroALetras(parseInt(Math.round(total*1.19)), {
                                                plural: "PESOS",
                                                singular: "PESO",
                                                centPlural: "CENTAVOS",
                                                centSingular: "CENTAVO"
                                              });

                                            //workbook1.xlsx.writeFile( "./public/files/" + filename);
                                            workbook1.xlsx.writeFile( "./public/" + filename1).then(convertPDF(filename1));
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
                                
                                            let fecha_aprobacion;
                                            if (cotizacionFound.aprobacion != null){
                                                let fecha_aprobacionsplit = cotizacionFound.aprobacion.split("-");
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
                                                    worksheet2.getCell(`A${21+i}`).value = i+1;
                                                    worksheet2.getCell(`B${21+i}`).value = rowsFound[i][`descripcion`] + ". Material: " + rowsFound[i][`material`] + ". Espesor: " + rowsFound[i][`espesor`] + ".";
                                                    worksheet2.getCell(`H${21+i}`).value = rowsFound[i][`cantidad`];
                                                    worksheet2.getCell(`J${21+i}`).value = "Und";
                                                }
                                            }
                        
                                            //workbook2.xlsx.writeFile( "./public/files/" + filename);
                                            workbook2.xlsx.writeFile( "./public/" + filename2).then(convertPDF(filename2));
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
        
                                                if (rowsFound[i][`perimetro`] == null || rowsFound[i][`perimetro`] == 0){
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
                        
                                            //workbook3.xlsx.writeFile("./public/files/" + filename);
                                            workbook3.xlsx.writeFile( "./public/" + filename3).then(convertPDF(filename3));
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
        
                                                if (rowsFound[i][`dobleces`]== null || rowsFound[i][`dobleces`]== 0){
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
                        
                                            //workbook4.xlsx.writeFile( "./public/files/" + filename);
                                            workbook4.xlsx.writeFile( "./public/" + filename4).then(convertPDF(filename4));
                                        })

// -------------------------------------------------------------------------------------------------------------------------------------   

                                        res.render(path.join(__dirname, '../views/buttons_download'), 
                                        {
                                            numcot: cotizacionToDownload, 
                                            filecotizacion: cotizacionFound.num + "_" + String(clientFound.client).replace(" ","_") +  "_" +  cotizacionFound.proyecto.replace(" ","_") + ".pdf",
                                            fileremision: cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_Remision.pdf",
                                            filedatos: cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_Datos.pdf",
                                            filecorte: cotizacionFound.num + "_" + cotizacionFound.proyecto.replace(" ","_") + "_OrdenCorte.pdf",
                                            filedoblez: cotizacionFound.num + "_" +cotizacionFound.proyecto.replace(" ","_") + "_OrdenDoblez.pdf",
                                        })

                                        deleteDirFilesUsingPattern(String(cotizacionFound.num));

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
         }).catch((err)=>console.log(err));
    },

    numeracion: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/inicio');

        fs.readFile(path.join(__dirname,'../../cotizacion0.txt'), 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            let num0;
            num0 = parseInt(data);
            res.render(path.join(__dirname, '../views/numeracion'), {nummin : num0})
        });
    },

    numeracionPost: (req,res) => {

        fs.writeFile(path.join(__dirname,'../../cotizacion0.txt'), req.body.numero, (err) => {
            if (err) throw err;
            res.redirect('/inicio');
        })
    },

    data: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');
        if (!req.session.isAdmin) return res.redirect('/inicio');

        db.cotizacion.findAll({raw: true }).then((cotizacionesFound) => {
            db.cotizacion_datos.findAll({raw: true }).then((rowsFound) => {
                db.corte.findAll({raw: true}).then((listadecorte)=>{
                    db.doblez.findAll({raw: true}).then((listadedoblez)=>{
                        db.piercing.findAll({raw: true}).then((listadepiercing)=>{
                            db.material.findAll({raw: true}).then((listadematerial)=>{
                                db.globalparams.findAll({raw: true }).then((paramsfound)=>{


                                    var workbook = new Excel.Workbook();
                                    workbook.xlsx.readFile('./PlantillaDatosGenerales.xlsm').then(  function() {

                                        let worksheet = workbook.getWorksheet('Sheet1');

                                        for (let i = 0; i<cotizacionesFound.length; i++){

                                            worksheet.getCell(`A${2+i}`).value = cotizacionesFound[i].num;
                                            worksheet.getCell(`B${2+i}`).value = cotizacionesFound[i].client;
                                            worksheet.getCell(`C${2+i}`).value = cotizacionesFound[i].fecha;
                                            worksheet.getCell(`D${2+i}`).value = cotizacionesFound[i].validez;
                                            worksheet.getCell(`E${2+i}`).value = cotizacionesFound[i].entrega;
                                            worksheet.getCell(`F${2+i}`).value = cotizacionesFound[i].condiciones;
                                            worksheet.getCell(`G${2+i}`).value = cotizacionesFound[i].estado;
                                            worksheet.getCell(`H${2+i}`).value = cotizacionesFound[i].aprobacion;
                                            worksheet.getCell(`I${2+i}`).value = cotizacionesFound[i].proyecto;
                                            worksheet.getCell(`J${2+i}`).value = cotizacionesFound[i].pago;
                                            worksheet.getCell(`K${2+i}`).value = cotizacionesFound[i].transporte;
                                            worksheet.getCell(`L${2+i}`).value = cotizacionesFound[i].materiales;
                                            worksheet.getCell(`M${2+i}`).value = cotizacionesFound[i].asesor;
                                            worksheet.getCell(`N${2+i}`).value = cotizacionesFound[i].observ1;
                                            worksheet.getCell(`O${2+i}`).value = cotizacionesFound[i].observ1;
                                            worksheet.getCell(`P${2+i}`).value = cotizacionesFound[i].aprob;
                                        }

                                        workbook.xlsx.writeFile( "./public/files/" + "Datos_generales.xlsx");
                                    })

                                    var workbook1 = new Excel.Workbook();
                                    workbook1.xlsx.readFile('./PlantillaDatosEspecificos.xlsm').then( function() {

                                        let worksheet1 = workbook1.getWorksheet('Sheet1');

                                        for (let i = 0; i<rowsFound.length; i++){

                                            worksheet1.getCell(`A${2+i}`).value = rowsFound[i].num;
                                            worksheet1.getCell(`B${2+i}`).value = rowsFound[i].cantidad;
                                            worksheet1.getCell(`C${2+i}`).value = rowsFound[i].descripcion;
                                            worksheet1.getCell(`D${2+i}`).value = rowsFound[i].precio;
                                            worksheet1.getCell(`E${2+i}`).value = rowsFound[i].material;
                                            worksheet1.getCell(`F${2+i}`).value = rowsFound[i].espesor;
                                            worksheet1.getCell(`G${2+i}`).value = rowsFound[i].perimetroautocad;
                                            worksheet1.getCell(`H${2+i}`).value = rowsFound[i].factorcorte;
                                            worksheet1.getCell(`I${2+i}`).value = rowsFound[i].perimetro;
                                            worksheet1.getCell(`J${2+i}`).value = rowsFound[i].largoautocad;
                                            worksheet1.getCell(`K${2+i}`).value = rowsFound[i].anchoautocad;
                                            worksheet1.getCell(`L${2+i}`).value = rowsFound[i].factorarea;
                                            worksheet1.getCell(`M${2+i}`).value = rowsFound[i].area;
                                            worksheet1.getCell(`N${2+i}`).value = rowsFound[i].piercing;
                                            worksheet1.getCell(`O${2+i}`).value = rowsFound[i].dobleces;
                                            worksheet1.getCell(`P${2+i}`).value = rowsFound[i].longdobleces;
                                            worksheet1.getCell(`Q${2+i}`).value = rowsFound[i].conmaterial;

                                            let globs = paramsfound.filter((el) => el.num == rowsFound[i].num);
                                            worksheet1.getCell(`R${2+i}`).value = globs[0].globalcorte;
                                            worksheet1.getCell(`S${2+i}`).value = globs[0].globalmaterial;
                                            worksheet1.getCell(`T${2+i}`).value = globs[0].globaldoblez;

                                            if (rowsFound[i][`material`] == null && rowsFound[i][`espesor`] == null && (rowsFound[i][`perimetro`] == null || rowsFound[i][`perimetro`] == 0) && (rowsFound[i][`area`] == null || rowsFound[i][`area`] == 0) && rowsFound[i][`dobleces`] == null && rowsFound[i][`longdoblez`] == null){
                                                // Llenado de filas de caso cobro diferente a corte/doblez
                                                worksheet1.getCell(`U${2+i}`).value = 0;
                                                worksheet1.getCell(`V${2+i}`).value = 0;
                                                worksheet1.getCell(`W${2+i}`).value = 0;
                                                worksheet1.getCell(`X${2+i}`).value = 0;
                                                worksheet1.getCell(`Y${2+i}`).value = parseFloat(rowsFound[i][`cantidad`])*parseFloat(rowsFound[i][`precio`]) || 0;

                                            } else {
                                                // Llenado de filas caso cobro corte/doblez

                                                // Costos
                                                let corte_por_mm = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadecorte.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                let piercing_por_pieza = rowsFound[i][`espesor`] != null? listadepiercing.filter(element => element.width == rowsFound[i][`espesor`])[0]["piercing"] : 0;
                                                let doblez = rowsFound[i][`espesor`] != null? listadedoblez.filter(element => element.width == rowsFound[i][`espesor`])[0]["fold"] : 0;
                                                let material_por_mm2 = rowsFound[i][`material`] != null && rowsFound[i][`espesor`] != null? listadematerial.filter(element => element.width == rowsFound[i][`espesor`])[0][rowsFound[i][`material`]] : 0;
                                                
                                                // Variables
                                                let perimetro = rowsFound[i][`perimetro`] != null? parseFloat(rowsFound[i][`perimetro`]) : 0;
                                                let piercings = rowsFound[i][`piercings`] != null? parseFloat(rowsFound[i][`piercings`]) : 0;
                                                let numdoblez = rowsFound[i][`dobleces`] != null? parseFloat(rowsFound[i][`dobleces`]) : 0;
                                                let longdobleces = rowsFound[i][`longdoblez`] != null? parseFloat(rowsFound[i][`longdoblez`]) : 1;

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
                                                let costo_unidad = perimetro*corte_por_mm + piercings*piercing_por_pieza + longdoblezfactor*numdoblez*doblez*paramsfound[0].globaldoblez + area*material_por_mm2;
                                                
                                                worksheet1.getCell(`U${2+i}`).value = area*material_por_mm2;
                                                worksheet1.getCell(`V${2+i}`).value = perimetro*corte_por_mm;
                                                worksheet1.getCell(`W${2+i}`).value = piercings*piercing_por_pieza;
                                                worksheet1.getCell(`X${2+i}`).value = longdoblezfactor*numdoblez*doblez*paramsfound[0].globaldoblez;
                                                worksheet1.getCell(`Y${2+i}`).value = parseFloat(rowsFound[i][`cantidad`])*costo_unidad;
                                            }
                                        }

                                        workbook1.xlsx.writeFile( "./public/files/" + "Datos_especificos.xlsx");
                                    })
                
                                    res.render(path.join(__dirname, '../views/data'));

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