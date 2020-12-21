var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
    date: Date,
    totalPrice: String,
    products: Array,
});

var Bill = mongoose.model('Bill', BillSchema, 'bills');


module.exports = Bill;