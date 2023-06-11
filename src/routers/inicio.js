
let express = require('express');
const router = express.Router();
const path = require('path');
const inicioController = require('../controllers/inicioController')

router.get("/inicio", inicioController.main);

module.exports = router;