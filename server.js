const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const userRoute = require('./routes/api/users');
const adminRoute= require('./routes/api/admin');
const statementRoute = require('./routes/api/statementRoute');

//parser
app.use(express.json());
// app.use(cors)

//DB Config
//const db = require('./config/Keys').mongoUri;



//use Routes
app.use('/api/users',userRoute);
app.use('/api/Admin',adminRoute);
app.use('/api/Statement',statementRoute);

//Server static assests if in production
//if(process.env.NODE_ENV === 'production'){
  //Set static foldr
  app.use(express.static('client/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
  
//}

const port = process.env.PORT || 5000;

//Connect to mongodb
mongoose.connect('mongodb://uosd8bsmzoudszrcpqeq:EuvpgwiKsLGvUMSo0x9@bricamrnfiilngxlxjhw-mongodb.services.clever-cloud.com:2107/bricamrnfiilngxlxjhw',
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongoose connected');
});


  app.listen(port, ()=>{
      console.log(`server running at port ${port}`)
  })