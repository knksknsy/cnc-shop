/**
*  Copyright (C) 2017
*
*   Artur B.
*
*  MIT License
*/

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    p_id: String,
    p_name: String,
    p_image: String,
    p_description: String,
    p_price: Number,
    p_category: String
});

mongoose.model('Products', productSchema);
