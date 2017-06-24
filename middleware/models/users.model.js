/**
*  Copyright (C) 2017
*
*   Kaan K.
*   Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var crypto = require('crypto');
//var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs'); // TODO: for a better performance we should use basic bcrypt
const secret = require('../config/db.config').secret;

var CRYPT_FACTOR = 11;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    street: { type: String, required: true },
    postcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    orderId: { type: String, required: false }
    // hash: String, //this should not be safed in userSchema
    // salt: String
});

// Generate hashed, salted and bcrypted passwords
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      bcrypt.genSalt(CRYPT_FACTOR, function(err, salt) {
          if (err) return next(err);
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);
              user.password = hash;
              next();
          });
      });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Users', userSchema);

// i think this should be also fine
// userSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// }
//
// userSchema.methods.validPassword = function (password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// }
//mongoose.model('Users', userSchema);
