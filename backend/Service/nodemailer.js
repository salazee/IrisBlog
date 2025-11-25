const nodemailer =require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false, //false for all port except port 457
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
    
});
//   console.log("email user:", process.env.EMAIL_USER);
//     console.log("password:", process.env.EMAIL_PASS)

//the purpose of the block of code below is to wrap the code above in ASYNC so that we can use await


const sendMail = async (to, subject, html) =>{
    try {
        const info = await transporter.sendMail({
            from:`${process.env.EMAIL_USER}`,
            to,
            subject, 
           html,
        });
        console.log("Email sent:" , info);
        return info;
    } catch (error) {
        console.error("error sending email: ", error);
    }
}
module.exports ={sendMail};