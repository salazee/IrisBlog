const jwt = require ("jsonwebtoken");
const dotenv =require("dotenv");
const User = require("../model/user");
const bcrypt =require("bcrypt");
const sendEmail = require('../Service/nodemailer');
const crypto = require('crypto');
// const user = require("../model/user");

dotenv.config();    
 JWT_SECRET = process.env.JWT_SECRET;

const Register = async(req,res) =>{
    try {
    
    const {name,email,password,confirmPassword,role} = req.body;

    if (!name||!email||!password||!role){
        return res.status(401).send({message:"Invalid Parameters"})}

        //check for existing user
 const existing = await User.findOne({ email });

    if (existing) {
    return res.status(409).send({message:'Email already registered.'})   
    }

    const otp = String(Math.floor(100000 + Math.random()*900000));
    console.log("This is your OTP: ",otp);

    const salt =await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password,salt);

const newUser = new User({
    name:name,
    email:email,
    confirmPassword:confirmPassword,
    password:hashPassword,
    role:role||"user",
    otp:otp,
    isVerified:false,
    otpExpires: Date.now() + 10*60*1000,

});
     await newUser.save();
// newUser.save();
// res.statusa(200).send({message:"Register successfully"}); 

 sendEmail.sendMail(
      `${newUser.email}`,
      "Welcome to Our Blogging Platform",
      `<h1>Hi ${newUser.name},</h1><p>Thank you for registering on our platform!</p>
      <h1> Otp: <p> ${otp} </p></h1>
      <p>Enter this OTP to verify your email.</p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>Please do not share this OTP with anyone.</p>
      `
    );
      
    res.status(200).json({message:" User Created successfully", data: newUser});
} catch (error) {
    console.error(error);
    res.status(500).json({message:"internal error",error: error.message});
}
    
}


const login = async(req,res) => {
    try {
       const{email,password}=req.body;

if (!email || !password) {
  return res.status(401).json({ message: "Email and password required" });
}       

    const user = await User.findOne({
  email: email.toLowerCase().trim()
});
       if (!user){
         return res.status(404).json({message:"User does not exist", data:user})
    }

    if (!user.isVerified) {
        return res.status(401).json({ message: "Please verify your email first" });
      }

      //comparing password
       const isMatch = await bcrypt.compare(password, user.password) 
       if(!isMatch){
        return res.status(400).json({message:"Incorrect Password"});
    }
       
    //Generating JWT Token
       const token =jwt.sign({
        id:user._id, email:user.email,  role:user.role
       },
        JWT_SECRET,
       {expiresIn:"1h"}
    );
    res.status(200).json({message:"Login Successfully", token}) ;
    // try {
    //     sendEmail.sendMail(
    //     `${user.email}`,
    //     "Login Notification",
    //     "<h1> You have successfully logged in to your account.</h1>",
    // );
    // } catch (mailError) {
    //  console.log("Login failed: ", mailError);
    // }
 
    } catch (error) {
console.error("Login not successful" , error)
        res.status(500).json({message:'Invalid Parameters'})
    }
     
}

const VerifyEmail = async(req,res) =>{
    try {
        const {email, otp} = req.body;
        if(!email || !otp){
            return res.status(400).json({message:"Email and OTP are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.otp !== otp){
            return res.status(400).json({message:"Invalid OTP"});
        }
        if (user.isVerified){
            return res.status(400).json({message:"Email already verified"});
        }  
        if(user.otpExpires < Date.now()){       
            return res.status(400).json({message:"OTP has expired"});
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({message:"Email verified successfully"});
    } catch (error) {
        console.error("Email verification failed: ", error);
        res.status(500).json({message:"Internal server error", error:error.message});
    }   
};

const ResendOtp = async(req,res) =>{
    try {
        const {email} = req.body;   
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }   
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }   
        if(user.isVerified){    
            return res.status(400).json({message:"Email already verified"});
        }
        const otp = Math.floor(100000 + Math.random()*900000);
        user.otp = otp;
        user.otpExpires = Date.now() + 10*60*1000;  
        await user.save();

        await sendEmail.sendMail(
            `${user.email}`,
            "Your New Verification OTP",       
            `<h1>Hi ${user.name},</h1><p>Your New OTP is: <strong>${otp}</strong></p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Please do not share this OTP with anyone.</p>`,
        );

        res.status(200).json({message:"OTP resent successfully"});
    } catch (error) {
        console.error("Resend OTP failed: ", error);
        res.status(500).json({message:"Internal server error", error:error.message});
    }   
};  

const forgotPassword = async (req, res) => {
    try {
     const { email } = req.body;
   
     if (!email) {
       return res.status(400).json({ message: "Email is required" });
     }
     const user = await User.findOne({ email });
     if (!user) return res.status(404).json({ message: 'User not found' });
   
     const resetToken = crypto.randomBytes(32).toString('hex');
   
     user.resetPasswordToken = crypto
       .createHash('sha256')
       .update(resetToken)
       .digest('hex');
   
     user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
   
     await user.save();
   
     const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
   
     await sendEmail.sendMail({
       from: `"Property Market" <${process.env.EMAIL_USER}>`,
       to: user.email,
       subject: 'Reset your password',
       html: `<p>Click here to reset your password: ${resetUrl}</p>`,
     });
   
     res.json({ message: 'Password reset link sent' });
    } catch (error) {
     console.error('Forgot Password Error:', error);
     res.status(500).json({ message: 'Email not sent' });
    }
   
   };
   

   
const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: 'Token invalid or expired' });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  // user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: 'Password reset successful' });
};



const getUser = async(req,res)=>{
    const getuser = await User.find();
    {
        return res.status(200).send({message:"User gotten successfully", getuser})
    }
}
const Logout = async (req, res) => {
    try {
      return res.status(200).json({
        message: "Logged out successfully."
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {Register,login,VerifyEmail,ResendOtp,getUser,Logout,forgotPassword,resetPassword};