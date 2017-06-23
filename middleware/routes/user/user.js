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
var User = mongoose.model('Users');

const uuid = require('uuid/v4')

var ctrlProfile = require('../../controllers/profile');
var ctrlAuth = require('../../controllers/authentication');

// profile
// router.get('/profile', auth, ctrlProfile.profileRead);

// register
router.post('/register', (req, res, next) => {
    if (!req.body.user) {
        return res.status(500);
    }
    User.findOne({ email: req.body.user.email }, (err, duplicate) => {
        if (err) {
            return next(err);
        }
        if (duplicate) {
            return res.status(500).json({ message: 'Email address is not available' });
        }
        if (!duplicate) {
            var user = new User();
            user.email = req.body.user.email;
            user.name = req.body.user.name;
            user.surname = req.body.user.surname;
            user.street = req.body.user.street;
            user.postcode = req.body.user.postcode;
            user.city = req.body.user.city;
            user.state = req.body.user.state;
            user.orderId = uuid();

            user.setPassword(req.body.user.password);

            user.save((err, result) => {
                if (err) {
                    return next(err);
                }
                return res.sendStatus(200);
            });
        }
    })
});

// login
router.post('/login', (req, res, next) => {
    if (!req.body.user) {
        return res.status(500);
    }
    var suppliedUser = req.body.user;
    User.findOne({ email: suppliedUser.email }, (err, foundUser) => {
        if (err) {
            return next(err);
        }
        if (!foundUser) {
            return res.sendStatus(403);
        }
        if (foundUser) {
            if (!foundUser.validPassword(suppliedUser.password)) {
                return res.sendStatus(403);
            }
            req.mySession.user = foundUser.email;
            return res.sendStatus(200);
        }
    });
});

// logout
router.get('/logout', (req, res, next) => {
    if (req.mySession && req.mySession.user) {
        req.mySession.reset();
    }
    return res.status(200).json({ message: 'logout successful' });
});

router.get('/isLoggedIn', (req, res, next) => {
    if (req.mySession && req.mySession.user) {
        return res.send({ loggedIn: true });
    } else {
        return res.send({ loggedIn: false });
    }
});

module.exports = router;
