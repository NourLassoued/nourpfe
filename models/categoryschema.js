const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Relation with Product
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;