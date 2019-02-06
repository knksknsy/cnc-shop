/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var User = mongoose.model('Users');

exports.isAdmin = function (req, res, next) {
    if (req.mySession && req.mySession.user) {
        User
            .findOne({ email: req.mySession.user })
            .exec((err, found) => {
                if (err) {
                    return next(err);
                }
                if (!found) {
                    return res.sendStatus(401);
                }
                if (found && found.isAdmin) {
                    return next();
                }
            });
    } else {
        return res.sendStatus(401);
    }
}
