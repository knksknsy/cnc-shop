/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
const uuid = require('uuid/v4')
var User = mongoose.model('Users');

module.exports.register = function(req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.orderId = uuid();

    user.pre(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });
};

module.exports.login = function(req, res) {};
