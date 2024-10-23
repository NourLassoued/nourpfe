const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');



router.post('/createProduct', productController.createProduct);
router.get('/getProductById/:productId', productController.getProductById);
router.get('/getAllProducts', productController.getAllProducts);
router.put('/updateProduct/:productId', productController.updateProduct);

router.delete('/deleteProduct/:productId', productController.deleteProduct);
module.exports = router;
