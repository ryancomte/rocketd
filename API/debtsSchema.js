var mongoose = require('mongoose');

var debtsSchema =  new mongoose.Schema({
    name: String,
    balance: Number,
    payment: Number,
    percentage: Number,
    paidIn: String,
    payOffDate: String,
    months: Number
});

var Debts = mongoose.model('Debts', debtsSchema);

module.exports = Debts;
