/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = Schema({
    name: String,
    image: String,
});

mongoose.model('Categories', categoriesSchema);
