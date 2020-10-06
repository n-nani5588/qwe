const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const poolStatementSchema = new newSchema({
   
    userId:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default:  new Date()
    },
    poolName: {
        type: String,
        required:true
    },
    Amountadded: {
        type: Number,
        required: true
    },
    pinsadded: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }


})

module.exports = PoolStatement = mongoose.model('PoolStatement',poolStatementSchema);