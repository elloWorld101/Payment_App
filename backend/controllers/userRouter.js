const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/database");
const  userMiddleware  = require("../middlewares/user")
const { UserSignup, UserSignin, UserUpdate } = require("../zod/inputs");
const dotenv = require("dotenv");
dotenv.config();

router.use(express.json());

router.get("/me", async function(req,res){

    const authArray = req.headers.authorization.split(" ");
    const token = authArray[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userCheck = await User.findById({
            _id: decoded
        })

        if(userCheck){
            return res.json({
                msg: "Navigate to signin"
            })
        }else{
            return res.json({
                msg: "Navigate to signup"
            })
        }

    }catch{
        return res.json({
            msg: "Navigate to signup"
        })
    }

})

router.post("/signup", async function(req,res){
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName  =  req.body.lastName;
    const password = req.body.password;

    const inputCheck = UserSignup.safeParse({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
    })

    if(inputCheck.success == true){

        const check = await User.findOne({
            username: username
        })
        if(check){
            return res.json({
                msg: "Email already exists"
            })
        }

        const hashedPassword = await argon2.hash(password);
        const response = await User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        });

        if(response){
            const balance = Math.floor(Math.random()*10000) + 1; //as Math.random includes 0
            const id = response._id.toString();

            const AccountResponse = await Account.create({
                userId: response._id,
                balance: balance
            })
            
            if(AccountResponse){
                    const token = jwt.sign(id, process.env.JWT_SECRET);
                    return res.status(200).json({
                    msg: "User created successfully",
                    token: token
                })
            }else{
                return res.status(500).json({
                    msg: "Account Balance not initialized"
                })
            }

            
        }else{
            return res.status(500).json({
                msg: "User not created"
            })
        }
    }else{
        return res.json({
            msg: "Incorrect inputs"
        })
    }

})

router.post("/signin", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const inputCheck = UserSignin.safeParse({
        username: username,
        password: password
    })

    if(inputCheck.success){
        const response = await User.findOne({
            username: username
        })
        if(response){
            const id = response._id.toString(); //_id is an object and needs to be converted to string, then only it can be processed further    
            if(await argon2.verify(response.password, password)){
                const token = jwt.sign(id, process.env.JWT_SECRET);
                return res.status(200).json({
                    msg: "Token successfully generated",
                    token: token
                    })
            }
        }else{
            return res.json({
                msg: "Wrong credentials"
            })
        }

    }else{
        return res.json({
            msg: "Please signup first",
        })
    }
})

router.put("/update", userMiddleware ,async function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    
    let hashedPassword;
    if(password){
        hashedPassword = await argon2.hash(password);
    }

    const check = UserUpdate.safeParse({
        firstName: firstName,
        lastName: lastName,
        password: password
    });

    if(check.success == true){
        const response = await User.findOneAndUpdate({
            _id: req.user
        },{ //req.user is the object id of the user
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        }); //finding the user from it's object id as the body has the updated values
    
        if(response){
            return res.status(200).json({
                msg: "Updated successfully"
            })
        }else{
            return res.json({
                msg: "Error while updating"
            })
        }
    }else{
        return res.json({
            msg: "Not updated you fool"
        })
    }   

})


router.get("/users", userMiddleware, async function(req,res){
    const filter = req.query.filter || ""; 

    const accountOwner = await User.findById({
        _id: req.user
    })
    
    const box = accountOwner.firstName[0]
    const details = {
        box: box,
        name: accountOwner.firstName
    }

    const users = await User.find({
        _id: {
            $ne: req.user //this will exclude the accountOwner ne = not equal
        },
        $or: [{
            firstName: new RegExp(filter, "i") // ,'i' makes it case insensitive --> M-1
        },{
            lastName: {
                "$regex": filter, //M-2
                "$options": "i"
            } 
        }]
    })


    //copying the elements in a new array and then printing would be very time consuming

    if(users){
        return res.status(200).json({
            accountHolder: details,
            Users: users.map(function(user){
            return{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }})
        })    
    }

    
})



module.exports = router;
