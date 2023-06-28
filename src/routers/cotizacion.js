
const express = require('express');
let router = express.Router();
const path = require('path');
const cotizacionController = require('../controllers/cotizacionController');

router.get('/cotizacion', cotizacionController.main);
router.post('/cotizacion', cotizacionController.createFile);
router.get('/downloadfile/:nombrearchivo', cotizacionController.downloadfile);

router.get('/edit-cotizacion', cotizacionController.selectCotizacion);
router.post('/edit-cotizacion', cotizacionController.selectCotizacionPost);
router.get('/edit-cotizacion-form', cotizacionController.editCotizacionGetForm);
router.post('/edit-cotizacion-form', cotizacionController.createFile);

router.get('/register-cotizacion', cotizacionController.registerGet);
router.post('/register-cotizacion', cotizacionController.registerPost);

module.exports = router;
