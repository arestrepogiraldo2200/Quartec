
const express = require('express');
let router = express.Router();
const path = require('path');
const cotizacionController = require('../controllers/cotizacionController');

router.get('/cotizacion', cotizacionController.main);

module.exports = router;
