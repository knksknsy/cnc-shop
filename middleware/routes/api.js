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

var products = require('./products');
var colors = require('./colors');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/', (req, res) => {
    res.send('api works');
});

// products
router.use('/products', products);

// colors
router.use('/colors', colors);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;