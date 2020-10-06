const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const fundSchema = new newSchema({
    userId:{
        type: String,
        required: true,
    },
    Sendto:{
        type: String,
        required: true,
    },
    RecievedFrom:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    mailId:{
        type:String,
        required: true
    },
    joiningDate:{
        type: String,
         required: true
    },
    Amount: {
        type: mongoose.Schema.Types.Decimal128,
        required:true
    }


})

module.exports = FundStatement = mongoose.model('FundStatement',fundSchema);