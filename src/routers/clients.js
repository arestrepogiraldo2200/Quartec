
const express = require('express');
let router = express.Router();
const path = require('path');
const clientsController = require('../controllers/clientsController');

router.get('/crear-cliente', clientsController.main);
router.post('/crear-cliente', clientsController.create);

module.exports = router;
