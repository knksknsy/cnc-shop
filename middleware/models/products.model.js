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
    p_id: String,
    p_name: String,
    p_image: String,
    p_quantity: { type: Number, required: false },
    p_description: String,
    p_information: { type: [String], required: false },
    p_price: Number,
    p_category: String
});

productSchema.plugin(autoIncrement.plugin, {
    model: 'Products',
    field: 'p_id',
    startAt: 543210,
    incrementBy: 1
});

mongoose.model('Products', productSchema);
