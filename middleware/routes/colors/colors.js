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
var Colors = mongoose.model('Colors');

// add array of hex values
router.post('/add', (req, res, next) => {
    var colors = [];
    if (!req.body.data) {
        return res.status(500).json({ 'message': 'No body defined' });
    }
    colors = req.body.data;
    colors.forEach((color) => {
        if (!color.name || !color.hexcode || color.selected === undefined) {
            return res.status(500).json({ 'message': 'Color is corrupt.' });
        }
        Colors.create(
            {
                name: color.name,
                hexcode: color.hexcode,
                selected: false
            },
            (err) => {
                if (err) {
                    return next(err);
                }
            }
        )
    });
    return res.send(200);
});

// get all colors
router.get('/all', (req, res, next) => {
    Colors
        .find()
        .select('-_id name hexcode selected')
        .exec((err, colors) => {
            if (err) {
                return next(err);
            }
            return res.send(colors);
        });
});

module.exports = router;