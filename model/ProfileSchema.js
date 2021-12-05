const mongoose = require("mongoose")
const bcrypt = require ('bcryptjs')
const jwt = require("jsonwebtoken")

const ProfileSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,

    },

    Email:{
        type: String,
        required: true,

    },
    Phone:{
        type: Number,
        required: true,

    },
    Type:{
        type: String,
        required: true,

    },

    Password:{
        type: String,
        required: true
    },
    CPassword:{
        type: String,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now

    },
    Messages:
        [
            {
                Name:{
                    type: String,
                    required: true,
            
                },
            
                Email:{
                    type: String,
                    required: true,
            
                },
                Phone:{
                    type: Number,
                    required: true,
            
                },
                Subject:{
                    type: String,
                    required: true,
            
                },
                Message:{
                    type: String,
                    required: true,
            
                }
            }

        ],
    Tokens:
        [
            {
            Token: {
                type: String,
                required: true
            }
            }

        ]
})



//Encryption of Password

ProfileSchema.pre("save",async function (next){


    if(this.isModified('Password'))
    {    
      //  this.Password= bcrypt.hash(this.Password,12)
       // this.CPassword= bcrypt.hash(this.CPassword,12)

        const salt = bcrypt.genSaltSync(10 );
        this.Password=bcrypt.hashSync(this.Password,salt);
        this.CPassword=bcrypt.hashSync(this.CPassword,salt);
    }
    next();

})

// enerating Auth Tokens
ProfileSchema.methods.generateAuthToken = async function (){
    try {
        let TokenGenerated = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        
        this.Tokens= this.Tokens.concat({Token:TokenGenerated})
        await this.save();
        return TokenGenerated;
    } catch (error) {
        console.log(error)
        
    }
}
//Storing The Message
ProfileSchema.methods.addMessage = async function (Name,Email,Phone,Subject,Message){
    try {
        this.Messages= this.Messages.concat({Name,Email,Phone,Subject,Message})
        await this.save();
        return this.Messages; 
    } catch (error) {
        console.log();
    }

}

const User = mongoose.model("USER",ProfileSchema);

module.exports= User;