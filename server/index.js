const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://mikecheq5:GMxS40xnuCn8Jwp0@cluster0.sz9xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
require('./model/UserDetails');
app.use(express.json())

// Mongo db Connection
mongoose
.connect(mongoUrl)
.then(()=>{console.log("Database Connected successfully")})
.catch((e)=>{
console.log(e)
})

// Fetching Userschema from Db
const User = mongoose.model('UserInfo')
app.post("/register", async(req, res)=>{
    const {firstName, lastName, email, password, phoneNumber} = req.body;
const oldUser= await User.findOne({email:email});
if(oldUser){
    return res.send({data: "User already exist!!"})
}
    try{
        await User.create({
            firstName,
            lastName,
            email, 
            password,
            phoneNumber,
               
        });
        res.send({status:"ok",data:  "User Create" })
    }catch(error){
        res.send({status: "error", data: error})
    }
});
app.get('/', (req, res)=>{
res.send('Hello server connected')
})
app.listen(5001, console.log('server is up and running '));
