const mongoose=require('mongoose');


const orderschema = new mongoose.Schema({
    orderNumber: { type: String, required: true }, // Numéro unique de la commande
    totalPrice: { type: Number, required: true }, // Prix total de la commande
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' // Statut de la commande
},
userorderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur
orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }] ,// Référence aux éléments de commande
delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' } // Relation with Delivery
}, { timestamps: true });

const Order = mongoose.model('Order', orderschema);
module.exports = Order;