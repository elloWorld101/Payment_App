const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./controllers/userRouter");
const accountRouter = require("./controllers/accountRouter");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json()); //used to read the body of the incoming JSON object 

const allowedOrigins = [
  "http://localhost:5173",                     // for local frontend
  "https://payment-app-iota.vercel.app"       // for deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use("/user", userRouter);
app.use("/account", accountRouter);

app.listen(process.env.PORT, function(){
    console.log("Listening on PORT",process.env.PORT);
})


