const controller = require('../controllers/books');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');

router.get('/search', cacheNoStore, controller.searchBooksByName);
router.get('/genre', cacheNoStore, controller.filterBooksByGenre);
router.get('/yearRange', cacheNoStore, controller.filterBooksByYearRange);
router.get('/authorCountry', cacheNoStore, controller.filterBooksByAuthorCountry);
router.get('/:page', cacheNoStore, controller.listBooks);
router.get('/', cacheNoStore, controller.listBooks);
router.post('/', cacheNoStore, controller.createBook);
router.delete('/:id', cacheNoStore, controller.deleteBook);

module.exports = router;
