/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
    user: { type: String, required: true },
    items: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        colors: [{
            name: { type: String, required: true },
            hexcode: { type: String, required: true }
        }]
    }],
    sum: { type: Number, required: true },
    datetime: Date
});

mongoose.model('Orders', ordersSchema);
