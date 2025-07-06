const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function accountMiddleware(req,res,next){
     //I can get the userId by extracting the headers 
     const newArray = req.headers.authorization;
     const token = newArray.split(" ")[1];

     if(token && newArray.startsWith("Bearer")){
         try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //I have got the object id of the user; now if this matches with the db then it is
         //authenticated and I can show him the balance too
            if(decoded){
               req.user = decoded;
               next();
            }
            
         }catch(error){
            return res.json({
               msg: "ACCESS DENIED"
            })
         }
     }else{
      return res.json({
         msg: "Sign Up First"
      });
     }
    
     
     

}
module.exports = accountMiddleware;