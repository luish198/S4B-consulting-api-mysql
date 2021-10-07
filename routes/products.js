const express = require('express');
const {getProducts, getOneProductById} = require('../controllers/products')

const router = express.Router();

router.get('/',getProducts);

router.get('/:product_id', getOneProductById )

module.exports = router
