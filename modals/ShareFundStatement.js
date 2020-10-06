const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const FundSharingSchema = new newSchema({
    userId:{
        type: String,
        required: true,
    },
    mailId:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    Amount:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
})

module.exports = FundSharingStatement = mongoose.model('FundSharingStatement',FundSharingSchema);