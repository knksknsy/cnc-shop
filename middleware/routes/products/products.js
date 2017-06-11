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
    return res.send('works');
});

// get products by category
router.get('/category/:category', (req, res) => {
    return res.send('works');
});

// get the most popular products of each category
router.post('/popular', (req, res) => {
    // lookup p_id from
    // CAP'N CAN Artist Acrylic Spray 400 ml
    // CAP'N CAN Artist Marker 4-8 mm
    // CAP'N CAN Artist Cap
    return res.send('works');
});

// get all category names
router.get('/categories', (req, res) => {
    return res.send('works');
});

// add new product(s) to the shop
router.post('/new', (req, res) => {
    var products = [];
    if (!req.body.data) {
        return res.status(500).json({ 'message': 'No body defined.' });
    }
    products = req.body.data;
    products.forEach((product) => {
        if (!product.p_name || !product.p_image || !product.p_description || !product.p_price || !product.p_category) {
            console.error('error', product);
            return res.status(500).json({'message': 'Product is corrupt.'});
        }
        Products.create(
            {
                p_name: product.p_name,
                p_image: product.p_image,
                p_quantity: product.p_quantity ? product.p_quantity : null,
                p_description: product.p_description,
                p_information: product.p_information ? product.p_information : null,
                p_price: product.p_price,
                p_category: product.p_category
            },
            (err, data) => {
                if (err) {
                    console.error('error after save', err);
                    return res.status(500);
                }
                if (data) {
                    console.log('saved p_id', data.p_id);
                }
            }
        );
    });
    return res.send(200);
});

// router.put('/update/:id', (req, res) => {
//     return res.send('works');    
// });

// router.delete('/remove/:id', (req, res) => {
//     return res.send('works');
// });

module.exports = router;