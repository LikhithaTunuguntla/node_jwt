require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post("/login",(req,res)=>{
    const user = {
        id:1,
        name: "Likhitha",
        email:"likhitha@gmail.com"
    }
    const token = jwt.sign({user},process.env.SECRET_KEY,{expiresIn: '1000s'});
    res.json(token);
});
app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData)=>{
        if(err){
            res.send("Token Invalid");
        }else{
        res.json({
            message: "profile accessed",
            authData
        })
     }
    })
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader!== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send("Token is Not Valid")
    }
};

app.listen(3000,()=>{
    console.log("App Running");
});
