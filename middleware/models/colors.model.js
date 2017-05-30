/**
*  Copyright (C) 2017
*
*   Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');

var colorSchema = new mongoose.Schema({
    name: String,
    hexcode: String
});

mongoose.model('Colors', colorSchema);
