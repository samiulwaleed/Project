const express = require("express");
const User = require("../model/ProfileSchema");
const authenticate= require("../Middleware/authenticate")
const router = express.Router();
require('../db/conn');
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../model/ProfileSchema")
const cookieParser = require('cookie-Parser');




router.use(cookieParser()) ;

// Registration Route

router.post('/Signup',(req,res)=>{


const {Name,Email,Phone,Type,Password,CPassword} =req.body

if(!Name || !Email || !Phone || !Type || !Password || !CPassword){

    return res.status(422).json({error: "Please fill the fields properly "})
}
user.findOne({Email:Email})
.then((userExist)=>{
    if(userExist){
        return res.status(422).json({error: "Email Already Exist"})
    }

   const user = new User({Name,Email,Phone,Type,Password,CPassword})
  // const user = new User(req.body)
   
   user.save().then(()=>{

       //console.log(req.body);
       res.status(201).json({message:"User Reistered"})
       

   }).catch(err=>{console.log(err)})

})

})

//login Route
router.post('/Signin',async(req,res)=>{

    let TokenGenerated;

    //console.log(req.body);

   // res.json({ message:"Awsome"})

   try{
       const {Email,Password}=req.body;
       if(!Email || !Password){
           return res.status(400).json({error: "Please Fill the data"})
       }

       const userlogin = await User.findOne({Email:Email})

       //console.log(userlogin);

       
       if(userlogin){

        const isMatch = await bcrypt.compare(Password,userlogin.Password)
        //Creating Token and storing in cookies

        TokenGenerated =await userlogin.generateAuthToken();

        console.log(TokenGenerated)

        res.cookie("jwtoken", TokenGenerated,{
            expires: new Date(Date.now()+ 25892000000),
            httpOnly:true
        });
        
        if(!isMatch){
            res.status(400).json({message: "Invalid Credentials "})
           }else{
            res.json({message: "User Login Successful"})
           }

       }else{
        res.status(400).json({message: "Invalid Credentials"})

       }

       

   }catch(err){
       console.log(err)
   }

   

});

//get user data for about
router.get('/About' , authenticate, ( req , res )=>{
    
    res.send(req.rootUser)
});
//get user data for home and contact-us page 
router.get('/userdata', authenticate, ( req , res )=>{
    
    res.send(req.rootUser)
});

//Contact Us Page


router.post('/Contact' , authenticate, async ( req , res )=>{
    try {
        
        const {Name,Email,Phone,Subject,Message} =req.body


        if(!Name || !Email || !Phone || !Subject || !Message){
            console.log("Error in the form")
            return res.json({error:"Please fill the Form"})
        }
        const userContact=await user.findOne({_id: req.userID});
        if(userContact){
            const usermessage = await userContact.addMessage(Name,Email,Phone,Subject,Message)
            await userContact.save();
            res.status(201).json({message:"User Contact Successfully"})
        }
    } catch (error) {
        console.log(error)
    }

});

// User Logout
router.get('/logout' , ( req , res )=>{
    
    res.clearCookie('jwtoken',{path:'/'})
    console.log("User Logout")
    res.send(req.rootUser)
    
    
    
    
});
module.exports= router;