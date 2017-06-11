/**
*  Copyright (C) 2017
*
*   Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorSchema = new Schema({
    name: String,
    hexcode: String
});

mongoose.model('Colors', colorSchema);
