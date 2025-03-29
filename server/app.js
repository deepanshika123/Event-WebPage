const bodyParser = require('body-parser');
const { publicDecrypt } = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { StringDecoder } = require('string_decoder');

const app = express();
app.use(express.json()); 

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/public/index.html');
    
})
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', { 
    useNewUrlParser: true,  
})
.then(() => console.log("MongoDB is connected"))
.catch(err => console.error("MongoDB connection error:", err));

const Schema = mongoose.Schema;

const dataschema = new Schema({
    fullName:String,
    email:String,
    gender: String,
    branch:String,
    phone: String,
});

const Data = mongoose.model('Data' , dataschema)

app.post('/submit',async(req,res)=>{
    const{fullName,email,gender,branch,phone}=req.body;
    const newData = new Data({
        fullName,
        email,
        gender,
        branch,
        phone,
    });

    await newData.save();
     res.status(200).json({ message: "Data Submitted Successfully" });
    res.send("Data Submitted Successfully");
})


app.listen(3000,()=>{
    console.log("server is running");
})



