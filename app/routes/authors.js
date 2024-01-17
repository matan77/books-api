const controller = require('../controllers/authors');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');


router.get('/:page', cacheNoStore, controller.listAuthors);
router.get('/', cacheNoStore, controller.listAuthors);
router.post('/', cacheNoStore, controller.createAuthor);
router.patch('/:id', cacheNoStore, controller.updateAuthor);

module.exports = router;