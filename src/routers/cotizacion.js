
const express = require('express');
let router = express.Router();
const path = require('path');
const cotizacionController = require('../controllers/cotizacionController');

router.get('/cotizacion', cotizacionController.main);
router.post('/cotizacion', cotizacionController.createFile);
router.get('/downloadfile/:num/:cliente/:proyecto', cotizacionController.downloadfile);

module.exports = router;
