const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders');
const cacheNoStore = require('../middlewares/cacheNoStore');

router.post('/', cacheNoStore, controller.createOrder);
router.get('/maxTotalPrice', cacheNoStore, controller.findMaxTotalPriceOrderInRange);
router.get('/popularGenres', cacheNoStore, controller.findMostPopularGenresInRange);
router.get('/totalProfit', cacheNoStore, controller.findTotalProfitInRange);
router.get('/mostBoughtAuthors', cacheNoStore, controller.findMostBoughtAuthorsInRange);

module.exports = router;