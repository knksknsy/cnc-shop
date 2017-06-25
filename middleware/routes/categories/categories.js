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
var Categories = mongoose.model('Categories');

router.post('/add', (req, res, next) => {
    var categories = [];
    if (!req.body.data) {
        // return res.status(500).json({ 'message': 'No body defined' });
        return next(err);
    }
    categories = req.body.data;
    categories.forEach((category) => {
        if (!category.name || !category.image) {
            return res.status(500).json({ 'message': 'Category is corrupt.' });
        }
        Categories.create(
            {
                name: category.name,
                image: category.image
            },
            (err) => {
                if (err) {
                    return next(err);
                }
            }
        );
    });
    return res.sendStatus(200);
});

router.get('/all', (req, res, next) => {
    Categories
        .find()
        .select('-_id name image')
        .exec((err, categories) => {
            if (err) {
                return next(err);
            }
            return res.send(categories);
        });
});

module.exports = router;
