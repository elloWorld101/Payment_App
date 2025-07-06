const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./controllers/userRouter");
const accountRouter = require("./controllers/accountRouter");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json()); //used to read the body of the incoming JSON object 
app.use(cors());

app.use("/user", userRouter);
app.use("/account", accountRouter);

app.listen(process.env.PORT, function(){
    console.log("Listening on PORT",process.env.PORT);
})


