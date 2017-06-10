/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
var Products = mongoose.model('Products');

router.post('/add', (req, res) => {
    var product = req.body;
    if (!product || product.p_name || product.p_image || product.p_description || product.p_price || product.p_category) {
        return res.status(500);
    }

    
});

router.put('/update/:id', (req, res) => {

});

router.delete('/remove/:id', (req, res) => {

});

// get all products
router.get('/all', (req, res) => {
  Products.find((err, products) => {
    if (err) {
      return next(err);
    }
    return res.send(products);
  });
});

// get product details
router.get('/details/:id', (req, res) => {

});

// get products by category
router.get('/category/:category', (req, res) => {

});

// get the most popular products of each category
router.get('/popular', (req, res) => {

});

// get all category names
router.get('/categories', (req, res) => {

});

module.exports = router;