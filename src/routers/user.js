
let express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')

router.get("/editar-datos", userController.getForm);
router.post("/editar-datos", userController.postForm);

router.get("/crear-asesor", userController.createUser);
router.post("/crear-asesor", userController.createUserPost);

router.get("/eliminar-asesor", userController.deleteUser);
router.post("/eliminar-asesor", userController.deleteUserPost);

module.exports = router;