const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const TicketSchema = new newSchema({
    userId:{
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true
    },
     message: {
         type: Array,
         required:true
     },
     RequestedDate:{
        type: String,
       required: true,
       
    },
    status: {
        type: Boolean,
        required: true
    },
    usermessage: {
        type: Boolean,
    },
    adminmessage: {
        type:Boolean
    }


})

module.exports = Tickets = mongoose.model('Tickets',TicketSchema);