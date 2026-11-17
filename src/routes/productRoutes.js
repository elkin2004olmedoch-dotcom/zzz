const express = require('express');
const controller = require('../controllers/productController');
const { validateProduct, validateId, validatePagination } = require('../middleware/validateProduct');

const router = express.Router();

router.get('/', validatePagination, controller.getAll);
router.get('/:id', validateId, controller.getById);
router.post('/', validateProduct(), controller.create);
router.put('/:id', validateId, validateProduct(), controller.replace);
router.patch('/:id', validateId, validateProduct({ partial: true }), controller.update);
router.delete('/:id', validateId, controller.remove);

module.exports = router;