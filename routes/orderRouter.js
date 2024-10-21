var express = require('express');
var router = express.Router();
const orderController = require('../controller/orderController.js');


router.get('/getAllOrders',orderController.getAllOrders);
router.delete('/deleteOrderById/:id',orderController.deleteOrderById);
router.post('/createOrder',orderController.createOrder);
router.post('/assignOrderToUser', orderController.assignOrderToUser);
router.post('/deassignOrderFromUser', orderController.deassignOrderFromUser);
router.put('/updateOrder/:id',orderController.updateOrder);
//router.get('/getUserById/:id',userController.getUserById);


module.exports = router;
