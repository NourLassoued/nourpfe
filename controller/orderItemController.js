const { json } = require("express");

const OrderItem = require('../models/orderItemschema');
const Order = require('../models/ordershema');
const Product=require('../models/productschema');


module.exports.createOrderItem = async (req, res) => {
    try {
        const { productId, quantity, price, orderId } = req.body;

        // Vérifier si le produit existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Vérifier si la quantité demandée est disponible
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock for this product' });
        }

        // Créer un nouvel élément de commande
        const newOrderItem = new OrderItem({
            productId,
            quantity,
            price,
            orderId
        });

        // Sauvegarder l'élément de commande
        const savedOrderItem = await newOrderItem.save();

        // Mettre à jour la commande existante
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderItems.push(savedOrderItem._id); // Ajouter l'élément à la commande
        order.totalPrice += quantity * price; // Mettre à jour le prix total de la commande
        await order.save(); // Sauvegarder la commande mise à jour

        // Mettre à jour le stock du produit
        product.stock -= quantity; // Réduire le stock
        await product.save(); // Sauvegarder le produit avec le stock mis à jour

        res.status(201).json(savedOrderItem); // Renvoie l'élément créé
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getOrderItemDetails = async (req, res) => {
    try {
        const { orderItemId } = req.params;

        // Trouver l'élément de commande par ID
        const orderItem = await OrderItem.findById(orderItemId);
        
        if (!orderItem) {
            return res.status(404).json({ message: 'OrderItem not found' });
        }

        // Retourner uniquement les détails de l'élément de commande
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params; // Récupérer l'ID de l'élément de commande à supprimer

        // Supprimer l'élément de commande par ID
        const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

        if (!deletedOrderItem) {
            return res.status(404).json({ message: 'OrderItem not found' });
        }

        res.status(200).json({ message: 'OrderItem successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.deleteOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params; // Récupérer l'ID de l'élément de commande à supprimer

        // Trouver l'élément de commande à supprimer
        const orderItem = await OrderItem.findById(orderItemId);
        if (!orderItem) {
            return res.status(404).json({ message: 'OrderItem not found' });
        }

        // Supprimer l'élément de commande par ID
        await OrderItem.findByIdAndDelete(orderItemId);

        // Supprimer l'ID de l'élément de commande de l'ordre correspondant
        await Order.findByIdAndUpdate(orderItem.orderId, {
            $pull: { orderItems: orderItemId } // Retirer l'élément de commande de l'ordre
        });

        res.status(200).json({ message: 'OrderItem successfully deleted and removed from the order' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params;
        const { quantity, price } = req.body; // Recevez les nouvelles valeurs

        // Trouver l'élément de commande par ID et mettre à jour
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(
            orderItemId,
            { quantity, price },
            { new: true } // Retourne le document mis à jour
        );

        if (!updatedOrderItem) {
            return res.status(404).json({ message: 'OrderItem not found' });
        }

        res.status(200).json({ message: 'OrderItem successfully updated', updatedOrderItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getAllOrderItems = async (req, res) => {
    try {
        // Récupérer tous les éléments de commande
        const orderItems = await OrderItem.find(); // Vous pouvez ajouter des options de peuplement si nécessaire

        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};