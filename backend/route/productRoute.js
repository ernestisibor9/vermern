const express = require('express');
const { addProduct } = require('../controller/productController');
const route = express.Router();

route.post('/addproduct', addProduct)

module.exports = route;