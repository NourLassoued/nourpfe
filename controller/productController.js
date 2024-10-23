const Product = require('../models/productschema.js');



module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Création d'un nouveau produit
        const newProduct = new Product({
            name,
            description,
            price,
            stock
        });

        // Sauvegarde du produit dans la base de données
        const savedProduct = await newProduct.save();

        // Réponse avec le produit créé
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params; // Récupérer l'ID du produit depuis les paramètres d'URL

        // Trouver le produit par ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Si le produit n'existe pas
        }

        res.status(200).json(product); // Retourner les détails du produit
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.getAllProducts = async (req, res) => {
    try {
        // Récupérer tous les produits
        const products = await Product.find();

        // Si aucun produit n'est trouvé
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Renvoie la liste des produits
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, stock } = req.body;

        // Trouver le produit par ID et mettre à jour ses champs
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, stock }, // Champs à mettre à jour
            { new: true, runValidators: true } // Options : renvoyer le produit mis à jour et valider les données
        );

        // Si le produit n'existe pas
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Renvoie le produit mis à jour
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Récupérer l'ID du produit depuis les paramètres d'URL

        // Trouver et supprimer le produit par son ID
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' }); // Si le produit n'existe pas
        }

        res.status(200).json({ message: 'Product deleted successfully' }); // Confirmation de suppression
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
