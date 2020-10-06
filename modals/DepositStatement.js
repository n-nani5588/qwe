const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const DepositSchema = new newSchema({

    userId: {
        type: String,
        required:true
    },
    Amount : {
        type: String,
        required: true,
    },
    HashCode : {
        type: String,
        required : true
    },
    Name : {
        type : String,
        required:  true,
    },
    SentBTCaddress : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required: true
    },
    status: {
        type : Boolean,
        required : true
    },
    success : {
        type : String,
        required : true
    }

})

module.exports = DepositStatement = mongoose.model('DepositStatement',DepositSchema);