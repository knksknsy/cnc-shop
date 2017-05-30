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

var mongoose = require('mongoose');
var Products = mongoose.model('Products');

router.get('/', (req, res) => {
    res.send('api works');
});

// Get all products
router.get('/products', (req, res) => {
  Products.find((err, products) => {
    if (err) {
      return next(err);
    }
    res.json(products);
  });
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;