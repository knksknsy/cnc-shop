/**
*  Copyright (C) 2017
*
*   Artur B.
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
const dbURI = require('../config/db.config').database;
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection(dbURI);

autoIncrement.initialize(connection);

var productSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    image: String,
    quantity: { type: Number, required: false },
    description: String,
    information: { type: [String], required: false },
    price: Number,
    category: String
});

productSchema.plugin(autoIncrement.plugin, {
    model: 'Products',
    field: 'id',
    startAt: 543210,
    incrementBy: 1
});

mongoose.model('Products', productSchema);
