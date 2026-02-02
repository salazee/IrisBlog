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
            require:true, 
            minlength:6
        },
        contact:{
            type:Number,
            require:false
        },
        role:{
            type:String,
            enum:["reader","admin","editor"],
            default:"reader",
            require:true
        },
        bio:{
            type:String,
            default:""

        },
        otp:{
            type:String,
            
        },
        isVerified:{
            type:Boolean,
            default:false   
        },
        otpExpires:{
            type:Date,
        },
        resetPasswordToken:{
            type:String,
        },
        resetPasswordExpires:{
            type:Date,      
        }


},
{timestamps:true});
module.exports=mongoose.model( "User", userSchema);