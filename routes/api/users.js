const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'gabe25@ethereal.email',
      pass: '8bvwaEjYrMUaTYyR3j'
  }
});




//user model
const User = require('../../modals/Users');
//fundSharing model
const FundStatement= require('../../modals/FundStatement')
//Tickets
const Tickets = require('../../modals/CreateTickets');
//Fund Sharing
const FundSharing = require('../../modals/ShareFundStatement');
// Autopool
const Autopool = require('../../modals/Autopool');
//Autopool 2
const Autopool2 = require('../../modals/AutopoolTwo');
//Autopool 3
const Autopool3 = require('../../modals/AutopoolThree');
//Autopool4
const Autopool4 = require('../../modals/AutopoolFour');
//Autopool 5
const Autopool5 = require('../../modals/AutopoolFive');
//Autopool6
const Autopool6 = require('../../modals/AutopoolSix');
//Autopool 7
const Autopool7 = require('../../modals/AutopoolSeven');
//Autopool 8
const Autopool8 = require('../../modals/AutopoolEight');
//autopool 9
const Autopool9 = require('../../modals/AutopoolNine');
//Autopool 10
const Autopool10 = require('../../modals/AutopoolTen');
//pool Statement
const poolStatement = require('../../modals/poolStatement');
//Daily-Report
const dailyReport = require('../../modals/dailyReport');
//Deposit-Statement
const Depositstatement = require('../../modals/DepositStatement');

let number;
User.find({}).sort({_id:-1}).limit(1).then(res => 
   { console.log(res)
    number = res[0].userId.substring(2)
    console.log(":::::::::::::::", number);
  }
  );

// let number = userde
 
//Create Tickets
//@rout get api/users/CreateTickets
// Add Ticket
// @acess public
router.post('/CreateTickets', (req,res) => {

  console.log(req.body);

  let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()


  try{
          const obj =   {
                          msgid: req.body.msg_id,
                          message: req.body.message
                        }

          const Ticket = new Tickets({

                    userId: req.body.userid,
                    message: obj,
                    Subject: req.body.subject,
                    RequestedDate: end_date,
                    status: true,
                    usermessage: true,
                    adminmessage: false,

          })

          Ticket.save()
          .then(ticket => {
            if(ticket){res.json({status: 1, ticket})}
            else{res.json({status: 0})}
          }).catch(err => {
            console.log(err.message);
           res.json({status: 0})
          })

      }
      catch(err){
        console.log(err.message);
        res.json({status: 0})
      }

});

//Create Tickets
//@rout get api/users/getTickets
// Add Ticket
// @acess public
router.get('/GetTickets/:id', (req,res) => {
  
  console.log(req.params.id);
  try{
          Tickets.find({userId: req.params.id})
          .sort({RequestedDate: 1})
          .then(Tickets => {

                  console.log(Tickets);
                  if(Tickets){
                      res.json({status: 1, Tickets})
                  }else{ res.json({status: 0})}

          }).catch(err => {

                console.log(err.message);
                res.json({status: 0})

          })
    }
    catch(err)
    {
          console.log(err.message);
          res.json({status: 0})
    }
});


//uuid generator 
function randomGenerator(){
  if((number % 2) === 0)
  {
    number = parseInt(number) + 3
  }
  else{
    number = parseInt(number) + 1
  }
  //const uui = Math.floor(100000 + Math.random() * 900000)
  return "GT"+number
}

//@rout get api/users/getNews
// Add Admin
// @acess public
router.get('/getNews', (req,res) => {

  AdInfo.find()
  .select('news')
  .then(news => {
      console.log(news);
      if(news){
          res.json({status: 1, news})
      }else{ res.json({status: 0})}
  }).catch(err =>{
    console.log(err);
    res.json({status: 0})
  })

});

//@rout get api/users/sendFund/id
// find one user
// @acess public
router.get('/sendFund/:id', (req,res) => {
  console.log(req.params.id);

  try{
          User.findOne({ userId: req.params.id })
          .select('-password')
            .then(user => {
                      console.log(user);
                      if(user){
                        res.json({status:1,user})
                      }else{
                        res.json({status: 0})
                      }
                      
            }).catch(err => {
                 console.log(err.message);
                 res.json({status: 0})
            })
      }
      catch(err)
      {
            console.log(err.message);
            res.json({status: 0})

      }
});

///test Route
// router.post('/test', (req,res) => {

//   const data = [{userID: 1,ReferedBy: "",  levelamount:"0.00" },
//   {userID: 2, ReferedBy: 1,  levelamount:0.00, Active: "false" },
//   {userID: 3, ReferedBy: 2,  levelamount:0.00, Active: "false" },
//   {userID: 4, ReferedBy: 3,  levelamount:0.00, Active: "false" },
//   {userID: 5, ReferedBy: 4,  levelamount:0.00, Active: "false" },
//   {userID: 6, ReferedBy: 5,  levelamount:0.00, Active: "false" },
//   {userID: 7, ReferedBy: 6,  levelamount:0.00, Active: "false" },
//   {userID: 8, ReferedBy: 7,  levelamount:0.00, Active: "false" },
//   {userID: 9, ReferedBy: 8,  levelamount:0.00, Active: "false" },
//   {userID: 10,ReferedBy: 9,  levelamount:0.00, Active: "false" },
//   {userID: 11,ReferedBy: 10,  levelamount:0.00, Active: "false" },
//   {userID: 12,ReferedBy: 11,  levelamount:0.00, Active: "false" },
//   {userID: 13,ReferedBy: 12,  levelamount:0.00, Active: "false" },
// ]

// handleActivateUser(13)

//   function handleActivateUser (user1){

//     const user =  data.filter(user => 
//     {if (user.userID === user1){
//        user.Active = "true"
//        return user
//     } } )

//     console.log("user:",user);
//     let i = 0,ReferedBy1 = user[0].ReferedBy;
//     console.log("line: 66",ReferedBy1);

//   while (ReferedBy1 && i<10) {

//       const userupdate = data.filter(user =>  {if(user.userID === ReferedBy1) {
//         if(i===0){
//           user.levelamount = user.levelamount + 5.0;
//         }else{
//           user.levelamount = user.levelamount + 0.2;
//         }
      
        
//         ReferedBy1 = user.ReferedBy;
//         return user;
//       } } )
     

//       i++;
//       console.log("i :",i);
//       console.log("userupdate :",userupdate);
//       console.log("line: 79",ReferedBy1);
    
//   }

// }

// });

//@rout get api/Admin/UpdateMessage
// Add Ticket
// @acess public
router.post('/UpdateMessage', (req,res) => {
  
  console.log(req.body);
try{
          Tickets.findOneAndUpdate({
              _id: req.body._id
          },{
              $push: { message : req.body.message }
          },{new: true})
          .sort({RequestedDate: 1})
          .then(Tickets => {
              console.log(Tickets);
              if(Tickets){
                  res.json({status: 1, Tickets})
              }else{ res.json({status: 0})}
          })
          .catch(err => {
            console.log(err.message);
            res.json({status: 0})
          })
}
catch(err)
{
   console.log(err.message);
   res.json({status: 0})
}

})

//@rout get api/Admin/SubmitDeposit
// Add Ticket
// @acess public
router.post('/SubmitDeposit', (req,res) => {
  
        console.log(req.body);

  let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

  try{
        User.findOne({
          userId : req.body.userid,
          TransitionPassword : req.body.transactionPassword
        })
        .then(user => 
          {
            if(user)
            {
                  const Deposit = new Depositstatement({

                              userId: req.body.userid,
                              Amount : req.body.amount,
                              HashCode : req.body.hashcode,
                              Name : req.body.name,
                              date: end_date,
                              SentBTCaddress : req.body.sendtobtcaddress,
                              status : false,
                              success : "processing"
                    })
            
                    Deposit.save().then(statement => {

                            console.log(statement);
                            if(statement)
                            {
                              res.json({status : 1 })
                            }
                            else{
                              res.json({status : 0 })
                            }
                    }).catch(err => {
                            console.log(err.message);
                            res.json({status : 0 })
                    })
            }
            else
            {
              res.json({status : 0 })
            }
          }).catch(err => {
                  console.log(err.message);
                res.json({status : 0 })
          })
          

     }
     catch(err)
     {
           console.log(err.message);
           res.json({status : 0 })
     }

})

//@rout get api/Admin/DepositStatement
// Add Ticket
// @acess public
router.get('/DepositStatment/:id', (req,res) => {
  
  console.log(req.params.id);
  try{
          Depositstatement.find({ userId : req.params.id })
          .then(statements => {

                    if(statements)
                    {
                      res.json({status : 1 , statements})
                    }
                    else{
                      res.json({status : 0 , statements})
                    }
                    
          }).catch(err => {
            console.log(err.message);
            res.json({status : 0 , statements})
          })
    }
    catch(err)
    {
         console.log(err.message);
         res.json({status : 0 , statements})
    }

})


//@rout get api/users/Activate_account
// find one user
// @acess public
router.post('/Activate_account', (req,res) => {
  
  console.log(req.body);

  try{
            const date = new Date();
            console.log(date.toLocaleDateString());
            const today = date.toLocaleDateString()

            //Activating Accounts
            if(req.body.ActivatingId.toString() === req.body.shouldActivateUserId.toString()){

                            console.log("inside:if:");

                              User.findByIdAndUpdate({_id: req.body.ActivatingId},
                              {
                                      $pull: { availablePins: req.body.pin } ,
                                      Active:true,
                                      poolOne:true

                              },{
                                new: true
                              })
                              .then( user => 
                                {    
                                            if(user)
                                            {

                                                      console.log(user); 
                                                      createAutopool(user)
                                                      handleActivateUser(user.referedBy,user.userId);
                                                      dailyReport.findOneAndUpdate({ dateId: today},{
                                                        $inc : { Nothing : 0 }
                                                      },{new: true})
                                                      .then( updated => {

                                                                  if(updated){

                                                                          res.json({status: 1 ,user});

                                                                  }else{

                                                                    const report =  new DailyReport({
                                                                    
                                                                      dateId: today,
                                                                      LevelPinsIncome:  0,
                                                                      PoolOnePinsIncome:  0,
                                                                      PoolTwoPinsIncome: 0,
                                                                      PoolThreePinsIncome: 0,
                                                                      PoolFourPinsIncome:  0,
                                                                      PoolFivePinsIncome:  0,
                                                                      PoolSixPinsIncome:  0,
                                                                      PoolSevenPinsIncome: 0,
                                                                      PoolEightPinsIncome:  0,
                                                                      PoolNinePinsIncome:  0,
                                                                      PoolTenPinsIncome:  0,
                                                                      withdrawpercentage: 0,
                                                                      funtToPinPercent : 0,
                                                                      //Spend 
                                                                      LevelOutSpend: 0,
                                                                      FundSharing:  0,
                                                                      PoolOutgo: 0,
                                                                      withdraw: 0,
                                                                      //Others
                                                                      Balance : 0,
                                                                      BalanceReport: [],
                                                                      Nothing: 0,
                                                              
                                                                    })
                                                                      
                                                                    report.save()
                                                                    .then(re => {
                                                                          res.json({status: 1 ,user});
                                                                    })
                                                                    .catch(err => {
                                                                          res.json({status: 0});
                                                                    })
                                                          

                                                            }
                                                      }).catch(err => {
                                                                res.json({status: 0});
                                                      })
                                            
                                            }
                                            else
                                            {
                                                     res.json({status: 0});
                                            }
                                })
                                .catch(err => {
                                         res.json({status: 0});
                                })

            }else{

                    User.findByIdAndUpdate({ _id: req.body.ActivatingId },{
                             $pull: { availablePins: req.body.pin } 
                    },{new:true})
                    .select('-password')
                    .then((user1)=>{

                            if(user1){
                                  console.log("use 1 is updated ***********************************************************");
                                      console.log("pin Remover :", user1);
                                      //response
                                      
                                          //update Activate account
                                          User.findByIdAndUpdate({_id: req.body.shouldActivateUserId},{
                                            Active:true,
                                            poolOne:true
                                          },{new: true})
                                          .then((user) =>{
                                            
                                            if(user){
                                              console.log("use 2 is updated ************************************************");
                                                            createAutopool(user)
                                                            console.log("autopool created **************************************");
                                                            handleActivateUser(user.referedBy,user.userId);
                                                            console.log("Active user Done **************************************");
                                                            //         daily updates 
                                                            dailyReport.findOneAndUpdate(
                                                              {
                                                              dateId : today
                                                              },
                                                              {
                                                              $inc : { Nothing : 0  }
                                                            },{new: true})
                                                            .then( updated => {
                                                                            if(updated){
                                                                              console.log("daily report updated **************************************");
                                                                                      console.log("updated");
                                                                                      res.json({status: 1 , user1 })
                                                                            }else{
                                                                  
                                                                                        const report =  new DailyReport({
                                                                                    
                                                                                          dateId: today,
                                                                                          LevelPinsIncome:  0,
                                                                                          PoolOnePinsIncome:  0,
                                                                                          PoolTwoPinsIncome: 0,
                                                                                          PoolThreePinsIncome: 0,
                                                                                          PoolFourPinsIncome:  0,
                                                                                          PoolFivePinsIncome:  0,
                                                                                          PoolSixPinsIncome:  0,
                                                                                          PoolSevenPinsIncome: 0,
                                                                                          PoolEightPinsIncome:  0,
                                                                                          PoolNinePinsIncome:  0,
                                                                                          PoolTenPinsIncome:  0,
                                                                                          withdrawpercentage: 0,
                                                                                          funtToPinPercent : 0,
                                                                                        //  Spend 
                                                                                          LevelOutSpend: 0,
                                                                                          FundSharing:  0,
                                                                                          PoolOutgo: 0,
                                                                                          withdraw: 0,
                                                                                      //   Others
                                                                                          Balance : 0,
                                                                                          BalanceReport: [],
                                                                                          Nothing: 0,
                                                                                  
                                                                                        })
                                                                                          
                                                                                        report.save()
                                                                                        .then(re => {
                                                                                          console.log("daily reported created **************************************");
                                                                                          res.json({status: 1 , user1 })
                                                                                        }).catch(re => {
                                                                                          console.log("error catched at daily report created **************************************");
                                                                                            res.json({status : 0})
                                                                                        })
                                                                                        console.log("created");
                                                                            
                                                                            }
                                                                 } )  
                                                                 .catch(err => {
                                                                  console.log(err.message);
                                                                  console.log("error catched at daily report **************************************");
                                                                  res.json({status: 0})
                                                                })

                                                            console.log(user);
                                                }
                                                else
                                                {
                                                  console.log("error catched at user 2 else**************************************");
                                                            res.json({status: 0})
                                                }
                                        } )
                                        .catch(err => {
                                          console.log("error catched at user 2  **************************************");
                                            console.log(err.message);
                                            res.json({status: 0})
                                          })
                                 
                            }
                            else{
                              console.log("error catched at user 1 else **************************************");
                              res.json({status: 0})}
                        
                    }).catch(err => {
                      console.log("error catched at user 1 **************************************");
                            console.log(err.message)
                            res.json({status: 0});

                    })

            }

            function createAutopool(user){

                          console.log("in create Autopool :", user);

                          const autopool = new Autopool({

                                  userId: user.userId,
                                  poolOneCompleted: false,
                                  members: [],
                                  referedBy: " ",
                                  levelOne: 0,
                                  levelTwo: 0,
                                  levelThree: 0,
                                  levelOneIncome: 0,
                                  levelTwoIncome: 0,
                                  levelThreeIncome:0,
                                  available: true
                          })
                              
                          autopool.save()
                          .then(user => 
                            
                            {
                            console.log("pool created  **************************************")
                            console.log(user)})
                          .catch(err => {
                            console.log("error catched at pool created catch **************************************");
                                  console.log(err.message);
                                  res.json({status: 0});
                          })

            }

            //handle Active user
            async function handleActivateUser (user1,user2){

                    let i = 0;
                    let ReferedBy1 = user1;
                    console.log("line: 66",ReferedBy1);

                  while (ReferedBy1 && i<10) {

                                if(i===0){ 
                                  
                                    await User.findOneAndUpdate({userId: ReferedBy1},{
                                        $inc: { levelIncome : parseFloat(2)  },
                                        $push : { levelTeam : user2 }
                                      }).then( async (user) => { console.log(user);

                                                if(user){
                                                                await dailyReport.findOneAndUpdate({
                                                                    dateId : today
                                                                },{
                                                                    $inc : {  LevelOutSpend : parseFloat(2) }
                                                                  })
                                                                  .then(re => {
                                                                    console.log("error catched at in and as was created **************************************");
                                                                    console.log(" ")})
                                                                  .catch(err => {
                                                                    console.log(err.message)
                                                                    console.log("error catched at catched batched sached allowed **************************************");
                                                                    res.json({status: 0});
                                                                  })
                                                                  ReferedBy1 = user.referedBy
                                                }
                                                else
                                                {
                                                                ReferedBy1 = ""
                                                }

                                        }).catch(err => {
                                          console.log("error catched at user if handle Active user **************************************");
                                              res.json({status: 0});
                                        })
                                      console.log("line: 11",ReferedBy1);

                                }else{

                                    await  User.findOneAndUpdate({userId: ReferedBy1},{
                                        $inc: { levelIncome : parseFloat(0.5)  }
                                      }).then( async (user) => {console.log(user); 

                                                  if(user){
                                                
                                                            await  dailyReport.findOneAndUpdate({
                                                            dateId : today
                                                            },{
                                                                $inc : {  LevelOutSpend : parseFloat(0.5) }
                                                            })
                                                            .then(re => 
                                                              { console.log("error catched at daily report created in level income**************************************");
                                                                console.log(" ")})
                                                            .catch(err => {
                                                                    console.log(err.message)
                                                                    console.log("error catched at daily report created in level income catch **************************************");
                                                                    res.json({status: 0});
                                                            })
                                                              ReferedBy1 = user.referedBy
                                                  }  
                                                  else
                                                  {
                                                    ReferedBy1 = ""
                                                  }

                                      }).catch(err => {
                                        console.log("error catched at user else catch 0.5 **************************************");
                                              console.log(err.message)
                                              res.json({status: 0});
                                      })
                                      console.log("line: 12",ReferedBy1);
                                }

                    

                      i++;
                      console.log("i :",i);
                      console.log("line: 79",ReferedBy1);
                    
                  }

            }
    }
    catch(err)
    {
      console.log("error catched at try catched tried**************************************");
           console.log(err.message);
           res.json({status: 0});
    }

});

//@rout get api/users/sendFund/update
// find one user
// @acess public
router.post('/sendFund/update', (req,res) => {
  console.log(req.body);
  // sendMnyTo:this.state.sendMnyTo,
  let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

 
  try{
  
                User.findByIdAndUpdate({ _id: req.body.sendMnyFrom },
                {
                    $inc: {
                              levelIncome: -parseFloat(req.body.levelamount),
                              autoPoolIncome: -parseFloat(req.body.autoamount),
                              fundSharingIncome: -parseFloat(req.body.fundamount),
                              recievedIncome: -parseFloat(req.body.recievedamount),
                         }
                },
                {new:true}
                )
                .then(user => {
                            if(user)
                            {


                                  //sentTo
                                  User.findByIdAndUpdate({ _id: req.body.sendMnyTo },
                                    {$inc: {

                                      recievedIncome: parseFloat(parseFloat(req.body.recievedamount)+parseFloat(req.body.fundamount)+parseFloat(req.body.autoamount)+parseFloat(req.body.levelamount)),
                                  
                                    }},{new:true}).then(user2 => {
                                    
                                                  const fundSt1 = new FundStatement({
                                                    Sendto: req.body.sendMnyToDetails.userId,
                                                    RecievedFrom:"-----",
                                                    userId: req.body.from,
                                                    joiningDate: end_date ,
                                                    firstName: req.body.sendMnyToDetails.firstName,
                                                    lastName: req.body.sendMnyToDetails.lastName,
                                                    mailId: req.body.sendMnyToDetails.mailId,
                                                    Amount: req.body.total,
                                                
                                                  })

                                                   //recieved details
                                                  const fundSt2 = new FundStatement({
                                                    Sendto: "-----",
                                                    RecievedFrom: req.body.from,
                                                    userId: req.body.sendMnyToDetails.userId,
                                                    firstName: user.firstName,
                                                    joiningDate: end_date ,
                                                    lastName: user.lastName,
                                                    mailId: user.mailId,
                                                    Amount: req.body.total,
                                                  })


                                                  fundSt1.save().then(res => {console.log(" ")}).catch(err => {console.log(err.message)})
                                                  fundSt2.save().then(res => console.log(" ")).catch(err => console.log(err.message))
                                                  res.json({status:1,user})
                                
                                    }).catch(err => {
                                                        res.json({status: 0})
                                    })

                             }
                             else
                             {
                                res.json({status: 0})
                             }
                    
                }).catch(err =>  {  res.json({status: 0}) })

                 // console.log(parseFloat(parseFloat(req.body.recievedamount)+parseFloat(req.body.fundamount)+parseFloat(req.body.autoamount)+parseFloat(req.body.levelamount)));

                  
                  //sender details
                
  }
  catch(err)
  {
       console.log(err.message);
       res.json({status: 0})
  }

});

//@rout get api/users/sendFund/update
// find one user
// @acess public
router.post('/sendFund/pinWallet', (req,res) => {
 
  console.log(req.body);
  console.log("::::::::::::::::::::::::::::::::::::::::::::");

  
  //  sendMnyTo:this.state.sendMnyTo,

try{
          const date = new Date();
          const today = date.toLocaleDateString();

           
          let current_datetime = new Date()
          let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()


          let percent = (parseFloat(parseFloat(req.body.levelamount)+parseFloat(req.body.autoamount)+parseFloat(req.body.fundamount)+parseFloat(req.body.recievedamount))*0.05)
          console.log(percent);

          User.findByIdAndUpdate({ _id: req.body._id },
            {$inc: {
              levelIncome: -parseFloat(req.body.levelamount),
              autoPoolIncome:-parseFloat(req.body.autoamount),
              fundSharingIncome:-parseFloat(req.body.fundamount),
              recievedIncome:-parseFloat(req.body.recievedamount),
              pinBalance: req.body.pinBalance
          }},{new:true})
            .then(user => {

                            if(user){
                                   res.json({status:1,user})
                                      console.log(user);
                                        //creaate fund statement
                                        const fundSt = new FundStatement({
                                          Sendto: "Pin Wallet",
                                          RecievedFrom: req.body.useid,
                                          userId: req.body.useid,
                                          firstName:user.firstName,
                                          lastName: user.lastName,
                                          joiningDate : end_date,
                                          mailId: user.mailId,
                                          Amount: (parseFloat(req.body.recievedamount)+parseFloat(req.body.fundamount)+parseFloat(req.body.autoamount)+parseFloat(req.body.levelamount)),
                                    })
                                    fundSt.save().then(re => console.log(re)).catch(err=> {
                                       console.log(err.message);
                                       res.json({status: 0 ,user})
                                    })

                                      // Daily Report
                                      
                                      dailyReport.findOneAndUpdate({

                                        dateId : today

                                      },{

                                        $inc : { funtToPinPercent : parseFloat(percent) }

                                      },{new: true}).then(document => {
                                                          if(!document){
                                                                    const report =  new DailyReport({
                                                            
                                                                      dateId: today,
                                                                      LevelPinsIncome:  0,
                                                                      PoolOnePinsIncome:  0,
                                                                      PoolTwoPinsIncome: 0,
                                                                      PoolThreePinsIncome: 0,
                                                                      PoolFourPinsIncome:  0,
                                                                      PoolFivePinsIncome:  0,
                                                                      PoolSixPinsIncome:  0,
                                                                      PoolSevenPinsIncome: 0,
                                                                      PoolEightPinsIncome:  0,
                                                                      PoolNinePinsIncome:  0,
                                                                      PoolTenPinsIncome:  0,
                                                                      withdrawpercentage: 0,
                                                                      funtToPinPercent : parseFloat(percent),
                                                                      //Spend 
                                                                      LevelOutSpend: 0,
                                                                      FundSharing:  0,
                                                                      PoolOutgo: 0,
                                                                      withdraw: 0,
                                                                      //Others
                                                                      Balance : 0,
                                                                      BalanceReport: [],
                                                                      Nothing: 0,
                                                              
                                                                    })
                                                              
                                                                  report.save()
                                                                  .then(res => {
                                                                                console.log(res);
                                                                  }).catch(err => { 
                                                                          console.log(err);
                                                                          res.json({status: 0})
                                                                  })
                                                          }
                                                            

                                      }).catch(err => {
                                        console.log(err.message)
                                        res.json({status: 0,user})
                                      })

                                     

                            }
                             else
                            {
                                      res.json({status: 0,user})
                            }
              
            }).catch(err => {
                console.log(err.message)
                res.json({status: 0})
            })
  }
  catch(err)
  {
          console.log(err.message)
          res.json({status: 0})
  }


});

//@rout get api/user=-09871`
// @desc get all users
// @acess public
router.get('/', (req,res) => {
   User.find()
     .then(users => res.json(users))
});

//@rout get api/users/getSingleuser
// @desc get all users
// @acess public
router.post('/getSingleUserDetails', (req,res) => {
  
console.log("***********************************************************");  

  try{

          User.findOne({_id : req.body.userid})
          .then(user =>{

                    console.log(user);
                    if(user)
                    {
                      res.json({status :1 , user})
                    }
                    else{
                      res.json({status : 0 })
                    }

            }).catch(err => {

              console.log(err.message);
              res.json({status : 0 })

            })
    }
    catch(err)
    {
        console.log(err.message);
        res.json({status : 0 })
    }
});

//@rout get api/users/Direct_Members
// @desc get all users
// @acess public
router.post('/Direct_Members', (req,res) => {
  console.log(req.body);
  try{
            User.find({referedBy: req.body.userid })
            .select('-password ')
            .sort({joiningDate : -1})
              .then(users => {
                console.log(users);
                  if(users){
                    res.json({status: 1 ,users})
                  }
                  else{
                    res.json({ status:0 })
                    console.log("not found");
                  }
              })
              .catch(err => {
                console.log(err.message);
                res.json({ status:0 })
              })

       }
       catch(err)
       {
         console.log(err.message);
         res.json({ status:0 })
       }
});

//@rout get api/users/getLevelArrayDetails
// @desc get all users
// @acess public
router.post('/getLevelArrayDetails', (req,res) => {
  console.log(req.body);
        try{ 

                      User.find({userId :{ $in : req.body.useridsArray }})
                      .select('userId firstName lastName mailId joiningDate autoPoolIncome fundSharingIncome levelIncome Active')
                      .sort({joiningDate: -1})
                      .then(users => {

                              console.log(users);
                                if(users){
                                  res.json({status: 1 ,users})
                                }
                                else{
                                  res.json({ status:0 })
                                  console.log("not found");
                                }

                      })
                      .catch(err => {
                          console.log(err.message);
                          res.json({status: 0 ,users})
                      })

            }
            catch(err)
            {
                      console.log(err.message);
                      res.json({status: 0 ,users})
            }

   });

//@rout get api/users/All_Members
// @desc get all users
// @acess public
router.post('/All_Members', async (req,res) => {
  console.log(req.body);
  // User.find({referedBy: req.body.userid, Active: "true"})
  // .select('userId _id')
  //   .then(levelOne => {
  //     console.log(levelOne);
  //       if(levelOne){
  //         res.json({status: 1 ,levelOne})
  //       }
  //       else{
  //         res.json({ status:0 })
  //         console.log("not found");
  //       }
  //   })
try{
                let i=0,array=[],levels=[];
                array.push(req.body.userid)

                do {

                console.log(array);
                await User.find({referedBy: { $in :array}})
                  .select('userId')
                  .then(level => {
                    console.log(level);
                    if(level)
                    {
                                            
                          array = level.map(userids => {return userids.userId})
                          console.log(array);
                          console.log(i);
                          levels.push(array);

                    }
                    else
                    {
                      array = '';
                    }
                    

                  }).catch(err => {

                      console.log(err.message);
                      res.json({status: 0 ,levels})

                  })

                  i++
                  
                } while (array && i < 10);

                res.json({status: 1,levels})
    }
    catch(err)
    {
      console.log(err.message);
      res.json({status: 0,levels})
    }
    
});

//@rout get api/users/Direct_Members/GetFundSharing
// @desc get all users
// @acess public
router.post('/Fund_Statement', (req,res) => {
  console.log(req.body);
  try{
          FundStatement.find({userId: req.body.userid})
          .sort({joiningDate : -1 }) 
            .then(users => {
                        console.log(users);
                        if(users){
                               res.json({status: 1 ,users})
                        }
                        else{
                                res.json({ status:0 })
                                console.log("not found");
                        }

              }).catch(err => {
                      console.log(err.message);
                      res.json({ status:0 })
              })
    }
    catch(err)
    {
       console.log(err.message);
       res.json({ status:0 })
    }
});


//@rout get api/users/GetFundSharing
// @desc get all users
// @acess public
router.post('/GetFundSharing', (req,res) => {
  console.log(req.body);
    try{
          FundSharing.find({userId: req.body.userid})
          .sort({Date : -1 }) 
          .then(users => {

              console.log(users);

              if(users){
                res.json({status: 1 ,users})
              }
              else{
                res.json({ status:0 })
                console.log("not found");
              }

            }).catch(err => {

                  console.log(err.message);
                  res.json({ status:0 })

            })
    }
    catch(err)
    {
         console.log(err.message);
         res.json({ status:0 })
    }

});

//@rout get api/users/GetFundSharing  - All Details
// @desc get all users
// @acess public
router.get('/GetFundSharingAll', (req,res) => {
  console.log(req.body);
  let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
  let end_date_1 = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + (current_datetime.getDate() + 1)
  let start_date  = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + (current_datetime.getDate() - 5)
  console.log(start_date,end_date)
  FundSharing.find( {
    $or:
   [
     {
      Date:
      { $gte: start_date, $lte:end_date },
     },
     {
      Date:
      { $gte: start_date, $lte: end_date_1 },
     },
   ],
  },)
  .sort({Date : -1 })  
  .then(users => {
      console.log("funs sharing :::::::::::::::::::",users);
        if(users){
          res.json({status: 1 ,users})
        }
        else{
          res.json({ status:0 })
          console.log("not found");
        }
    })
    .catch(err => {
       console.log(err.message);
       res.json({ status:0 })
    })
});

//@rout POST api/users/Signup
// @desc Add a users
// @access public
router.post('/Signup_User', (req,res) => {

  console.log(req.body);
try{
  
  let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

  User.findOne({userId : req.body.referedBy})
  .then(user => {
    if(user){
      console.log(user);
      const newUser = new User({
        userId:  randomGenerator(),   
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        country: req.body.country,
         password: req.body.password,
         TransitionPassword:req.body.password,
        mailId: req.body.mailId,
        referedBy: req.body.referedBy,
        joiningDate: end_date ,
        levelTeam:[],
         levelIncome: 0,
         autoPoolIncome: 0,
         fundSharingIncome: 0.00,
        recievedIncome: 0.00,
        availablePins:[],
        pinBalance: 0.00,
        poolOne: false,
        poolTwo: false,
        poolThree: false,
        poolFour:false,
        poolFive: false,
        poolSix:false,
        poolSeven:false,
        poolEight: false,
        poolNine: false,
        poolTen: false,
        poolOnePins: [],
        poolTwoPins: [],
        poolThreePins: [],
        poolFourPins: [],
        poolFivePins: [],
        poolSixPins: [],
        poolSevenPins: [],
        poolEightPins: [],
        poolNinePins:[],
        poolTenPins: [],
         bitAddress: "",
      })

        newUser.save()
        .then(user => {
              if(user){
                  res.json({status:1, user})
              }
              else{
                res.json({status: 0})
              }
        })
        .catch(err => {console.log(err); res.json({status : 0})});
    }
    else{
      res.json({status : 3})
    }
  }).catch(err => {
      console.log(err);
      res.json({status : 0})
  })
}
catch(err)
{
     console.log(err);
     res.json({status : 0})
}
  
 });

 //@rout POST api/users/login
// @desc login user
// @access public
router.post('/login', (req,res) => {
console.log(req.body);
  const userid = req.body.userid;
  const password = req.body.password;
 
  try{         
          User.findOne({ userId: userid ,password :password })
          .select('-password')
          .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status: 200,msg:"Successfull",userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status: 101,msg:"Wrong User id OR Wrong Password"})
                console.log("not user");
              }
            }
            ).catch(err => {
                console.log(err);
                res.json({status: 101,msg:"Wrong User id OR Wrong Password"})
            })
    }
    catch(err)
    {
         console.log(err);
         res.json({status: 101,msg:"Wrong User id OR Wrong Password"})
    }

});


 //@rout POST api/users/ForgotPassword
// @desc Add a users
// @access public
router.post('/ForgotPassword', (req,res) => {
  console.log(req.body);
    const userid = req.body.userid;
 
    
    User.findOne({ userId: userid ,mailId :req.body.mail })
     .then(user => 
      {
        console.log(user)
        if(user)
        {
          const message = {
            from: 'gabe25@ethereal.email', // Sender address
            to:  req.body.mail,         // List of recipients
            subject: 'GT-password', // Subject line
            text: `useID : ${user.userId}  || password: ${user.password}` // Plain text body
          };
          transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
            res.json({status:"1"})
            console.log("sucess");
        }
        else{
          res.json({status:0})
          console.log("not user");
        }
      }
      ).catch(err =>{ 
        console.log(err);
        res.json({status:0})
      })
  
  
  });

 //@rout POST api/users
// @desc Add a users
// @access public
router.post('/profileUpdate', (req,res) => {
  console.log(req.body);
    const userid = req.body.id;
   
  try{
            
            User.findByIdAndUpdate({ _id: userid},{
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              mailId:req.body.mailId,
              country:req.body.country
            },{new:true})
            .select('-password')
            .then(user => 
              {
                console.log(user)
                if(user)
                {
                    res.json({status: 200 ,msg:"Successfull",userdetails: user.toObject()})
                    console.log("sucess");
                }
                else{

                    res.json({status: 101,msg:"User Does not exits"})
                    console.log("not user");
              
                }
              }
              )
            .catch(err => {

               console.log(err.message);
               res.json({status: 101,msg:"User Does not exits"})
               console.log("not user");

            })
      }  
      catch(err)
      {
            console.log(err.message);
            res.json({status: 101,msg:"User Does not exits"})
            console.log("not user");
      }

  });

 //@rout POST api/users/generatePin
// @desc Add a users
// @access public
router.post('/generatePin', (req,res) => {
  console.log(req.body);
    const userid = req.body._id;
     try{      
            handlegeneratePin = (number) => {

              let pins = [];
            
            
              for (let i = 0; i < number; i++) {
                
                const key = short.uuid()
                pins.push(key);
            
                
              }
              console.log(pins);
              return pins;
            
            }

            User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
              
              $inc:{pinBalance: -parseFloat(req.body.total)},
              $push : {
                availablePins: handlegeneratePin(req.body.quantity)
              }
            
            },{new:true})
            .select('-password')
            .then(user => 
            {
                        console.log(user)
                        if(user)
                        {

                          const  date = new Date();
                          const today = date.toLocaleDateString();
                          dailyReport.findOneAndUpdate({

                            dateId : today

                          },{

                            $inc : { LevelPinsIncome : parseFloat(req.body.total )}

                          },{new: true}).then(document => {
                                
                                      if(!document){
                                              const report =  new DailyReport({
                                      
                                                dateId: today,
                                                LevelPinsIncome: parseFloat( req.body.total),
                                                PoolOnePinsIncome:  0,
                                                PoolTwoPinsIncome: 0,
                                                PoolThreePinsIncome: 0,
                                                PoolFourPinsIncome:  0,
                                                PoolFivePinsIncome:  0,
                                                PoolSixPinsIncome:  0,
                                                PoolSevenPinsIncome: 0,
                                                PoolEightPinsIncome:  0,
                                                PoolNinePinsIncome:  0,
                                                PoolTenPinsIncome:  0,
                                                withdrawpercentage: 0,
                                                funtToPinPercent : 0,
                                                //Spend 
                                                LevelOutSpend: 0,
                                                FundSharing:  0,
                                                PoolOutgo: 0,
                                                withdraw: 0,
                                                //Others
                                                Balance : 0,
                                                BalanceReport: [],
                                                Nothing: 0,
                                        
                                              })
                                        
                                                report.save()
                                                .then(re => {
                                                    console.log(re);
                                                    res.json({status:1,userdetails: user.toObject()})
                                                }).catch(err => { 
                                                    console.log(err.message);
                                                    res.json({status:0,msg:"User Does not exits"})
                                                })
                                                }

                                      else
                                      {
                                            res.json({status:1,userdetails: user.toObject()})
                                            console.log("sucess");
                                      }
                          })
                          .catch(err =>
                          {
                                console.log(err.message);
                                res.json({status:0,msg:"User Does not exits"})
                          })

                           
                        }
                        else{
                          res.json({status:0,msg:"User Does not exits"})
                          console.log("not user");
                        }
              })
              .catch(err =>
              {
                    console.log(err.message);
                    res.json({status:0,msg:"User Does not exits"})
              })
          
       }
       catch(err)
       {
          console.log(err.message);
          res.json({status:0,msg:"User Does not exits"})
       }

  });

  //@rout POST api/users/generateTreasurePin
// @desc Add a users
// @access public
router.post('/generateTreasurePin', (req,res) => {
  console.log(req.body);
    const userid = req.body._id;
    const  date = new Date();
    const today = date.toLocaleDateString();
   
  try{
    
            handlegeneratePin = (number) => {

              let pins =[];
            
            
              for (let i = 0; i < number; i++) {
                
                const key = short.uuid()
                pins.push(key);
            
                
              }
              console.log(pins);
              return pins;
            
            }

            switch (parseInt(req.body.treasureValue)) {
              case 15:
                      User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                    
                        $inc:{pinBalance: -parseFloat(req.body.total)},
                        $push: {
                          poolOnePins: handlegeneratePin(req.body.quantity)
                        }
                      },{new:true})
                      .select('-password')
                      .then(user => 
                        {
                                      console.log(user)
                                      if(user)
                                      {

                                        
                                                dailyReport.findOneAndUpdate({

                                                  dateId : today

                                                },{

                                                  $inc : { PoolOnePinsIncome : req.body.total }

                                                },{new: true}).then(document => {

                                                        if(!document){
                                                                const report =  new DailyReport({
                                                        
                                                                  dateId: today,
                                                                  LevelPinsIncome:  0,
                                                                  PoolOnePinsIncome:  req.body.total,
                                                                  PoolTwoPinsIncome: 0,
                                                                  PoolThreePinsIncome: 0,
                                                                  PoolFourPinsIncome:  0,
                                                                  PoolFivePinsIncome:  0,
                                                                  PoolSixPinsIncome:  0,
                                                                  PoolSevenPinsIncome: 0,
                                                                  PoolEightPinsIncome:  0,
                                                                  PoolNinePinsIncome:  0,
                                                                  PoolTenPinsIncome:  0,
                                                                  withdrawpercentage: 0,
                                                                  funtToPinPercent : 0,
                                                                  //Spend 
                                                                  LevelOutSpend: 0,
                                                                  FundSharing:  0,
                                                                  PoolOutgo: 0,
                                                                  withdraw: 0,
                                                                  //Others
                                                                  Balance : 0,
                                                                  BalanceReport: [],
                                                                  Nothing: 0,
                                                          
                                                                })
                                                    
                                                                report.save()
                                                                .then(re => {
                                                                          console.log(re);
                                                                          res.json({status:1,userdetails: user.toObject()})
                                                                          console.log("sucess in");
                                                                }).catch(err => { 
                                                                           console.log(err);
                                                                           console.log(err.message);
                                                                           res.json({status:0,msg:"User Does not exits"})
                                                                })
                                                        }
                                                        else
                                                        {
                                                              res.json({status:1,userdetails: user.toObject()})
                                                              console.log("sucess");
                                                        }

                                                }).catch(err => {
                                                               console.log(err.message);
                                                               res.json({status:0,msg:"User Does not exits"})
                                                })
                                                
                                      }
                                      else{
                                        res.json({status:0,msg:"User Does not exits"})
                                        console.log("not user");
                                      }
                        }
                        ).catch(err => {

                          console.log(err.message);
                          res.json({status:0,msg:"User Does not exits"})

                        })
                      
                break;

                case 30:

                        User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                      
                          $inc:{pinBalance: -parseFloat(req.body.total)},
                          $push: {
                            poolTwoPins: handlegeneratePin(req.body.quantity)
                          }
                        },{new:true})
                        .select('-password')
                        .then(user => 
                          {
                                  console.log(user)
                                  if(user)
                                  {

                                          dailyReport.findOneAndUpdate({

                                            dateId : today

                                          },{

                                            $inc : { PoolTwoPinsIncome : req.body.total }

                                          },{new: true}).then(document => {
                                                    if(!document){
                                                                const report =  new DailyReport({
                                                        
                                                                  dateId: today,
                                                                  LevelPinsIncome:  0,
                                                                  PoolOnePinsIncome:  0,
                                                                  PoolTwoPinsIncome: req.body.total,
                                                                  PoolThreePinsIncome: 0,
                                                                  PoolFourPinsIncome:  0,
                                                                  PoolFivePinsIncome:  0,
                                                                  PoolSixPinsIncome:  0,
                                                                  PoolSevenPinsIncome: 0,
                                                                  PoolEightPinsIncome:  0,
                                                                  PoolNinePinsIncome:  0,
                                                                  PoolTenPinsIncome:  0,
                                                                  withdrawpercentage: 0,
                                                                  funtToPinPercent : 0,
                                                                  //Spend 
                                                                  LevelOutSpend: 0,
                                                                  FundSharing:  0,
                                                                  PoolOutgo: 0,
                                                                  withdraw: 0,
                                                                  //Others
                                                                  Balance : 0,
                                                                  BalanceReport: [],
                                                                  Nothing: 0,
                                                          
                                                                })
                                                          
                                                              report.save()
                                                              .then(re => {
                                                                      console.log(re);
                                                                      res.json({status:1,userdetails: user.toObject()})
                                                                      console.log("sucess");

                                                              }).catch(err => { 
                                                                      console.log(err.message);
                                                                      res.json({status:0,msg:"User Does not exits"})
                                                              })
                                                              }
                                                    else
                                                    {
                                                          res.json({status:1,userdetails: user.toObject()})
                                                          console.log("sucess");
                                                    }
                                          }).catch(err => {
                                                  console.log(err.message);
                                                  res.json({status:0,msg:"User Does not exits"})
                                          })

                                      
                                  }
                                  else{
                                    res.json({status:0,msg:"User Does not exits"})
                                    console.log("not user");
                                  }
                          }
                          ).catch(err => {
                            console.log(err.message);
                            res.json({status:0,msg:"User Does not exits"})
                          })
                        
                break;
            
                case 50:

                        User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                      
                          $inc:{pinBalance: -parseFloat(req.body.total)},
                          $push: {
                            poolThreePins: handlegeneratePin(req.body.quantity)
                          }
                        },{new:true})
                        .select('-password')
                        .then(user => 
                          {
                                 console.log(user)
                                  if(user)
                                  {
                                        dailyReport.findOneAndUpdate({

                                          dateId : today

                                        },{

                                          $inc : { PoolThreePinsIncome : req.body.total }

                                        },{new: true}).then(document => {
                                            
                                                  if(!document){
                                                                  const report =  new DailyReport({
                                                          
                                                                    dateId: today,
                                                                    LevelPinsIncome:  0,
                                                                    PoolOnePinsIncome:  0,
                                                                    PoolTwoPinsIncome: 0,
                                                                    PoolThreePinsIncome: req.body.total,
                                                                    PoolFourPinsIncome:  0,
                                                                    PoolFivePinsIncome:  0,
                                                                    PoolSixPinsIncome:  0,
                                                                    PoolSevenPinsIncome: 0,
                                                                    PoolEightPinsIncome:  0,
                                                                    PoolNinePinsIncome:  0,
                                                                    PoolTenPinsIncome:  0,
                                                                    withdrawpercentage: 0,
                                                                    funtToPinPercent : 0,
                                                                    //Spend 
                                                                    LevelOutSpend: 0,
                                                                    FundSharing:  0,
                                                                    PoolOutgo: 0,
                                                                    withdraw: 0,
                                                                    //Others
                                                                    Balance : 0,
                                                                    BalanceReport: [],
                                                                    Nothing: 0,
                                                            
                                                                  })
                                                            
                                                                report.save()
                                                                .then(re => {
                                                                        console.log(re);
                                                                        res.json({status:1,userdetails: user.toObject()})
                                                                        console.log("sucess");
                                                                }).catch(err => { 
                                                                        console.log(err.message);
                                                                        res.json({status:0,msg:"User Does not exits"})
                                                                })
                                                  }
                                                  else
                                                  {
                                                    res.json({status:1,userdetails: user.toObject()})
                                                    console.log("sucess");
                                                  }

                                        }).catch(err => {
                                                console.log(err.message);
                                                  res.json({status:0,msg:"User Does not exits"})
                                        })

                                    
                                  }
                                  else{
                                    res.json({status:0,msg:"User Does not exits"})
                                    console.log("not user");
                                  }
                          }
                          ).catch(err => {
                                    console.log(err.message);
                                     res.json({status:0,msg:"User Does not exits"}) 
                          })
                        
                  break;

                  case 100:

                        User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                      
                          $inc:{pinBalance: -parseFloat(req.body.total)},
                          $push: {
                            poolFourPins: handlegeneratePin(req.body.quantity)
                          }
                        },{new:true})
                        .select('-password')
                        .then(user => 
                          {
                                    console.log(user)
                                    if(user)
                                    {
                                            dailyReport.findOneAndUpdate({

                                              dateId : today

                                            },{

                                              $inc : { PoolFourPinsIncome : req.body.total }

                                            },{new: true}).then(document => {
                                                          if(!document){
                                                                        const report =  new DailyReport({
                                                                
                                                                          dateId: today,
                                                                          LevelPinsIncome:  0,
                                                                          PoolOnePinsIncome:  0,
                                                                          PoolTwoPinsIncome: 0,
                                                                          PoolThreePinsIncome: 0,
                                                                          PoolFourPinsIncome:  req.body.total,
                                                                          PoolFivePinsIncome:  0,
                                                                          PoolSixPinsIncome:  0,
                                                                          PoolSevenPinsIncome: 0,
                                                                          PoolEightPinsIncome:  0,
                                                                          PoolNinePinsIncome:  0,
                                                                          PoolTenPinsIncome:  0,
                                                                          withdrawpercentage: 0,
                                                                          funtToPinPercent : 0,
                                                                          //Spend 
                                                                          LevelOutSpend: 0,
                                                                          FundSharing:  0,
                                                                          PoolOutgo: 0,
                                                                          withdraw: 0,
                                                                          //Others
                                                                          Balance : 0,
                                                                          BalanceReport: [],
                                                                          Nothing: 0,
                                                                  
                                                                        })
                                                                  
                                                                      report.save()
                                                                      .then(re => {
                                                                          console.log(re);
                                                                          res.json({status:1,userdetails: user.toObject()})
                                                                          console.log("sucess");
                                                                      }).catch(err => { 
                                                                          console.log(err);
                                                                          console.log(err.message);
                                                                          res.json({status:0,msg:"User Does not exits"})
                                                                      })
                                                          }
                                                          else
                                                          {
                                                                res.json({status:1,userdetails: user.toObject()})
                                                                console.log("sucess");
                                                          }
                                            }).catch(err => {
                                                  console.log(err.message);
                                                  res.json({status:0,msg:"User Does not exits"})
                                            })

                                       
                                    }
                                    else{
                                      res.json({status:0,msg:"User Does not exits"})
                                      console.log("not user");
                                    }
                          }
                          ).catch(err => {
                                  console.log(err.message);
                                  res.json({status:0,msg:"User Does not exits"})
                          })
                        
                break;
              
                case 150:
                          User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                        
                            $inc:{pinBalance: -parseFloat(req.body.total)},
                            $push: {
                              poolFivePins: handlegeneratePin(req.body.quantity)
                            }
                          },{new:true})
                          .select('-password')
                          .then(user => 
                            {
                                    console.log(user)
                                    if(user)
                                    {

                                              dailyReport.findOneAndUpdate({

                                                dateId : today

                                              },{

                                                $inc : { PoolFivePinsIncome : req.body.total }

                                              },{new: true}).then(document => {
                                                      if(!document){
                                                                const report =  new DailyReport({
                                                        
                                                                  dateId: today,
                                                                  LevelPinsIncome: 0,
                                                                  PoolOnePinsIncome:  0,
                                                                  PoolTwoPinsIncome: 0,
                                                                  PoolThreePinsIncome: 0,
                                                                  PoolFourPinsIncome:  0,
                                                                  PoolFivePinsIncome:  req.body.total,
                                                                  PoolSixPinsIncome:   0,
                                                                  PoolSevenPinsIncome: 0,
                                                                  PoolEightPinsIncome:  0,
                                                                  PoolNinePinsIncome:  0,
                                                                  PoolTenPinsIncome:  0,
                                                                  withdrawpercentage: 0,
                                                                  funtToPinPercent : 0,
                                                                  //Spend 
                                                                  LevelOutSpend: 0,
                                                                  FundSharing:  0,
                                                                  PoolOutgo: 0,
                                                                  withdraw: 0,
                                                                  //Others
                                                                  Balance : 0,
                                                                  BalanceReport: [],
                                                                  Nothing: 0,
                                                          
                                                                })
                                                          
                                                              report.save()
                                                              .then(re => {
                                                                  console.log(re);
                                                                  res.json({status:1,userdetails: user.toObject()})
                                                                  console.log("sucess")
                                                              }).catch(err => { 
                                                                          console.log(err);
                                                                        res.json({status:0,msg:"User Does not exits"})
                                                                      console.log("not user");
                                                              })
                                                      }
                                                      else
                                                      {
                                                            res.json({status:1,userdetails: user.toObject()})
                                                            console.log("sucess")
                                                      }
                                              }).catch(err => {
                                                        console.log(err.message);
                                                        res.json({status:0,msg:"User Does not exits"})  
                                              })

                                        
                                    }
                                    else{
                                      res.json({status:0,msg:"User Does not exits"})
                                      console.log("not user");
                                    }
                            }
                            ).catch(err => {
                                    console.log(err.message);
                                    res.json({status:0,msg:"User Does not exits"})  
                            })
                          
                  break;
              
                  case 200:

                          User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                        
                            $inc:{pinBalance: -parseFloat(req.body.total)},
                            $push: {
                              poolSixPins: handlegeneratePin(req.body.quantity)
                            }
                          },{new:true})
                          .select('-password')
                          .then(user => 
                            {
                                    console.log(user)
                                    if(user)
                                    {
                                            dailyReport.findOneAndUpdate({

                                              dateId : today
                            
                                            },{
                            
                                              $inc : { PoolSixPinsIncome : req.body.total }
                            
                                            },{new: true}).then(document => {
                                                  if(!document){
                                                            const report =  new DailyReport({
                                                    
                                                              dateId: today,
                                                              LevelPinsIncome:  0,
                                                              PoolOnePinsIncome:  0,
                                                              PoolTwoPinsIncome: 0,
                                                              PoolThreePinsIncome: 0,
                                                              PoolFourPinsIncome:  0,
                                                              PoolFivePinsIncome:  0,
                                                              PoolSixPinsIncome:  req.body.total,
                                                              PoolSevenPinsIncome: 0,
                                                              PoolEightPinsIncome:  0,
                                                              PoolNinePinsIncome:  0,
                                                              PoolTenPinsIncome:  0,
                                                              withdrawpercentage: 0,
                                                              funtToPinPercent : 0,
                                                              //Spend 
                                                              LevelOutSpend: 0,
                                                              FundSharing:  0,
                                                              PoolOutgo: 0,
                                                              withdraw: 0,
                                                              //Others
                                                              Balance : 0,
                                                              BalanceReport: [],
                                                              Nothing: 0,
                                                      
                                                            })
                                                      
                                                          report.save()
                                                          .then(re => {
                                                                    console.log(re);
                                                                    res.json({status:1,userdetails: user.toObject()})
                                                                    console.log("sucess");
                                                          }).catch(err => { 
                                                                    console.log(err.message);
                                                                    res.json({status:0,msg:"User Does not exits"})
                                                          })
                                                  }
                                                  else
                                                  {
                                                      res.json({status:1,userdetails: user.toObject()})
                                                      console.log("sucess");
                                                  }
                                            })
                                            .catch(err => {
                                                   console.log(err.message);
                                                   res.json({status:0,msg:"User Does not exits"})
                                            })

                                    }
                                    else{
                                      res.json({status:0,msg:"User Does not exits"})
                                      console.log("not user");
                                    }
                            
                             } ).catch(err => {
                                    console.log(err.message);
                                    res.json({status:0,msg:"User Does not exits"})
                            })
                          
                    break;
                
                    case 300:
                              User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                            
                                $inc:{pinBalance: -parseFloat(req.body.total)},
                                $push: {
                                  poolSevenPins: handlegeneratePin(req.body.quantity)
                                }
                              },{new:true})
                              .select('-password')
                              .then(user => 
                                {
                                            console.log(user)
                                            if(user)
                                            {
                                                    dailyReport.findOneAndUpdate({

                                                      dateId : today
                                    
                                                    },{
                                    
                                                      $inc : {  PoolSevenPinsIncome : req.body.total }
                                    
                                                    },{new: true}).then(document => {
                                                            if(!document){
                                                                        const report =  new DailyReport({
                                                                
                                                                          dateId: today,
                                                                          LevelPinsIncome:  0,
                                                                          PoolOnePinsIncome:  0,
                                                                          PoolTwoPinsIncome: 0,
                                                                          PoolThreePinsIncome: 0,
                                                                          PoolFourPinsIncome:  0,
                                                                          PoolFivePinsIncome:  0,
                                                                          PoolSixPinsIncome:  0,
                                                                          PoolSevenPinsIncome: req.body.total,
                                                                          PoolEightPinsIncome:  0,
                                                                          PoolNinePinsIncome:  0,
                                                                          PoolTenPinsIncome:  0,
                                                                          withdrawpercentage: 0,
                                                                          funtToPinPercent : 0,
                                                                          //Spend 
                                                                          LevelOutSpend: 0,
                                                                          FundSharing:  0,
                                                                          PoolOutgo: 0,
                                                                          withdraw: 0,
                                                                          //Others
                                                                          Balance : 0,
                                                                          BalanceReport: [],
                                                                          Nothing: 0,
                                                                  
                                                                        })
                                                                  
                                                                      report.save()
                                                                      .then(re => {
                                                                          console.log(re);
                                                                          res.json({status:1,userdetails: user.toObject()})
                                                                          console.log("sucess");
                                                                      }).catch(err => { 
                                                                          console.log(err);
                                                                          console.log(err.message);
                                                                          res.json({status:0,msg:"User Does not exits"})
                                                                      })
                                                            }
                                                            else
                                                            {

                                                                  res.json({status:1,userdetails: user.toObject()})
                                                                  console.log("sucess");
                                                            }
                                                    })
                                                    .catch(err => {
                                                            console.log(err.message);
                                                            res.json({status:0,msg:"User Does not exits"})
                                                    })

                                            }
                                            else{
                                              res.json({status:0,msg:"User Does not exits"})
                                              console.log("not user");
                                            }
                                }
                                ).catch(err => {
                                        console.log(err.message);
                                        res.json({status:0,msg:"User Does not exits"})
                                })
                              
                      break;
                
                      case 500:

                                User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                              
                                  $inc:{pinBalance: -parseFloat(req.body.total)},
                                  $push: {
                                    poolEightPins: handlegeneratePin(req.body.quantity)
                                  }
                                },{new:true})
                                .select('-password')
                                .then(user => 
                                  {
                                          console.log(user)
                                          if(user)
                                          {
                                                      dailyReport.findOneAndUpdate({

                                                        dateId : today
                                      
                                                      },{
                                      
                                                        $inc : { PoolEightPinsIncome : req.body.total }
                                      
                                                      },{new: true}).then(document => {

                                                                    if(!document){

                                                                          const report =  new DailyReport({
                                                                  
                                                                            dateId: today,
                                                                            PoolOnePinsIncome:  0,
                                                                            PoolTwoPinsIncome: 0,
                                                                            PoolThreePinsIncome: 0,
                                                                            PoolFourPinsIncome:  0,
                                                                            PoolFivePinsIncome:  0,
                                                                            PoolSixPinsIncome:  0,
                                                                            PoolSevenPinsIncome: 0,
                                                                            PoolEightPinsIncome:  req.body.total,
                                                                            PoolNinePinsIncome:  0,
                                                                            PoolTenPinsIncome:  0,
                                                                            withdrawpercentage: 0,
                                                                            funtToPinPercent : 0,
                                                                            //Spend 
                                                                            LevelOutSpend: 0,
                                                                            FundSharing:  0,
                                                                            PoolOutgo: 0,
                                                                            withdraw: 0,
                                                                            //Others
                                                                            Balance : 0,
                                                                            BalanceReport: [],
                                                                            Nothing: 0,
                                                                    
                                                                          })
                                                                
                                                                          report.save()
                                                                          .then(re => {
                                                                                    console.log(re);
                                                                                    res.json({status:1,userdetails: user.toObject()})
                                                                                    console.log("sucess");
                                                                          }).catch(err => { 
                                                                                    console.log(err.message);
                                                                                    res.json({status:0,msg:"User Does not exits"})
                                                                          })
                                                                     }
                                                                    else
                                                                    {
                                                                            res.json({status:1,userdetails: user.toObject()})
                                                                            console.log("sucess");
                                                                    }
                                                      })
                                                      .catch(err => {
                                                                console.log(err.message);
                                                                res.json({status:0,msg:"User Does not exits"})
                                                      })

                                              
                                          }
                                          else{
                                            res.json({status:0,msg:"User Does not exits"})
                                            console.log("not user");
                                          }
                                  }
                                  ).catch(err => {
                                          console.log(err.message);
                                          res.json({status:0,msg:"User Does not exits"})
                                  })
                                
                                break;

                        case 750:

                                User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                              
                                  $inc:{pinBalance: -parseFloat(req.body.total)},
                                  $push: {
                                    poolNinePins: handlegeneratePin(req.body.quantity)
                                  }
                                },{new:true})
                                .select('-password')
                                .then(user => 
                                  {
                                            console.log(user)
                                            if(user)
                                            {

                                                      dailyReport.findOneAndUpdate({

                                                        dateId : today
                                      
                                                      },{
                                      
                                                        $inc : { PoolNinePinsIncome : req.body.total }
                                      
                                                      },{new: true}).then(document => {

                                                                if(!document){
                                                                            const report =  new DailyReport({
                                                                    
                                                                              dateId: today,
                                                                              LevelPinsIncome:  0,
                                                                              PoolOnePinsIncome:  0,
                                                                              PoolTwoPinsIncome: 0,
                                                                              PoolThreePinsIncome: 0,
                                                                              PoolFourPinsIncome:  0,
                                                                              PoolFivePinsIncome:  0,
                                                                              PoolSixPinsIncome:  0,
                                                                              PoolSevenPinsIncome: 0,
                                                                              PoolEightPinsIncome:  0,
                                                                              PoolNinePinsIncome:  req.body.total,
                                                                              PoolTenPinsIncome:  0,
                                                                              withdrawpercentage: 0,
                                                                              funtToPinPercent : 0,
                                                                              //Spend 
                                                                              LevelOutSpend: 0,
                                                                              FundSharing:  0,
                                                                              PoolOutgo: 0,
                                                                              withdraw: 0,
                                                                              //Others
                                                                              Balance : 0,
                                                                              BalanceReport: [],
                                                                              Nothing: 0,
                                                                      
                                                                            })
                                                                      
                                                                          report.save()
                                                                          .then(re => {
                                                                                  res.json({status:1,userdetails: user.toObject()})
                                                                                  console.log("sucess");
                                                                          }).catch(err => { 
                                                                                  console.log(err.message);
                                                                                  res.json({status:0,msg:"User Does not exits"})
                                                                          })
                                                                }
                                                                else
                                                                {
                                                                  res.json({status:1,userdetails: user.toObject()})
                                                                  console.log("sucess");
                                                                }

                                                      }).catch(err => {

                                                                console.log(err.message);
                                                                res.json({status:0,msg:"User Does not exits"})
                                                                
                                                      })

                                            }
                                            else{
                                                  res.json({status:0,msg:"User Does not exits"})
                                                  console.log("not user");
                                            }
                                  }
                                  ).catch(err => {
                                          console.log(err.message);
                                          res.json({status:0,msg:"User Does not exits"})
                                  })
                                
                          break;

                          case 1000:

                                    User.findOneAndUpdate({ _id: userid ,TransitionPassword: req.body._Password},{
                                  
                                      $inc:{pinBalance: -parseFloat(req.body.total)},
                                      $push: {
                                        poolTenPins: handlegeneratePin(req.body.quantity)
                                      }
                                    },{new:true})
                                    .select('-password')
                                    .then(user => 
                                      {
                                              console.log(user)
                                              if(user)
                                              {
                                                        dailyReport.findOneAndUpdate({

                                                          dateId : today

                                                        },{

                                                          $inc : { PoolTenPinsIncome : req.body.total }

                                                        },{new: true}).then(document => {

                                                                      if(!document){

                                                                            const report =  new DailyReport({
                                                                    
                                                                              dateId: today,
                                                                              LevelPinsIncome: 0,
                                                                              PoolOnePinsIncome:  0,
                                                                              PoolTwoPinsIncome: 0,
                                                                              PoolThreePinsIncome: 0,
                                                                              PoolFourPinsIncome:  0,
                                                                              PoolFivePinsIncome:  0,
                                                                              PoolSixPinsIncome:  0,
                                                                              PoolSevenPinsIncome: 0,
                                                                              PoolEightPinsIncome:  0,
                                                                              PoolNinePinsIncome:  0,
                                                                              PoolTenPinsIncome: req.body.total,
                                                                              withdrawpercentage: 0,
                                                                              funtToPinPercent : 0,
                                                                              //Spend 
                                                                              LevelOutSpend: 0,
                                                                              FundSharing:  0,
                                                                              PoolOutgo: 0,
                                                                              withdraw: 0,
                                                                              //Others
                                                                              Balance : 0,
                                                                              BalanceReport: [],
                                                                              Nothing: 0,
                                                                      
                                                                            })
                                                                  
                                                                            report.save()
                                                                            .then(re => {
                                                                                        console.log(re);
                                                                                        res.json({status:1,userdetails: user.toObject()})
                                                                                        console.log("sucess");
                                                                            }).catch(err => { 
                                                                                        console.log(err.message);
                                                                                        res.json({status:0,msg:"User Does not exits"})
                                                                            })
                                                                            }
                                                                      else
                                                                      {
                                                                            res.json({status:1,userdetails: user.toObject()})
                                                                            console.log("sucess");
                                                                      }

                                                        }).catch(err => {
                                                              console.log(err.message);
                                                              res.json({status:0,msg:"User Does not exits"})
                                                        })

                                                  
                                              }
                                              else{
                                                res.json({status:0,msg:"User Does not exits"})
                                                console.log("not user");
                                              }
                                      }).catch(err => {
                                                console.log(err.message);
                                                res.json({status:0,msg:"User Does not exits"})
                                      })
                                    
                break;
                
                default:
                     res.json({status:0,msg:"User Does not exits"})
                     break;
            }

  }
  catch(err)
  {
     console.log(err.message);
     res.json({status:0,msg:"User Does not exits"})
  }
   
  
  
  });

//@rout POST api/users/Walletaddress
// @desc Add a users
// @access public
router.post('/walletAddress', (req,res) => {
  console.log(req.body);
   
   try{
            User.findOneAndUpdate({_id: req.body.id, TransitionPassword: req.body.oldPassword},{
              bitAddress: req.body.walletAddress
            },{new:true})
            .select('-password')
            .then(user => 
              {
                console.log(user)
                if(user)
                {
                    res.json({status:1,userdetails: user.toObject()})
                    console.log("sucess");
                }
                else
                {
                    res.json({status:0})
                    console.log("not user");
                }
              }
              ).catch(err => {

                    console.log(err.message);
                    res.json({status:0})

              })
    }
    catch(err)
    {
          console.log(err.message);
          res.json({status:0})
    }
  
  });

  //@rout update api/users/changePassword
// @desc delete a users
// @acess public
router.post('/changePassword', (req,res) => { 

  console.log(req.body);

  try
  {

            User.findOneAndUpdate({_id: req.body.id, password: req.body.oldPassword},{
              password: req.body.newPassword
            },{new:true})
            .select('-password')
            .then(item => {

                if(item)
                {
                  res.json({ status: 1  })
                }
                else
                {
                  res.json({ status: 0 })
                }

            }).catch(err => {

              console.log(err);
              res.json({ status: 0 })
              
            })
            
  }
  catch(err)
  {
       console.log(" ");
       res.json({ status: 0 })
  }


});


  //@rout update api/users/changeTansitionPassword
// @desc Update Transition password
// @acess public
router.post('/changeTransitionPassword', (req,res) => { 

  console.log(req.body);

  try{
            User.findOneAndUpdate({_id: req.body.id, TransitionPassword: req.body.oldPassword},{
              TransitionPassword: req.body.newPassword
            },{new:true})
            .select('-password')
            .then(item => {
              console.log(item);
                if(item){
                    res.json({ status: 1  })
                }else{
                    res.json({ status: 0 })
                }
            }).catch(err => {
              console.log(err.message);
              res.json({ status: 0 })
            })
    }
    catch
    {
         console.log(" ");
         res.json({ status: 0 })
    }


});

//@rout Delete api/users
// @desc delete a users
// @acess public
router.delete('/:id', (req,res) => {
    User.findById(req.params.id).then(item => 
        item.remove().then( ()=> res.json({sucess: true})))
        .catch(err => res.status(404).json({sucess: false}));
 });


 //===========================================================================================================
 //==========================    Pool Updates ================================================================
 //===========================================================================================================

 
 //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolOneUpdate', (req,res) => {
  console.log(req.body);

  const autopool = new Autopool({

    userId: req.body.userid,
    poolOneCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolOnePins: req.body.pins },
            poolOne: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  });

   //@rout POST api/users/poolTwoUpdate
// @desc Add a users
// @access public
router.post('/poolTwoUpdate', (req,res) => {
  console.log(req.body);
  const autopool2 = new Autopool2({

    userId: req.body.userid,
    poolTwoCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool2.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolTwoPins: req.body.pins },
            poolTwo: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolThreeUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool3 = new Autopool3({

    userId: req.body.userid,
    poolThreeCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool3.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolThreePins: req.body.pins },
            poolThree: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolFourUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool4 = new Autopool4({

    userId: req.body.userid,
    poolFourCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool4.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolFourPins: req.body.pins },
            poolFour: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolFiveUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool5 = new Autopool5({

    userId: req.body.userid,
    poolFiveCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool5.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolFivePins: req.body.pins },
            poolFive: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolSixUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool6 = new Autopool6({

    userId: req.body.userid,
    poolSixCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool6.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolSixPins: req.body.pins },
            poolSix: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolSevenUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool7 = new Autopool7({

    userId: req.body.userid,
    poolSevenCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool7.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolSevenPins: req.body.pins },
            poolSeven: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolEightUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool8 = new Autopool8({

    userId: req.body.userid,
    poolEightCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool8.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolEightPins: req.body.pins },
            poolEight: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolNineUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool9 = new Autopool9({

    userId: req.body.userid,
    poolNineCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool9.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolNinePins: req.body.pins },
            poolNine: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });

   //@rout POST api/users/poolOneUpdate
// @desc Add a users
// @access public
router.post('/poolTenUpdate', (req,res) => {
  console.log(req.body);
    
  const autopool10 = new Autopool10({

    userId: req.body.userid,
    poolTenCompleted: false,
    members: [],
    referedBy: " ",
    levelOne: 0,
    levelTwo: 0,
    levelThree: 0,
    levelOneIncome: 0,
    levelTwoIncome: 0,
    levelThreeIncome: 0,
    available: true
    })
        
    autopool10.save()
    .then(user => 
      
     {
        if(user){

          User.findByIdAndUpdate({ _id: req.body._id},{
            $pull: { poolTenPins: req.body.pins },
            poolTen: true
          },{new:true})
           .select('-password ')
           .then(user => 
            {
              console.log(user)
              if(user)
              {
                  res.json({status:1,userdetails: user.toObject()})
                  console.log("sucess");
              }
              else{
                res.json({status:0})
                console.log("not user");
              }
            }
            )

        }
     }
      
      )
  
  
  
  });


    //@rout POST api/users/getPoolStatementDetails
// @desc Add a users
// @access public
router.get('/getPoolStatementDetails/:id', (req,res) => {
  console.log(req.params.id);
    
    
    poolStatement.find({userId : req.params.id})
    .then(user => {
      if(user)
      {
        res.json({status : 1 , user})
      }
      else
      {
        res.json({status: 0})
      }
    })
  
  
  });

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolOneDetails/:id',(req, res) => {

   Autopool.find({userId: req.params.id})
   .then(user1 => {

    if(user1){
      res.json({status : 1 , user1})
    }

   })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolTwoDetails/:id',(req, res) => {

  Autopool2.find({userId: req.params.id})
  .then(user2 => {

   if(user2){
     res.json({status : 1 , user2})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolThreeDetails/:id',(req, res) => {

  Autopool3.find({userId: req.params.id})
  .then(user3 => {

   if(user3){
     res.json({status : 1 , user3})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolFourDetails/:id',(req, res) => {

  Autopool4.find({userId: req.params.id})
  .then(user4 => {

   if(user4){
     res.json({status : 1 , user4})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolFiveDetails/:id',(req, res) => {

  Autopool5.find({userId: req.params.id})
  .then(user5 => {

   if(user5){
     res.json({status : 1 , user5})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolSixDetails/:id',(req, res) => {

  Autopool6.find({userId: req.params.id})
  .then(user6 => {

   if(user6){
     res.json({status : 1 , user6})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolSevenDetails/:id',(req, res) => {

  Autopool7.find({userId: req.params.id})
  .then(user7 => {

   if(user7){
     res.json({status : 1 , user7})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolEightDetails/:id',(req, res) => {

  Autopool8.find({userId: req.params.id})
  .then(user8 => {

   if(user8){
     res.json({status : 1 , user8})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolNineDetails/:id',(req, res) => {

  Autopool9.find({userId: req.params.id})
  .then(user9 => {

   if(user9){
     res.json({status : 1 , user9})
   }

  })

})

  //@rout POST api/users/getautopooldetails
// @desc autopool details
// @access public
router.get('/getUserAutopoolTenDetails/:id',(req, res) => {

  Autopool10.find({userId: req.params.id})
  .then(user10 => {

   if(user10){
     res.json({status : 1 , user10})
   }

  })

})

module.exports = router;