/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur B.
*
*  MIT License
*/

/**
 * The complete documentation of the backend
 * can be found in the ../postman/Cap'n Can.postman_collection.json file.
 * Import it in your local postman environment.
 */

const express = require('express');
const router = express.Router();

var user = require('./user/user');
var products = require('./products/products');
var categories = require('./categories/categories');
var colors = require('./colors/colors');
var order = require('./order/order');

router.get('/', (req, res) => {
  return res.send('api works');
});

// user
router.use('/user', user);

// products
router.use('/products', products);

// categories
router.use('/categories', categories);

// colors
router.use('/colors', colors);

// order
router.use('/order', order);

module.exports = router;