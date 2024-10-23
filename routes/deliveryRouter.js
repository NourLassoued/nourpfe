const express = require('express');
const router = express.Router();
const deliveryController = require('../controller/deliveryController.js');

router.post('/createDelivery', deliveryController.createDelivery);
router.get('/getAllDeliveries', deliveryController.getAllDeliveries);

router.get('/getDeliveryById/:id', deliveryController.getDeliveryById);
router.put('/updateDelivery/:id', deliveryController.updateDelivery);
module.exports = router;
