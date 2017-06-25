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
var Categories = mongoose.model('Categories');

// search products
router.get('/search/:query', (req, res, next) => {
    Products
        .find({ name: { $regex: req.params.query, $options: 'i'} })
        .select('-_id id name image price')
        .exec((err, products) => {
            if (err) {
                return next(err);
            }
            return res.send(products);
        });
});

// get all products
router.get('/all', (req, res, next) => {
    Products
        .find()
        .select('-_id id name image price')
        .exec((err, products) => {
            if (err) {
                return next(err);
            }
            return res.send(products);
        });
});

// get product details
router.get('/details/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.status(500).json({ 'message': 'No product id passed' });
    }
    Products
        .findOne({id: req.params.id})
        .select('-_id id name image quantity description information price')
        .exec((err, product) => {
            if (err) {
                return next(err);
            }
            if (!product) {
                return res.status(500).json('No product found');
            }
            return res.send(product);
        });
});

// get products by category
router.get('/category/:category', (req, res, next) => {
    if (!req.params.category) {
        return res.status(500).json({ 'message': 'No category passed' });
    }
    Categories
        .find()
        .select('-_id name')
        .exec((err, categories) => {
            let categoryExists = false;
            categories.forEach((category) => {
                if (category.name === req.params.category) {
                    categoryExists = true;
                }
            });
            if (!categoryExists) {
                return res.status(500).json({ 'message': 'Category invalid' });
            }
            Products
                .find({ category: req.params.category })
                .select('-_id id name image price')
                .exec((err, products) => {
                    if (err) {
                        return next(err);
                    }
                    return res.send(products);
                });
        });
});

// get the most popular products of each category
router.get('/popular', (req, res, next) => {
    let productNames = [
        "CAP'N CAN Artist Acrylic Spray 400 ml",
        "CAP'N CAN Artist Marker 4-8 mm",
        "CAP'N CAN Artist Cap"
    ];
    Products
        .find()
        .where('name').in(productNames)
        .select('-_id id name image price')
        .sort('price')
        .exec((err, products) => {
            if (err) {
                return next(err);
            }
            return res.send(products.reverse());
        });
});

// add new product(s) to the shop
router.post('/add', (req, res, next) => {
    let products = [];
    if (!req.body.data) {
        return res.sendStatus(500).json({ 'message': 'No body defined.' });
    }
    products = req.body.data;
    products.forEach((product) => {
        if (!product.name || !product.image || !product.description || !product.price || !product.category) {
            return res.sendStatus(500).json({ 'message': 'Product is corrupt.' });
        }
        Categories
            .find({ name: product.category })
            .exec((err, category) => {
                if (err) {
                    return next(err);
                }
                if (category.length === 0) {
                    return next(err);
                }
                Products.create(
                    {
                        name: product.name,
                        image: product.image,
                        quantity: product.quantity ? product.quantity : null,
                        description: product.description,
                        information: product.information ? product.information : null,
                        price: product.price,
                        category: product.category
                    },
                    (err) => {
                        if (err) {
                            return next(err);
                        }
                    }
                );
            });
    });
    return res.sendStatus(200);
});

router.put('/update', (req, res, next) => {

});

module.exports = router;