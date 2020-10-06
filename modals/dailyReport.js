const mongoose = require('mongoose');
const newSchema = mongoose.Schema;

//create Schema
const DailyReportSchema = new newSchema({
  
date: {
    type: Date,
    default: new Date()
},
dateId:{
    type: String,
    required: true
},
LevelPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolOnePinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolTwoPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolThreePinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolFourPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolFivePinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolSixPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolSevenPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolEightPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolNinePinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolTenPinsIncome:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
withdrawpercentage:{
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
funtToPinPercent :{
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
//Spend 
LevelOutSpend: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
FundSharing:  {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
PoolOutgo: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
},
withdraw:{
    type: mongoose.Schema.Types.Decimal128,
    required: true
}, 
//Others
Balance : {
    type: Number,
    required: true
},
BalanceReport: {
    type: Array,
    required: true,
},
Nothing: {
    type:Number,
    required: true
}


})

module.exports = DailyReport = mongoose.model('DailyReport',DailyReportSchema);