const Delivery = require('../models/deliveryschema.js'); // Importez le modèle Delivery
const Order = require('../models/ordershema.js'); // Importez le modèle Order



module.exports.createDelivery = async (req, res) => {
    try {
        const { orderId, deliveryDate, status } = req.body;

        // Vérifier si la commande existe
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Créer une nouvelle instance de livraison
        const newDelivery = new Delivery({
            orderId,
            deliveryDate,
            status
        });

        // Sauvegarder la nouvelle livraison dans la base de données
        const savedDelivery = await newDelivery.save();

        // Envoyer la livraison créée comme réponse
        res.status(201).json({ message: 'Delivery created successfully', savedDelivery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getAllDeliveries = async (req, res) => {
    try {
        // Récupérer toutes les livraisons
        const deliveries = await Delivery.find().populate('orderId');
        
        // Envoyer la réponse avec la liste des livraisons
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getDeliveryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Chercher la livraison par ID
        const delivery = await Delivery.findById(id).populate('orderId');
        
        // Si la livraison n'est pas trouvée
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // Si la livraison est trouvée, la renvoyer dans la réponse
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const { deliveryDate, status, address } = req.body;

        // Chercher la livraison par ID
        const delivery = await Delivery.findById(id);
        
        // Si la livraison n'est pas trouvée
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // Mettre à jour les informations de la livraison
        delivery.deliveryDate = deliveryDate || delivery.deliveryDate;
        delivery.status = status || delivery.status;
        delivery.address = address || delivery.address;

        // Sauvegarder les modifications
        const updatedDelivery = await delivery.save();

        res.status(200).json(updatedDelivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};