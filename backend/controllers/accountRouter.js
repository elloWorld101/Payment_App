const express = require("express");
const router = express.Router();
const { Account} = require("../db/database");
const accountMiddleware = require("../middlewares/account");
const { default: mongoose } = require("mongoose");


router.get("/balance", accountMiddleware, async function(req,res){
    const userId = req.user;
    
    const response = await Account.findOne({
        userId: userId //passing objectId as a string
    })

    if(response){
        return res.json({
            balance: response.balance
        })
    }else{
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

router.post("/transfer", accountMiddleware, async function(req,res){
    const from = req.user; //userId of the person who is sending i.e, from wala
    const to = req.body.to; //userId of the person jisko bhejna hai 
    const amount = req.body.amount;

    const session = await mongoose.startSession();

    session.startTransaction();
    const recieverExists =await Account.find({
        userId: to
    }).session(session);

    const sender = await Account.findOne({
        userId: from
    }).session(session);

    if(sender.balance >=amount){

        if(recieverExists){

            const debit = await Account.updateOne({
                userId: from
            },{
                $inc: {
                    balance: -amount
                }
            }).session(session);

            const credit = await Account.updateOne({
                userId: to
            },{
                $inc:{
                    balance: amount
                }
            }).session(session);

            await session.commitTransaction();
            if(debit && credit){
                return res.json({
                    msg: "Transfer successfull"
                })
            }
            session.endSession();

        }
    }else{
        return res.json({
            msg: "Not enough money"
        })
    }
    
})


module.exports = router