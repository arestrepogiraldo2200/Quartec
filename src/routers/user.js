
let express = require('express');
const router = express.Router();
const path = require('path');
const inicioController = require('../controllers/userController')

router.get("/editar-datos", inicioController.getForm);
router.post("/editar-datos", inicioController.postForm);

module.exports = router;