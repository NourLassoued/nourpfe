const { json } = require("express");
const orderModel = require("../models/ordershema.js");
const userModel = require("../models/userschema.js");




module.exports.createOrder = async (req, res) => {
    try {
        const { orderNumber, totalPrice, status } = req.body;

        const newOrder = new orderModel({
            orderNumber,
            totalPrice,
            status, // Statut par défaut à 'pending' si non fourni
        });

        const savedOrder = await newOrder.save(); // Sauvegarder la commande dans la base de données
        res.status(201).json({ savedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les commandes
module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find(); // Récupérer toutes les commandes
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une commande par ID
module.exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une commande
module.exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderNumber, totalPrice, status } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            { orderNumber, totalPrice, status },
            { new: true } // Renvoie la commande mise à jour
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une commande
module.exports.deleteOrderById = async (req, res) => {
    try {
        const { id } = req.params;
         const {iduser } = req.body; // facon simple
        const deletedOrder = await orderModel.findByIdAndDelete(id);
        await userModel.updateOne({iduser},{$pull : {orders : id} })
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.assignOrderToUser = async (req, res) => {
    try {
        const { orderId, userId } = req.body; // Recevez l'ID de la commande et l'ID de l'utilisateur

        // Trouver la commande par ID
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Vérifiez si l'utilisateur existe
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Affectez l'utilisateur à la commande
        order.userorderId = userId; // Associe l'utilisateur à la commande
        await order.save(); // Sauvegardez l'instance de commande

        // Ajoutez l'ID de la commande à la liste des commandes de l'utilisateur
        user.orders.push(orderId); // Ajoute l'ID de la commande à la liste des commandes de l'utilisateur
        await user.save(); // Sauvegardez l'instance d'utilisateur

        res.status(200).json({ message: 'Order successfully assigned to user', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.deassignOrderFromUser = async (req, res) => {
    try {
        const { orderId, userId } = req.body; // Recevez les IDs de la commande et de l'utilisateur

        // Supprimer l'ID de l'utilisateur de la commande
        await orderModel.findByIdAndUpdate(orderId, { $unset: { userorderId: "" } });

        // Retirer l'ID de la commande de la liste des commandes de l'utilisateur
        await userModel.findByIdAndUpdate(userId, {
            $pull: { orders: orderId },
        });

        res.status(200).json("Order successfully deassigned from user");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

