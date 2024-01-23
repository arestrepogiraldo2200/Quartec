
const express = require('express');
let router = express.Router();
const path = require('path');
const preciosController = require('../controllers/preciosController');

router.get('/editar-precios', preciosController.main);
router.post('/editar-precios', preciosController.writeData);

router.get('/ver-precios', preciosController.seePrices);

module.exports = router;