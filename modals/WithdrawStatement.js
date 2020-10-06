const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const WithdrawStatementSchema = new newSchema({
    mainId: {
        type:String,
        required:true
    },
    levelIncome: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    autopoolIncome: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    fundsharingIncome: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    recievedIncome: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    userId:{
        type: String,
        required: true,
    },
    RequestedDate: {
        type:Date,
        default:  new Date()
    },
    Amount: {
        type: mongoose.Schema.Types.Decimal128,
        required:true
    },
    Total: {
        type: mongoose.Schema.Types.Decimal128,
        required:true
    },
    BitAddress: {
        type: String,
        required:true
    },
    Status: {
        type: String,
        required: true
    }

})

module.exports = WithdrawStatement = mongoose.model('WithdrawStatement',WithdrawStatementSchema);