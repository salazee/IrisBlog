const jwt = require ("jsonwebtoken");
const dotenv =require("dotenv");
const User = require("../model/user");
const bcrypt =require("bcrypt");
const sendEmail = require('../Service/nodemailer');
// const user = require("../model/user");

dotenv.config();    

const JWT_SECRET = process.env.JWT_SECRET;

const Register = async(req,res) =>{
    try {
    
    const {name,email,password,contact} = req.body;

    const otp = Math.floor(10000 + Math.random()*10000);
    console.log("This is your OTP: ",otp);

    const salt =await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password,salt);

const newUser = new User({
    name:name,
    email:email,
    contact:contact,
    password:hashPassword,
    // role:role||"user",
    otp:otp,
});
     await newUser.save();
// newUser.save();
// res.statusa(200).send({message:"Register successfully"}); 

 sendEmail.sendMail(
      `${newUser.email}`,
      "Welcome to Our Platform",
      `<h1>Hi ${newUser.name},</h1><p>Thank you for registering on our platform!</p>
      <h1> Otp: <p> ${otp} </p></h1>
      `
    );
      
    res.status(200).json({message:" User Created successfully", data: newUser});
} catch (error) {
    console.error(error);
    res.status(500).json({message:"internal error",error});
}
    
}


const login = async(req,res) => {
    try {
       const{email,password}=req.body;
           if(!email||!password){return res.status(401).send({message:"Either password or Email is incorrect" });
        }
       const user= await User.findOne({email});
       if (!user){
         return res.status(404).json({message:"User not found", data:user})
    }

       
       const isMatch = await bcrypt.compare(password, user.password) 
       if(!isMatch){return res.status(400).json({message:"Incorrect Password"});
    }
       
       const token =jwt.sign({
        id:user._id, email:user.email,  role:user.role
       },
        JWT_SECRET,
       {expiresIn:"1h"}
    );
    res.status(200).json({message:"Login Successfully", token}) ;
    try {
        sendEmail.sendMail(
        `${user.email}`,
        "Login Notification",
        "<h1> You have successfully logged in to your account.</h1>",
    );
    } catch (mailError) {
     console.log("Login failed: ", mailError);
    }
 
    } catch (error) {
console.error("Login not successful" , error)
        res.status(500).json({message:'Invalid Parameters'})
    }
     
}
const getUser = async(req,res)=>{
    const getuser = await User.find();
    {
        return res.status(200).send({message:"User gotten successfully", getuser})
    }
}


module.exports = {Register,login, getUser}