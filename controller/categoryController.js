const Category = require('../models/categoryschema.js'); // Importer le modèle Category

module.exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Créer une nouvelle catégorie avec les données fournies
        const newCategory = new Category({
            name,
            description
        });

        // Sauvegarder la catégorie dans la base de données
        const savedCategory = await newCategory.save();

        // Envoyer la réponse avec la nouvelle catégorie créée
        res.status(201).json(savedCategory);
    } catch (error) {
        // En cas d'erreur, retourner une réponse d'erreur
        res.status(500).json({ message: error.message });
    }
};
