
const express = require('express');
let router = express.Router();
const path = require('path');
const clientsController = require('../controllers/clientsController');

router.get('/crear-cliente', clientsController.main);
router.post('/crear-cliente', clientsController.create);
router.get('/editar-cliente', clientsController.selectClient);
router.post('/editar-cliente', clientsController.selectClientPost);
router.get('/editar-cliente-form', clientsController.editClientGetForm);
router.post('/editar-cliente-form', clientsController.editClientPostForm);
router.get('/eliminar-cliente', clientsController.deleteClient);
router.post('/eliminar-cliente', clientsController.deleteClientPost);

module.exports = router;
