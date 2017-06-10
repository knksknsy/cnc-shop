/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
    name: String,
    image: String,
});

mongoose.model('Categories', categoriesSchema);
