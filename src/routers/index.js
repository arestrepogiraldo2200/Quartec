
let express = require('express');
const router = express.Router();
const path = require('path');
const indexController = require('../controllers/indexController')

router.get("/", indexController.main);
router.post("/", indexController.login);
router.get("/logout", indexController.logout);

module.exports = router;