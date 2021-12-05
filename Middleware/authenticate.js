const jwt = require('jsonwebtoken');
const User = require("../model/ProfileSchema")

const authenticate= async(req,res,next) => {
    try {

        const Token = req.cookies.jwtoken;
        const verifyToken= jwt.verify(Token, process.env.SECRET_KEY);

        const rootUser= await User.findOne({_id:verifyToken._id,"Tokens.Token": Token})
        
        if (!rootUser){
            throw new error("User not found")
        }else{
            req.Token= Token
            req.rootUser=rootUser
            req.userID=rootUser._id

            next();
        }
    } catch (error) {
        res.status(401).send("Un authorizeed: No token Provided")
        console.log(error)
    }

}
module.exports= authenticate;
