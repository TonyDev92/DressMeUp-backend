const express = require('express');
const upload = require('../../middleware/upload');
const { isAuth } = require('../../middleware/auth');
const router = express.Router();

const { getProduct, getProductById , postProduct , putProduct , deleteProduct } = require('../controllers/product.controller');

router.get('/' , getProduct);
router.get('/:id', getProductById);
router.post('/' , [isAuth], upload.single('image'), postProduct);
router.put('/:id', [isAuth], upload.single('image'),  putProduct);
router.delete('/:id',[isAuth] , deleteProduct);

module.exports = router;
