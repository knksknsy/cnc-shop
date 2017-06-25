/**
*  Copyright (C) 2017
*
*   Artur B.
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dbURI = require('../config/db.config').database;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(dbURI);

autoIncrement.initialize(connection);

var productSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, unique: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: false },
    description: { type: String, required: true },
    information: { type: [String], required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

productSchema.plugin(autoIncrement.plugin, {
    model: 'Products',
    field: 'id',
    startAt: 543210,
    incrementBy: 1
});

mongoose.model('Products', productSchema);
