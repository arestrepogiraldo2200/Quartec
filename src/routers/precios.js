
const express = require('express');
let router = express.Router();
const path = require('path');
const preciosController = require('../controllers/preciosController');

router.get('/editar-precios', preciosController.main);
router.post('/editar-precios', preciosController.writeData);

module.exports = router;