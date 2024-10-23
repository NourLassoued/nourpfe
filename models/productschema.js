const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name: { type: String, required: true }, // Nom du produit
    description: { type: String, required: true }, // Description du produit
    price: { type: Number, required: true }, // Prix du produit
    stock: { type: Number, required: true, default: 0 }, // Quantité en stock
   
    createdAt: { type: Date, default: Date.now }, // Date de création
    updatedAt: { type: Date, default: Date.now } ,// Date de mise à jour
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Relation avec Category
}, { timestamps: true });


const Product = mongoose.model('Product', productschema);
module.exports = Product;
