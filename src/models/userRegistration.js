const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    //schema
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required:false
    }
})
//collection
const UserRegister = new mongoose.model("UserRegister", userSchema)
module.exports = UserRegister;