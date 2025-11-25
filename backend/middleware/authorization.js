const authorization =(role)=>{
    (req, res, next)=>{
        if(!req.user||!req.user.role !== role){
            return res.status(403).json({message:"Unauthorised, Please login"});
            next();
        }
    }
}
module.exports = authorization