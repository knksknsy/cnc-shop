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
//const http = require('http');
const https = require('https');
const morgan = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var sessions = require("client-sessions");
const cookie = require("./config/db.config").cookie;
const fs = require("fs");
const config = {
  key: fs.readFileSync('./certs/privkey.pem'),
  cert: fs.readFileSync('./certs/fullchain.pem')
};

// Include db.model: Handles connection and includes db models
require('./models/db.model');

// Get our API routes
const api = require('./routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
// Parse only URL encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, '../frontend/src')));

// Setting up sessions
app.use(sessions({
  cookieName: cookie.name,
  secret: cookie.secret,
  duration: 2 * 60 * 60 * 1000, // 2 h
  activeDuration: 10 * 60 * 1000, // 10 min
  cookie: {
    ephemeral: true, // expires when browser closes
    httpOnly: true // not accessible from javascript
  }
}));

// Cross Origin middleware
app.use(function (req, res, next) {
  const origin = req.get('origin');
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    logger.error('Middleware: 204 No Content');
    res.sendStatus(204);
  } else {
    next();
  }
});

// Set api routes
app.use('/', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.error('Middleware:' + err.status + 'Not Found');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    logger.error('Middleware: 401 Unauthorizedd');
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

// development error handler
// will print stacktrace to file
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    logger.error('Middleware: 500 Internal Server Error');
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
};

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// log error/info/warings to file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
//app.use(morgan('dev', {stream: accessLogStream}));
app.use(morgan('combined', {stream: accessLogStream}));
var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'access.log' })
  ]
});

// Create HTTPS server
https.createServer(config, app).listen(8000);
