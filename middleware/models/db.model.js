/**
*  Copyright (C) 2017
*
*   Kaan K.
*   Artur B.
*
*  MIT License
*/

const path = require('path');
const fs = require("fs");
const winston = require('winston');

var mongoose = require('mongoose');
const dbURI = require('../config/db.config').database;
const admin = require('../config/db.config').admin;

// logging to a file
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'});
var logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'access.log' })
  ]
});

mongoose.connect(dbURI);

require('./categories.model');
require('./products.model');
require('./users.model');
require('./colors.model');
require('./orders.model.js');

var Users = mongoose.model('Users');

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  Users
    .findOne({ email: admin.email })
    .exec((err, found) => {
      if (!found) {
        Users.create({
          email: admin.email,
          password: admin.password,
          name: admin.other,
          surname: admin.other,
          street: admin.other,
          postcode: admin.other,
          city: admin.other,
          state: admin.other,
          orderId: admin.other,
          isAdmin: true
        });
      }
    });
  //console.log('Mongoose connected to ' + dbURI);
  logger.info('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  //console.log('Mongoose connection error: ' + err);
  logger.info('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  //console.log('Mongoose disconnected');
  logger.info('Mongoose disconnected');
});
