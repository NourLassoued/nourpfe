const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController.js'); // Importer le contrôleur


router.post('/createCategory', categoryController.createCategory);



module.exports = router;


