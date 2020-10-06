const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const admin = new newSchema({
  
    Pass:{
        type:String,
        required:true
    }

})

module.exports = Admin = mongoose.model('Admin',admin);