const mongoose = require('mongoose');

const deliveryschema = new mongoose.Schema({
    deliveryDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'canceled'], 
        default: 'pending' 
    }, 
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Relation with Order
}, { timestamps: true });

const Delivery = mongoose.model('Delivery', deliveryschema);
module.exports = Delivery;
