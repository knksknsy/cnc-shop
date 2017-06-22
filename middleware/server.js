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
const https = require('https');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var sessions = require("client-sessions");
const cookie = require("./config/db.config").cookie;
const fs = require("fs");
const config = {
  key: fs.readFileSync('./certs/privkey.pem'),
  cert: fs.readFileSync('./certs/fullchain.pem')
};

require('./models/db.model');

// Get our API routes
const api = require('./routes/api');
const app = express();

app.use(logger('dev'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, '../frontend/src')));

//Setting up sessions
app.use(sessions({
  cookieName: cookie.name,
  secret: cookie.secret,
  duration: 24 * 60 * 60 * 1000, //24 h
  activeDuration: 10 * 60 * 1000, //10 min
  cookie: {
    httpOnly: true
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
    res.sendStatus(204);
  } else {
    next();
  }
});

// Set api routes
app.use('/', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Get http port from environment and store in Express
const phttp = process.env.PORT || '3000';
app.set('phttp', phttp);

// Create HTTP server
const server1 = http.createServer(app);
server1.listen(phttp, () => console.log(`API running on host:${phttp}`));

https.createServer(config, app).listen(8000)

// Get https port from environment and store in Express
//const phttps = process.env.PORT || '8000';
//app.set('phttps', phttps);

// Create HTTPs server
//const server2 = https.createServer(app);
//server2.listen(phttps, () => console.log(`API running on host:${phttps}`));
