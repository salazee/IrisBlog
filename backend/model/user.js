const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
        name:{
            type:String,
            
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            require:true
        },
        contact:{
            type:Number,
            require:false
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user",
            require:true
        },
        bio:{
            type:String,
            default:""

        },
        otp:{
            type:String,
            require:false,
        }
    
})
module.exports=mongoose.model( "User", userSchema);