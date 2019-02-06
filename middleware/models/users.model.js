/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs'); // TODO: for a better performance we should use basic bcrypt, but this would have a bunch of dependencies

var CRYPT_FACTOR = 11;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    street: { type: String, required: true },
    postcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    orderId: { type: String, required: false },
    isAdmin: { type: Boolean, default: false }
});

// Generate hashed, salted and bcrypted passwords
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(CRYPT_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Users', userSchema);
