/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
var User = mongoose.model('Users');

var mongoose = require('mongoose');

router.get('/key', (req, res, next) => {
    // todo: check user authentication
    if (req.mySession && req.mySession.user) {
        User
            .findOne({ email: req.mySession.user })
            .select('-_id orderId')
            .exec((err, orderId) => {
                if (err) {
                    return next(err);
                }
                return res.send({ id: orderId });
            });
    } else {
        return res.send({ id: null });
    }
});

module.exports = router;
