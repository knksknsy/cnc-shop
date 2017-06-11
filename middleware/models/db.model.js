/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
const dbURI = require('../config/db.config').database;

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

require('./categories.model');
require('./products.model');
require('./users.model');
require('./colors.model');
