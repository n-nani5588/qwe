const express = require('express');
const router = express.Router();

const Withdrawstatement= require('../../modals/WithdrawStatement');
const AdInfo = require('../../modals/AdInfo');
//user model
const User = require('../../modals/Users');





//==================================================================================================
//================================  STATEMENT ROUTES ===============================================
//==================================================================================================


//@rout get api/statement/withdraw
// Add withdraw statement
// @acess public
router.post('/withdraw', (req,res) => {

    console.log(req.body);

    try{
                async  function adInfoWiithdrawRequest(id){

                                    const w_statement= {

                                        Statement_ID: id.toString(),
                                        mainId: req.body._id,
                                        userId: req.body.userId,
                                        fname: req.body.fname,
                                        lname: req.body.lname,
                                        levelincome: req.body.level,
                                        autopool: req.body.auto,
                                        fundsharing: req.body.fund,
                                        recievedincome: req.body.recieve, 
                                        RequestedDate: new Date,
                                        Amount: req.body.Amount,
                                        total: req.body.total,
                                        BitAddress: req.body.Address,
                                        Status: "requested"


                                    }

                                 await   AdInfo.findByIdAndUpdate({_id: '5f55298f801fd918d8463f4f'},{
                                        $push: { 
                                            withdrawRequests: w_statement
                                        }
                                    },{new: true}).then(res => {
                                        console.log(res);
                                    }).catch(err => {
                                        console.log(err.message);
                                        res.json({status: 0})
                                    })
                        }

                    const withdrawStatement = new Withdrawstatement({

                        mainId: req.body._id,
                        levelIncome: req.body.level,
                        autopoolIncome: req.body.auto,
                        fundsharingIncome: req.body.fund,
                        recievedIncome: req.body.recieve,
                        userId: req.body.userId,
                        Amount: req.body.Amount,
                        Total: req.body.total,        
                        BitAddress: req.body.Address,
                        Status: "requested"

                    })

                    withdrawStatement.save()
                    .then(async (re)=> {
                                    await   adInfoWiithdrawRequest(re._id);
                                        console.log("see me:",re);

                                    await  User.findByIdAndUpdate({_id: req.body._id},{
                                            $inc: {
                                                levelIncome: -parseFloat(req.body.level),
                                                autoPoolIncome:-parseFloat(req.body.auto),
                                                fundSharingIncome:-parseFloat( req.body.fund),
                                                recievedIncome:-parseFloat(req.body.recieve),
                                            }},{new:true})
                                            .then(user => {

                                                        if(user){
                                                            res.json({status:1,user: user})
                                                        }else{
                                                            res.json({status: 0})
                                                        }

                                            }).catch(err => {
                                                console.log(err)
                                                res.json({status: 0})
                                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({status: 0})
                    })
        }
        catch(err)
        {
             console.log(err.message)
             res.json({status: 0})
        }
        

});

//@rout get api/statement/withdraw
// get withdraw statement
// @acess public
router.post('/withdrawStatementGet',(req,res)=>{

    console.log(req.body);
try{
            Withdrawstatement.find({mainId: req.body._id}).then(user =>{
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
        console.log(err.message);
        res.json({status: 0})
    }
});





module.exports = router;