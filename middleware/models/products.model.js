/**
*  Copyright (C) 2017
*
*   Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    p_id: String,
    p_name: String,
    p_image: String
});

var Products = mongoose.model('Products', productSchema);

module.exports = Products;
