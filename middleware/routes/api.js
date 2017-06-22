/**
*  Copyright (C) 2017
*
*   Kaan K.
*   Artur B.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

var jwt = require('express-jwt');
const secret = require('../config/db.config').secret;
var auth = jwt({
  secret: secret,
  userProperty: 'payload'
});
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

var products = require('./products/products');
var categories = require('./categories/categories');
var colors = require('./colors/colors');
var order = require('./order/order');

router.get('/', (req, res) => {
  return res.send('api works');
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// products
router.use('/products', products);

// categories
router.use('/categories', categories);

// colors
router.use('/colors', colors);

// order
router.use('/order', order);

module.exports = router;