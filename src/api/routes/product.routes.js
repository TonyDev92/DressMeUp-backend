const express = require('express');
const upload = require('../../middleware/upload');
const router = express.Router();

const { getProduct, getProductById , postProduct , putProduct , deleteProduct } = require('../controllers/product.controller');

router.get('/' , getProduct);
router.get('/:id', getProductById);
router.post('/' , upload.single('image'), postProduct);
router.put('/:id',upload.single('image'),  putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
