const orderService = require('../services/orders');

module.exports = {
    createOrder: async (req, res) => {
        try {
            const items = req.body;
            const newOrder = await orderService.createOrder(items);
            res.json(newOrder);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },

    findMaxTotalPriceOrderInRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const maxTotalPriceOrder = await orderService.findMaxTotalPriceOrderInRange(startDate, endDate);
            res.json(maxTotalPriceOrder);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },

    findMostPopularGenresInRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const popularGenres = await orderService.findMostPopularGenresInRange(startDate, endDate);
            res.json(popularGenres);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },

    findTotalProfitInRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const totalProfit = await orderService.findTotalProfitInRange(startDate, endDate);
            res.json(totalProfit);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },

    findMostBoughtAuthorsInRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const mostBoughtAuthors = await orderService.findMostBoughtAuthorsInRange(startDate, endDate);
            res.json(mostBoughtAuthors);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    }
};
