const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const adinfo = new newSchema({
  
    
    withdrawRequests:{
        type:Array,
        required:true
    },
    news:{
        type:Array,
        required:true
    },
    dashboardTable:{
        type:Array,
        required:true
    },
    QRimage : {
        type: Array,
        required : true,
    },
    Balance : {
        type: mongoose.Schema.Types.Decimal128,
    }



})

module.exports = AdInfo = mongoose.model('AdInfo',adinfo);