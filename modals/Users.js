const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const userSchema = new newSchema({

    userId:{
        type: String,
        required: true,
        unique:true
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    TransitionPassword:{
        type:String,
        required: true
    },
    mailId:{
        type:String,
        required: true
    },
    referedBy:{
        type:String,
        required: true

    },
    country:{
        type:String,
        required:true
    },
    joiningDate:{
        type: String,
        required : true
       
    },
    Active:{
        type: String,
        default: false
    },
    levelTeam:{
          type: Array,
          required: true
    },
    levelIncome:{
           type: mongoose.Schema.Types.Decimal128,
           required: true
    },
    autoPoolIncome:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    fundSharingIncome:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    recievedIncome:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    availablePins:{
        type: Array,
        required: true
    },
    pinBalance:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    poolOne: {
        type:Boolean,
        required: true
    },
    poolTwo: {
        type:Boolean,
        required: true
    },
    poolThree: {
        type:Boolean,
        required: true
    },
    poolFour: {
        type:Boolean,
        required: true
    },
    poolFive: {
        type:Boolean,
        required: true
    },
    poolSix: {
        type:Boolean,
        required: true
    },
    poolSeven: {
        type:Boolean,
        required: true
    },
    poolEight: {
        type:Boolean,
        required: true
    },
    poolNine: {
        type:Boolean,
        required: true
    },
    poolTen: {
        type:Boolean,
        required: true
    },
    poolOnePins: {
        type:Array,
        required:true
    },
    poolTwoPins: {
        type:Array,
        required:true
    },
    poolThreePins: {
        type:Array,
        required:true
    },
    poolFourPins: {
        type:Array,
        required:true
    },
    poolFivePins: {
        type:Array,
        required:true
    },
    poolSixPins: {
        type:Array,
        required:true
    },
    poolSevenPins: {
        type:Array,
        required:true
    },
    poolEightPins: {
        type:Array,
        required:true
    },
    poolNinePins: {
        type:Array,
        required:true
    },
    poolTenPins: {
        type:Array,
        required:true
    },
    bitAddress:String,


})

module.exports = Users = mongoose.model('Users',userSchema);