const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User",  UserSchema);
const Account = mongoose.model("Account", AccountSchema);


module.exports = {
    User: User,
    Account: Account, 
}