const dotenv = require("dotenv")
const express =require ('express')
const mongoose = require("mongoose")
const app = express();
dotenv.config({path: 'server/config.env'});

require('./db/conn')

app.use(express.json());
//const User= require("./model/ProfileSchema")
app.use(require('./Router/auth'));



const PORT =process.env.PORT || 5000;



/*app.get('/about' , ( req , res )=>{
    res.send(`Hello from the About`);

});*/

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));

}

app.listen(PORT,()=>{
    console.log(`Server is Running on port no ${PORT}`)
})