var express = require('express');
var router = express.Router();
const orderItemController = require('../controller/orderItemController');




router.post('/createOrderItem', orderItemController.createOrderItem);
router.get('/getOrderItemDetails/:orderItemId', orderItemController.getOrderItemDetails);
router.delete('/deleteOrderItem/:orderItemId', orderItemController.deleteOrderItem);
router.put('/updateOrderItem/:orderItemId', orderItemController.updateOrderItem);
router.get('/getAllOrderItems', orderItemController.getAllOrderItems);












module.exports = router;