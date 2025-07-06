const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


function userMiddleware(req, res, next){

    const authArray = req.headers.authorization.split(" ");
    const token = authArray[1];
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //this is the object id of the user

        next();

    }catch(err){
        res.status(403).json({
            msg: "Access denied"
        })
    }
    
}


module.exports = userMiddleware;