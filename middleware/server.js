/**
*  Copyright (C) 2017
*
*   Kaan K.
*   Artur B.
*
*  MIT License
*/

// Modul dependencies
const express = require('express');
const path = require('path');
const http = require('http');
//const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;
// Connect to MongoDB and create/use database
mongoose.connect('mongodb://backend/cncshop')
 .then(() =>  console.log('connection succesful'))
 .catch((err) => console.error(err));

// Get our API routes
const api = require('./routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Set api routes
app.use('/', api);

// Catch all other routes and return the index file
//app.get('*', (req, res) => {
// res.sendFile(path.join(__dirname, './index.html'));
//});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
