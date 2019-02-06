/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
    name: { type: String, unique: true },
    image: String,
});

mongoose.model('Categories', categoriesSchema);
