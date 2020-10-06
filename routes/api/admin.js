const express = require('express');
const router = express.Router();

const Admin = require('../../modals/Admin');
const AdInfo = require('../../modals/AdInfo');
const Withdraw = require('../../modals/WithdrawStatement');
const Users = require('../../modals/Users');
const Tickets = require('../../modals/CreateTickets');
const FundsharingStatement = require('../../modals/ShareFundStatement');
const Autopool = require('../../modals/Autopool');
const Autopool2 = require('../../modals/AutopoolTwo');
const Autopool3 = require('../../modals/AutopoolThree');
const Autopool4 = require('../../modals/AutopoolFour');
const Autopool5 = require('../../modals/AutopoolFive');
const Autopool6 = require('../../modals/AutopoolSix');
const Autopool7 = require('../../modals/AutopoolSeven');
const Autopool8 = require('../../modals/AutopoolEight');
const Autopool9 = require('../../modals/AutopoolNine');
const Autopool10 = require('../../modals/AutopoolTen');
const PoolStatement  =  require('../../modals/poolStatement');
const short = require('short-uuid');
const DailyReport = require('../../modals/dailyReport');
const dailyReport = require('../../modals/dailyReport');
const DepositSatements = require('../../modals/DepositStatement');

//@rout get api/users/admin
// Add Admin
// @acess public
router.post('/jh', (req,res) => {

    const admin = new Admin({

        Pass: "@MakeiT@"

    })
    admin.save()
    .then(user => console.log(user))
    .catch(err => console.log(err));

});


//@rout get api/Admin/getTickets/UpdateMessage
// Add Ticket
// @acess public
router.get('/GetTickets', (req,res) => {
  
    
    Tickets.find()
    .sort({RequestedDate: 1})
    .then(Tickets => {
        console.log(Tickets);
        if(Tickets){
            res.json({status: 1, Tickets})
        }else{ res.json({status: 0})}
    }).catch(err => {
         console.log(err);
         res.json({status: 0})
    })

})

//@rout get api/Admin/UpdateMessage
// Add Ticket
// @acess public
router.post('/UpdateMessage', (req,res) => {
  
    console.log(req.body);

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
        console.log(err);
        res.json({status: 0})
    })

})

//@rout get api/Admin/getNews
// Add Admin
// @acess public
router.get('/getNews', (req,res) => {

    AdInfo.find()
    .select('news QRimage ')
    .then(news => {
        console.log(news);
        if(news){
            res.json({status: 1, news})
        }else{ res.json({status: 0})}
    })
    .catch(err => {
        console.log(err);
        res.json({status: 0})
    })
});

//@rout get api/Admin/UpdateNews
// Add Admin
// @acess public
router.post('/UpdateNews', (req,res) => {

    console.log(req.body.news);

    AdInfo.findOneAndUpdate({_id : '5f7b0e53d3d3591b259c85d0' },{
        news: req.body.news
    },{new: true})
    .select('news')
    .then(news => {
        console.log(news);
        if(news){
            res.json({status: 1, news})
        }else{ res.json({status: 0})}
    }).catch(err => {
        console.log(err);
        res.json({status: 0})
    })

});

//@rout get api/Admin/ImageUpload
// Add Admin
// @acess public
router.post('/ImageUpload', (req,res) => {
    
    console.log(req.body);

    const obj = {
        img : req.body.imagefile,
        btcAddress : req.body.text
    }

    // const Adinfo =  new AdInfo({

    //     withdrawRequests: [],
    //     news: [],
    //     dashboardTable: [],
    //     QRimage : []

    // })
    
            AdInfo.findOneAndUpdate({_id : '5f7b0e53d3d3591b259c85d0' },{
                QRimage: obj
            },{new: true})
            .select('QRimage')
            .then(Img => {
                console.log(Img);
                if(Img){
                    res.json({status: 1, Img})
                }
                else
                { res.json({status: 0})}
            });

    });


//@rout get api/users/adinfo
// create info
// @acess public
router.post('/Adinfo', (req,res) => {

    console.log(req.body);

    const adinfo = new AdInfo({

        withdrawRequests:[],
        news:[],
        dashboardTable:[]

    })
    adinfo.save()
    .then(user => console.log(user))
    .catch(err => console.log(err));

});

//@rout get api/Admin/adinfo/withdraw
// get info withdraw
// @acess public
router.get('/Adinfo/withdraw', (req,res) => {

    console.log(req.body);
try{
                AdInfo.findOne({_id: '5f7b0e53d3d3591b259c85d0'})
                .select('withdrawRequests')
                .sort({date : 1})
                .then(request => {
                        if(request){
                            res.json({status: 1, request})
                        }else{
                            res.json({status: 0})
                        }
                })
                .catch(err =>
                {
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

//@rout get api/Admin/DepositSatements
// get info withdraw
// @acess public
router.get('/DepositSatements', (req,res) => {

    console.log(req.body);

   DepositSatements.find()
   .sort({date : 1})
   .then(statements => {
        if(statements){
            res.json({status: 1, statements})
        }else{
            res.json({status: 0})
        }
   })

});

//@rout get api/Admin/getUserForPin
// get info withdraw
// @acess public
router.get('/getUserForPin/:id', (req,res) => {

    console.log(req.params.id);

    Users.findOne({ userId: req.params.id})
     .select('-password')
     .then(user => {
         if(user){
             res.json({status: 1, user})
         }else{
             res.json({status:0})
         }
     })
   


});


//@rout get api/Admin/sendPinToUser
// get info withdraw
// @acess public
router.post('/sendPinToUser', (req,res) => {
    console.log(req.body);

    try{
                        const pin = req.body.pin
                console.log("pin",pin);
                Users.findByIdAndUpdate({_id: req.body._id},{
                    $push: { 
                        availablePins: pin
                    }
                    },{new:true}).then(user => {
                    console.log(user);
                    if(user){
                        res.json({status: 1, user})
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
        console.log(err.message)
        res.json({status: 0})
    }

});

//@rout get api/Admin/getAllUserDatails
// get info withdraw
// @acess public
router.get('/getAllUserDetails',(req,res) => {

    Users.find().then(users => {
        if(users){
            res.json({status: 1,users});
        }else{
            res.json({status: 0});
        }
    })

})

//@rout get api/Admin/getTodayUserDetails/SendFundToUser/getDailyReportDetails
// get info daily
// @acess public
router.post('/getTodayUserDetails',(req,res) => {

    console.log(req.body);
    let current_datetime = new Date()
    let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + (current_datetime.getDate()+1)

try{

    const date = new Date()
    console.log(date.toLocaleString());
    Users.find(
        {
          $or:
         [
           {
            joiningDate:
            { $gte: req.body.startDate, $lte: req.body.endDate },
            Active: "true"
           },
           {
            joiningDate:
            { $gte: req.body.startDate, $lte: end_date },
            Active: "true"
           },
         ],
        },
      )
      .then(users => {
          console.log(users);
        if(users){
            res.json({status: 1,users});
        }else{
            res.json({status: 0});
        }
    }).catch(err => {
         console.log(err.message);
         res.json({status: 0});
    })
}
catch(err)
{
    console.log(err.message);
    res.json({status: 0});
}

})

//@rout get api/AdmingetDailyReportDetails
// get info daily
// @acess public
router.post('/getDailyReportDetails',(req,res) => {

    console.log(req.body);
    DailyReport.find(
        {
          $or:
         [
           {
            date:
            { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) },
           },
           {
            date:
            { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate).setDate(new Date(req.body.endDate).getDate() + 1) },
           },
         ],
        },
      )
      .then(users => {
          console.log(users);
        if(users){
            res.json({status: 1,users});
        }else{
            res.json({status: 0});
        }
    })

})

//@rout get api/Admin/SendFundToUser
// get info daily
// @acess public
router.post('/SendFundToUser',(req,res) => {

    console.log(req.body);
    let current_datetime = new Date()
  let end_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
  
try{
            Users.findOneAndUpdate({
                userId: req.body.userid
            },{
                $inc: { fundSharingIncome : parseFloat(req.body.fundamount) }
            },{new: true})
            .then(users => {
                if(users){

                        const ShareFundStmnt = new FundsharingStatement({

                            userId: req.body.userid,
                            mailId:users.mailId,
                            Date: end_date,
                            message: 'Hurray ! You have been Rewarded.',
                            Amount: req.body.fundamount,
                    
                        })
                        
                        ShareFundStmnt.save().catch(err => {console.log(err.message);  res.json({status: 0});})

                        const date = new Date();
                        const today = date.toLocaleDateString();
                        console.log(today);
                        DailyReport.findOneAndUpdate({dateId : today},{

                            $inc: { FundSharing : parseFloat(req.body.fundamount) }
                            
                        })
                        .then(document => {
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
                                    withdrawpercentage:0,
                                    funtToPinPercent : 0,
                                    //Spend 
                                    LevelOutSpend: 0,
                                    FundSharing:  parseFloat(req.body.fundamount),
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
                                        res.json({status: 1,users});
                                    }).catch(err => { 
                                        console.log(err);
                                        res.json({status: 0});
                                    })
                            }else{
                                res.json({status: 1,users});
                            }
                        })
                        .catch(err => {
                            res.json({status: 0});
                        })

                      
                        
                }else{
                    res.json({status: 0});
                }
            })
            .catch(err => {
                    console.log(err.message);
                    res.json({status: 0});
            })

}
catch(err)
{
     console.log(err.message);
     res.json({status: 0});
}



})

//@rout get api/Admin/SendDepositAmountToUser
// get info daily
// @acess public
router.post('/SendDepositAmountToUser',(req,res) => {

    console.log(req.body);

    Users.findOneAndUpdate({
        userId: req.body.userid
    },{
        $inc: { recievedIncome : parseFloat(req.body.amount) }
    },{new: true})
      .then(users => {
        if(users){

            DepositSatements.findOneAndUpdate({ _id : req.body._id },{
                status: true ,
                success : "Done"
            },{new : true})
            .then(user => {
                if(user){
                    console.log("user:",user);
                    res.json({status: 1,msg: "successful"})
                }else
                {
                    console.log("else:", );
                    res.json({status: 0,msg: "not done"})
                }
            })

           
        }else{
            res.json({status: 0 ,msg: "no User Found"});
        }
    })

    



})

//@rout get api/Admin/AddBalance
// get info daily
// @acess public
router.post('/AddBalance',(req,res) => {

    console.log(req.body);

    const date = new Date();
    const today = date.toLocaleDateString();
    const obj = {
        Admin : req.body.admin,
        Amount : req.body.addamount
    }

            AdInfo.findByIdAndUpdate(
                {
                    _id : "5f7b0e53d3d3591b259c85d0"
                } ,
                {
                   $inc : { Balance : parseFloat(req.body.addamount) },
                },
                {
                    new: true
                }
                )
                .then(users => {

                    if(users){
                        

                        DailyReport.findOneAndUpdate(
                            {
                                dateId : today
                            },
                            {
                                $push : 
                                {
                                    BalanceReport  : obj
                                }
                            },
                            {
                                new : true
                            }
                        ).then(users => {

                            if(users)
                            {
                                res.json({status: 1,users , msg: "SucessFull"});
                            }
                            else{
                        
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
                                    BalanceReport: [obj],
                                    Nothing: 0,
                            
                                   })
                            
                                 report.save()
                                 .then(users => {
                                    res.json({status: 1, users ,msg: "SucessFull"});
                                 }).catch(err => { 
                                    res.json({status: 0, users ,msg: "Daily report not updated"});
                                })
                            }


                        })
                    }
                    else{
                        res.json({status: 0,users , msg: "Update not done"});
                    }
                  

                }).catch(err => {
                    console.log(err);
                    res.json({status: 0,users , msg: "Update not done"});
                })  

})


//@rout get api/Admin/AddBalance
// get info daily
// @acess public
router.get('/Balance',(req,res) => {

    console.log(req.body);

   AdInfo.find()
   .select('Balance')
   .then(Balance => {
       if(Balance){
           res.json({status : 1 , Balance} )
       }
       else{
           res.json({status: 0})
       }
   }).catch(err => {
       console.log(err);
       res.json({status: 0})
   })


})


//@rout get api/statement/withdrawDone
// Update withdrawDone statement
// @acess public
router.post('/Adinfo/withdrawDone', (req,res) => {

    console.log(req.body);

    try{
                const date = new Date();
                const today = date.toLocaleDateString();
                const totalPer =  parseFloat(parseFloat(req.body.Amount)-parseFloat(req.body.Total))

                Withdraw.findByIdAndUpdate({_id: req.body.statement_id},{
                    Status: "Done",
                })
                .then(() => {

                    AdInfo.findOneAndUpdate(
                        {_id: '5f7b0e53d3d3591b259c85d0' },
                        { $pull: { withdrawRequests: { Statement_ID: req.body.statement_id } } },
                        {new: true}
                        ).then((staetment) => {
                        console.log(staetment);

                        if(statements){

                                    DailyReport.findOneAndUpdate({ dateId : today},{

                                        $inc : {
                                            withdrawpercentage : parseFloat(totalPer),
                                            withdraw : parseFloat(req.body.Total)
                                        }

                                    },{new : true})
                                    .then(document => {
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
                                            withdrawpercentage: parseFloat(totalPer),
                                            funtToPinPercent : 0,
                                            //Spend 
                                            LevelOutSpend: 0,
                                            FundSharing:  0,
                                            PoolOutgo: 0,
                                            withdraw: parseFloat(req.body.Total),
                                            //Others
                                            Balance : 0,
                                            BalanceReport: [],
                                            Nothing: 0,
                                    
                                            })
                                    
                                                report.save()
                                                .then(res => {
                                                    console.log(res);
                                                    res.json({status:1,staetment})
                                                }).catch(err => { 
                                                    console.log(err.message);
                                                    res.json({status:0,staetment})
                                                })
                                        }
                                        else{
                                            res.json({status:1,staetment})
                                            
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err.message);
                                        res.json({status:0,staetment})
                                    })
                        }
                        else
                        {
                                     res.json({status:0,staetment})
                        }
                                   
                            
                    }).catch(err => {
                        console.log(err.message);
                        res.json({status:0,staetment})

                    })

                })
                .catch(err =>
                {
                        console.log(err.message);
                        res.json({status:0,staetment})
                })

    }
    catch(err)
    {
           console.log(err.message);
           res.json({status:0,staetment})
    }     

});

//@rout get api/Admin/DepositDone
// Admin auth
// @acess public
router.post('/DepositDone', (req,res) => {

    console.log(req.body);

    DepositSatements.findOneAndUpdate({ _id : req.body.userId },{
        status: true ,
        success : "Done"
    },{new : true})
    .then(user => {
        if(user){
            console.log("user:",user);
            res.json({status: 1})
        }else
        {
            console.log("else:",user);
            res.json({status: 0})
        }
    }).catch(err => {
        console.log(err);
        res.json({status: 0})
    })
   
});

//@rout get api/users
// Admin auth
// @acess public
router.post('/Auth', (req,res) => {

    console.log(req.body);

    Admin.findOne({_id: req.body._id,Pass:req.body.Pass})
    .then(user => {
        if(user){
            console.log("user:",user);
            res.json({status: 1})
        }else
        {
            console.log("else:",user);
            res.json({status: 0})
        }
    }).catch(err => {
        console.log(err);
        res.json({status: 0})
    })
   
});


//===========================================================================================
//                                 AUTO-POOL
//=============================================================================================

//@rout get api/admin/getPool-1-details
// pool one details
// @acess public
router.get('/getPoolOneDetails', (req,res) => {

    console.log(req.body);
    Autopool.find({
        poolOneCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - One - Available - details
// Admin auth
// @acess public
router.get('/getPoolOneAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool.find({
        poolOneCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - One - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolOneCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool.find({
        poolOneCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//===================================================================================================
//=======================================****** Autopool 2 ******====================================

//@rout get api/admin/getPool-2-details
// pool one details
// @acess public
router.get('/getPoolTwoDetails', (req,res) => {

    console.log(req.body);
    Autopool2.find({
        poolTwoCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - two - Available - details
// Admin auth
// @acess public
router.get('/getPoolTwoAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool2.find({
        poolTwoCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Two - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolTwoCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool2.find({
        poolTwoCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});


//test router to create daily report

//  router.post('/CreateDailyRepot',(req,res) => {

//     const date = new Date();
//     const today= date.toLocaleDateString();

//      const report =  new DailyReport({
       
//         dateId: today,
//         LevelPinsIncome:  0,
//         PoolOnePinsIncome:  0,
//         PoolTwoPinsIncome: 0,
//         PoolThreePinsIncome: 0,
//         PoolFourPinsIncome:  0,
//         PoolFivePinsIncome:  0,
//         PoolSixPinsIncome:  0,
//         PoolSevenPinsIncome: 0,
//         PoolEightPinsIncome:  0,
//         PoolNinePinsIncome:  0,
//         PoolTenPinsIncome:  0,
//         withdrawpercentage: 0,
//         funtToPinPercent : 0,
//         //Spend 
//         LevelOutSpend: 0,
//         FundSharing:  0,
//         PoolOutgo: 0,
//         withdraw: 0,
//         //Others
//         Balance : 0,
//         BalanceReport: [],
//         Nothing: 0,

//     })

//      report.save()
//      .then(res => {
//          console.log(res);
//      }).catch(err => { 
//         console.log(err);
//     })

//  })


//===================================================================================================
//=======================================****** Autopool 3 ******====================================

//@rout get api/admin/getPool-3-details
// pool one details
// @acess public
router.get('/getPoolThreeDetails', (req,res) => {

    console.log(req.body);
    Autopool3.find({
        poolThreeCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - three - Available - details
// Admin auth
// @acess public
router.get('/getPoolThreeAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool3.find({
        poolThreeCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Three - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolThreeCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool3.find({
        poolThreeCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});



//===================================================================================================
//=======================================****** Autopool 4 ******====================================

//@rout get api/admin/getPool-4-details
// pool one details
// @acess public
router.get('/getPoolFourDetails', (req,res) => {

    console.log(req.body);
    Autopool4.find({
        poolFourCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Four - Available - details
// Admin auth
// @acess public
router.get('/getPoolFourAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool4.find({
        poolFourCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Four - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolFourCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool4.find({
        poolFourCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});


//===================================================================================================
//=======================================****** Autopool 5 ******====================================

//@rout get api/admin/getPool-5-details
// pool one details
// @acess public
router.get('/getPoolFiveDetails', (req,res) => {

    console.log(req.body);
    Autopool5.find({
        poolFiveCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Five - Available - details
// Admin auth
// @acess public
router.get('/getPoolFiveAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool5.find({
        poolFiveCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Four - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolFiveCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool5.find({
        poolFiveCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//===================================================================================================
//=======================================****** Autopool 6 ******====================================

//@rout get api/admin/getPool-6-details
// pool one details
// @acess public
router.get('/getPoolSixDetails', (req,res) => {

    console.log(req.body);
    Autopool6.find({
        poolSixCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        console.log(users1);
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Six - Available - details
// Admin auth
// @acess public
router.get('/getPoolSixAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool6.find({
        poolSixCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Six - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolSixCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool6.find({
        poolSixCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});


//===================================================================================================
//=======================================****** Autopool 7 ******====================================

//@rout get api/admin/getPool-7-details
// pool one details
// @acess public
router.get('/getPoolSevenDetails', (req,res) => {

    console.log(req.body);
    Autopool7.find({
        poolSevenCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Seven - Available - details
// Admin auth
// @acess public
router.get('/getPoolSevenAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool7.find({
        poolSevenCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Seven - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolSevenCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool7.find({
        poolSevenCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//===================================================================================================
//=======================================****** Autopool 8 ******====================================

//@rout get api/admin/getPool-8-details
// pool one details
// @acess public
router.get('/getPoolEightDetails', (req,res) => {

    console.log(req.body);
    Autopool8.find({
        poolEightCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Eight - Available - details
// Admin auth
// @acess public
router.get('/getPoolEightAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool8.find({
        poolEightCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Eight - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolEightCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool8.find({
        poolEightCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//===================================================================================================
//=======================================****** Autopool 9 ******====================================

//@rout get api/admin/getPool-9-details
// pool one details
// @acess public
router.get('/getPoolNineDetails', (req,res) => {

    console.log(req.body);
    Autopool9.find({
        poolNineCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Nine - Available - details
// Admin auth
// @acess public
router.get('/getPoolNineAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool9.find({
        poolNineCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Nine - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolNineCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool9.find({
        poolNineCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//===================================================================================================
//=======================================****** Autopool 10 ******====================================

//@rout get api/admin/getPool-10-details
// pool one details
// @acess public
router.get('/getPoolTenDetails', (req,res) => {

    console.log(req.body);
    Autopool10.find({
        poolTenCompleted: false,
        levelOne: 0
    })
    .sort({date: 1})
    .select('userId date levelOne members')
    .then(users1 => {
        if(users1){
            res.json({status: 1, users1})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Ten - Available - details
// Admin auth
// @acess public
router.get('/getPoolTenAvailableDetails', (req,res) => {

    console.log(req.body);
    Autopool10.find({
        poolTenCompleted: false,
        available: true
    })
    .sort({date: 1})
    .select('userId date available levelOne')
    .then(users2 => {
        if(users2){
            res.json({status: 1, users2})
        }else{
            res.json({status: 0})
        }
    })
   
});

//@rout get api/admin/getpool - Ten - deleteuser - details
// Admin auth
// @acess public
router.get('/getPoolTenCompletedDetails', (req,res) => {

    console.log(req.body);
    Autopool10.find({
        poolTenCompleted: false,
        levelThree: 64
    })
    .then(users => {
        if(users){
            res.json({status: 1, users})
        }else{
            res.json({status: 0})
        }
    })
   
});

//=======================================================================================
//=========================   **** Autopool POSt *** ====================================
//(((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))

//@rout get api/admin/Initialize - Autopool - One
// Admin auth
// @acess public
router.post('/InitialisedAutopoolOne', (req,res) => {

   console.log("379 ::::::::::::::", req.body);
  
       
Autopool.findByIdAndUpdate({_id : req.body._id},{

       $inc: {levelOne : 4,levelOneIncome: 2},
       members: req.body.useridsArray

   },{new: true})
   .then(userone => {
             console.log(userone); 
            //update members refered ids 
        if(userone){

            Autopool.updateMany(
                {
                   userId:
                        {
                            $in: req.body.useridsArray
                        }
                },
                {
                   referedBy: userone.userId,
                   available: false
                },{new: true})
                 .then( () => 
                     {
                                   // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                
                                     Autopool.findOneAndUpdate({userId : userone.referedBy},{
                                        $inc: {
                                            levelTwo : 4,
                                            levelTwoIncome: 4
                                        }, 
                                    },{new: true}).then(twouser => {

                                        if(twouser)
                                        {
                                                        Autopool.findOneAndUpdate({userId : twouser.referedBy},{
                                                            $inc: {
                                                                levelThree : 4,
                                                                levelThreeIncome: 8
                                                            }, 
                                                        },{new: true}).then(threeuser =>{
                                                            if(threeuser)
                                                            {
                                                                res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                            }
                                                            else
                                                            {
                                                                console.log("level three");
                                                                res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                            }
                                                        })

                                        }
                                        else
                                        {
                                            console.log("Level two referal Id Not Found");
                                            res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                        }
                                                  
                                    })
                     })

         }
         else{
             console.log("No referal Id Found");
            res.json({ status: 0 , msg :  `${req.body.userid} : No referal Id Found ! Something went wrong`})
         }

    })
   
});

//@rout get api/admin/delete - Autopool - One
// Admin auth
// @acess public
router.post('/performDeleteOne', (req,res) => {

console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Rising Treasure",
        Amountadded: 116,
        pinsadded: 2,
        total: 146

    })

   

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolOne: true,
            $inc : {
                autoPoolIncome: 116
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();

                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(116)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(116),
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
                            })
                        }
                    })
                    
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
                    
                        const autopoolcopy = new Autopool({

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
                                
                         autopoolcopy.save()
                            
                    autopool.save()

                })

            }
        })

    })

    

})

//===================================================================================================
//=======================================****** Autopool 2 ******====================================

//@rout get api/admin/Initialize - Autopool - Two
// Admin auth
// @acess public
router.post('/InitialisedAutopoolTwo', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool2.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 32},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool2.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool2.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 32
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool2.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 32
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Two
 // Admin auth
 // @acess public
 router.post('/performDeleteTwo', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Wonder Treasure",
        Amountadded: 612,
        pinsadded: 2,
        total: 672

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {
            console.log("created successfully");
        Users.findOneAndUpdate({userId: req.body.userid},{

            poolTwo: true,
            $inc : {
                autoPoolIncome: parseFloat(612)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool2.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();

                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(612)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(612),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool2({

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
                    
                        const autopoolcopy = new Autopool2({

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
                                
                         autopoolcopy.save()
                            
                    autopool.save()

                })

            }
        })

    })

 
 })


//===================================================================================================
//=======================================****** Autopool 3 ******====================================

//@rout get api/admin/Initialize - Autopool - Three
// Admin auth
// @acess public
router.post('/InitialisedAutopoolThree', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool3.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 52},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool3.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool3.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 52
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool3.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 52
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong `  })
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Three
 // Admin auth
 // @acess public
 router.post('/performDeleteThree', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Master Treasure",
        Amountadded: 992,
        pinsadded: 2,
        total: 1092

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolThree: true,
            $inc : {
                autoPoolIncome: parseFloat(992)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool3.deleteOne({
                    userId: user.userId
                })
               .then(resp => {

                const date = new Date();
                const today = date.toLocaleDateString();

                DailyReport.findOneAndUpdate({ dateId : today},{
                    $inc : {
                        PoolOutgo : parseFloat(992)
                    }
                }).then(document => {
                    if(!document)
                    {
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
                            PoolOutgo: parseFloat(992),
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
                        })
                    }
                })
                
                const autopool = new Autopool3({

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
                
                    const autopoolcopy = new Autopool3({

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
                            
                     autopoolcopy.save()
                        
                autopool.save()

            })

            }
        })

    })

 
 })


//===================================================================================================
//=======================================****** Autopool 4 ******====================================


//@rout get api/admin/Initialize - Autopool - Four
// Admin auth
// @acess public
router.post('/InitialisedAutopoolFour', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool4.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 104},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool4.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool4.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 104
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool4.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 104
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Four
 // Admin auth
 // @acess public
 router.post('/performDeleteFour', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Expert Treasure",
        Amountadded: 1984,
        pinsadded: 2,
        total: 2184

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolFour: true,
            $inc : {
                autoPoolIncome: parseFloat(1984)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool4.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(1984)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(1984),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool4({
    
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
                    
                        const autopoolcopy = new Autopool4({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })

 
 })



//===================================================================================================
//=======================================****** Autopool 5 ******====================================

//@rout get api/admin/Initialize - Autopool - Five
// Admin auth
// @acess public
router.post('/InitialisedAutopoolFive', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool5.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 160},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool5.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool5.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 160
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool5.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 160
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Five
 // Admin auth
 // @acess public
 router.post('/performDeleteFive', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Billionaire Treasure",
        Amountadded: 3060,
        pinsadded: 2,
        total: 3360

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolFive: true,
            $inc : {
                autoPoolIncome: parseFloat(3060)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool5.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(3060)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(3060),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool5({
    
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
                    
                        const autopoolcopy = new Autopool5({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })

 })


//===================================================================================================
//=======================================****** Autopool 6 ******====================================

//@rout get api/admin/Initialize - Autopool - Six
// Admin auth
// @acess public
router.post('/InitialisedAutopoolSix', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool6.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 212},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool6.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool6.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 212
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool6.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 212
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Six
 // Admin auth
 // @acess public
 router.post('/performDeleteSix', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Legend Treasure",
        Amountadded: 4052,
        pinsadded: 2,
        total: 4452

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolSix: true,
            $inc : {
                autoPoolIncome: parseFloat(4052)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool6.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(4052)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(4052),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool6({
    
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
                    
                        const autopoolcopy = new Autopool6({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })
 })


//===================================================================================================
//=======================================****** Autopool 7 ******====================================

//@rout get api/admin/Initialize - Autopool - Seven
// Admin auth
// @acess public
router.post('/InitialisedAutopoolSeven', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool7.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 320},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool7.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool7.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 320
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool7.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 320
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Seven
 // Admin auth
 // @acess public
 router.post('/performDeleteSeven', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Fast-track Treasure",
        Amountadded: 6220,
        pinsadded: 2,
        total: 6720

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolSeven: true,
            $inc : {
                autoPoolIncome: parseFloat(6220)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool7.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(6220)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(6220),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool7({
    
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
                    
                        const autopoolcopy = new Autopool7({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })
 
 })


//===================================================================================================
//=======================================****** Autopool 8 ******====================================

//@rout get api/admin/Initialize - Autopool - Eight
// Admin auth
// @acess public
router.post('/InitialisedAutopoolEight', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool8.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 532},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool8.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool8.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 532
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool8.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 532
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid}  : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg :`${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong `})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Eight
 // Admin auth
 // @acess public
 router.post('/performDeleteEight', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Diamond Treasure",
        Amountadded: 10172,
        pinsadded: 2,
        total: 11172

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolEight: true,
            $inc : {
                autoPoolIncome: parseFloat(10172)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool8.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(10172)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(10172),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool8({
    
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
                    
                        const autopoolcopy = new Autopool8({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })
 
 })


//===================================================================================================
//=======================================****** Autopool 9 ******====================================

//@rout get api/admin/Initialize - Autopool - Nine
// Admin auth
// @acess public 
router.post('/InitialisedAutopoolNine', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool9.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 800},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool9.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool9.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 800
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool9.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 800
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid}  : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Nine
 // Admin auth
 // @acess public
 router.post('/performDeleteNine', (req,res) => {
 
    console.log("qwwe9",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Double-Diamond Treasure",
        Amountadded: 15300,
        pinsadded: 2,
        total: 16800

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolNine: true,
            $inc : {
                autoPoolIncome: parseFloat(15300)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool9.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(15300)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(15300),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool9({
    
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
                    
                        const autopoolcopy = new Autopool9({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })
 
 })


//===================================================================================================
//=======================================****** Autopool 10 ******====================================

//@rout get api/admin/Initialize - Autopool - Ten
// Admin auth
// @acess public
router.post('/InitialisedAutopoolTen', (req,res) => {

    console.log("379 ::::::::::::::", req.body);
   
 
 Autopool10.findByIdAndUpdate({_id : req.body._id},{
 
        $inc: {levelOne : 4,levelOneIncome: 1064},
        members: req.body.useridsArray
 
    },{new: true})
    .then(userone => {
              console.log(userone); 
             //update members refered ids 
         if(userone){
 
             Autopool10.updateMany(
                 {
                    userId:
                         {
                             $in: req.body.useridsArray
                         }
                 },
                 {
                    referedBy: userone.userId,
                    available: false
                 },{new: true})
                  .then( () => 
                      {
                                    // res.json({msg: "Hiii iiiiiiiiiiiiiiii",user1:userone.referedBy})
                                 
                                      Autopool10.findOneAndUpdate({userId : userone.referedBy},{
                                         $inc: {
                                             levelTwo : 4,
                                             levelTwoIncome: 1064
                                         }, 
                                     },{new: true}).then(twouser => {
 
                                         if(twouser)
                                         {
                                                         Autopool10.findOneAndUpdate({userId : twouser.referedBy},{
                                                             $inc: {
                                                                 levelThree : 4,
                                                                 levelThreeIncome: 1064
                                                             }, 
                                                         },{new: true}).then(threeuser =>{
                                                             if(threeuser)
                                                             {
                                                                 res.json({ status : 1 ,msg : `${req.body.userid} : Successful`})
                                                             }
                                                             else
                                                             {
                                                                 console.log("level three");
                                                                 res.json({ status : 0 ,msg : `${req.body.userid} : Level three referal Id Not Found` })
                                                             }
                                                         })
 
                                         }
                                         else
                                         {
                                             console.log("Level two referal Id Not Found");
                                             res.json({ status : 0 ,msg : `${req.body.userid} : Level two referal Id Not Found`})
                                         }
                                                   
                                     })
                      })
 
          }
          else{
              console.log("No referal Id Found");
             res.json({ status: 0 , msg : `${req.body.userid} : No referal Id Found ! Something went wrong`})
          }
 
     })
    
 });
 
 //@rout get api/admin/delete - Autopool - Ten
 // Admin auth
 // @acess public
 router.post('/performDeleteTen', (req,res) => {
 
    console.log("qwwe",req.body);
    const poolstatement = new PoolStatement({

        userId: req.body.userid,
        poolName: "Triple-Diamond Treasure",
        Amountadded: 20344,
        pinsadded: 2,
        total: 22344

    })

   function generatePins(){

        let pins = [];
     
    
        for (let i = 0; i < 2; i++) {
          
          const key = short.generate()
          pins.push(key);
      
          
        }
        console.log(pins);
        return pins;

    }

    poolstatement.save()
    .then(() => {

        Users.findOneAndUpdate({userId: req.body.userid},{

            poolTen: true,
            $inc : {
                autoPoolIncome: parseFloat(20344)
            }

        },{
            new: true
        })
        .then(user => {
            if(user){
                
                Autopool10.deleteOne({
                    userId: user.userId
                })
                .then(resp => {

                    const date = new Date();
                    const today = date.toLocaleDateString();
    
                    DailyReport.findOneAndUpdate({ dateId : today},{
                        $inc : {
                            PoolOutgo : parseFloat(20344)
                        }
                    }).then(document => {
                        if(!document)
                        {
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
                                PoolOutgo: parseFloat(20344),
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
                            })
                        }
                    })
                    
                    const autopool = new Autopool10({
    
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
                    
                        const autopoolcopy = new Autopool10({
    
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
                                
                         autopoolcopy.save()
                            
                    autopool.save()
    
                })

            }
        })

    })
 
 })



module.exports = router;