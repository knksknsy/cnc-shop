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
var Rx = require('rx');

var User = mongoose.model('Users');
var Orders = mongoose.model('Orders');
var Products = mongoose.model('Products');

router.get('/key', (req, res, next) => {
    // todo: check user authentication
    if (req.mySession && req.mySession.user) {
        User.findOne({ email: req.mySession.user })
            .select('-_id orderId')
            .exec((err, orderId) => {
                if (err) {
                    return next(err);
                }
                return res.send(orderId);
            });
    } else {
        return res.send({ id: null });
    }
});

router.post('/', (req, res, next) => {
    if (!req.body.orders) {
        return res.status(500).json({ message: 'Body invalid.' });
    }
    if (req.mySession && req.mySession.user) {
        User.findOne({ email: req.mySession.user })
            .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    var orderItems = [];
                    var sum = 0;
                    Rx.Observable.from(req.body.orders)
                        .flatMap((item) => {
                            if (!item.quantity || item.quantity <= 0) {
                                return next(err);
                            }
                            return new Promise((resolve, reject) => {
                                Products.findOne({ id: item.pId })
                                    .exec((err, product) => {
                                        if (err) {
                                            reject(err);
                                        }
                                        resolve({ product: product, item: item });
                                    });
                            });
                        })
                        .subscribe((next) => {
                            sum += next.product.price * next.item.quantity;
                            orderItems.push({
                                id: next.product.id,
                                name: next.product.name,
                                image: next.product.image,
                                quantity: next.item.quantity,
                                price: next.product.price,
                                colors: next.item.colors
                            });
                        },
                        (err) => {
                            return next(err);
                        },
                        () => {
                            error = false;
                            sum = Number((sum).toFixed(2));
                            Orders.create({
                                user: user._id,
                                items: orderItems,
                                sum: sum,
                                datatime: new Date()
                            },
                                (err, order) => {
                                    if (err) {
                                        error = true;
                                        return next(err);
                                    }
                                });
                            if (error) {
                                return res.status(500).json({ message: 'Order could not be placed.' });
                            } else {
                                return res.status(200).json({ message: 'Order successfully placed' });
                            }
                        });
                } else {
                    return res.sendStatus(403);
                }
            });
    } else {
        return res.sendStatus(401);
    }
});

router.get('/history', (req, res, next) => {
    if (req.mySession && req.mySession.user) {
        User.findOne({ email: req.mySession.user })
            .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    Orders.find({ user: user._id })
                        .select('-_id -user -__v')
                        .exec((err, orders) => {
                            if (err) {
                                return next(err);
                            }
                            return res.send(orders);
                        });
                } else {
                    return res.sendStatus(403);
                }
            });
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;
