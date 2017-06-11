/**
*  Copyright (C) 2017
*
*   Artur B.
*   Kaan K.
*
*  MIT License
*/

var mongoose = require('mongoose');
var counter = mongoose.model('Counter');
var Schema = mongoose.Schema;

var productSchema = Schema({
    p_id: String,
    p_name: String,
    p_image: String,
    p_quantity: { type: Number, required: false },
    p_description: String,
    p_information: { type: [String], required: false },
    p_price: Number,
    p_category: String
});

// method is called before any product is being saved in order to increment p_id
productSchema.pre('save', (next) => {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'p_id' }, { $inc: { seq: 1 } }, (error, counter) => {
        if (error) {
            return next(error);
        }
        doc.p_id = counter.seq;
        next();
    });
});

mongoose.model('Products', productSchema);
