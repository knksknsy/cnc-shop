/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 543210 }
});

mongoose.model('Counter', counterSchema);
