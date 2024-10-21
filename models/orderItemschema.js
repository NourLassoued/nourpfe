const mongoose=require('mongoose');



const orderItemschema = new mongoose.Schema({
   // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Référence au produit
    quantity: { type: Number, required: true }, // Quantité du produit dans la commande
    price: { type: Number, required: true }, // Prix du produit au moment de la commande
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true } // Référence à la commande
}, { timestamps: true });

const OrderItem = mongoose.model('OrderItem', orderItemschema);
module.exports = OrderItem;