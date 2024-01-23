const Order = require('../models/order');

module.exports = {
    createOrder: async (orderData) => {
        try {
            const newOrder = new Order(orderData);

            // add quantity of books in stock

            return await newOrder.save();
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    findMaxTotalPriceOrderInRange: async (startDate, endDate) => {
        try {

        } catch (error) {
            console.error('Error finding max total price order:', error);
            throw error;
        }
    },

    findMostPopularGenresInRange: async (startDate, endDate) => {
        try {
        } catch (error) {
            console.error('Error finding most popular genres:', error);
            throw error;
        }
    },

    findTotalProfitInRange: async (startDate, endDate) => {
        try {
        } catch (error) {
            console.error('Error finding total profit:', error);
            throw error;
        }
    },

    findMostBoughtAuthorsInRange: async (startDate, endDate) => {
        try {

        } catch (error) {
            console.error('Error finding most bought authors:', error);
            throw error;
        }
    },
};
