/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
var Colors = mongoose.model('Colors');

// add array of hex values
router.post('/add', (req, res) => {

});

// get all available colors
router.get('/', (req, res) => {

});