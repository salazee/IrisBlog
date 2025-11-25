const jwt =require("jsonwebtoken");
const User = require("../model/user");

const AuthGateKeeper = async(req, res,next) =>{
    const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
    // if(!token){
    //     return res.status(401).json({message:"Unauthorised:No token provided"});
    
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
                req.user = { id: decode.id, name: decode.name, email: decode.email, role: decode.role };
            return res.status(401).json({message:"Unauthorised, Access Denied"});
        }
        req.user = await User.findById(decode.id).select('-password');//This is to  prevent password from being fetched
        
        next();
    } catch (error) {
        console.error("Error decoding token", error);
          return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = AuthGateKeeper;