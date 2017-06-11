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
    name: { type: String, unique: true },
    hexcode: String
});

mongoose.model('Colors', colorSchema);
