const express = require("express");
const jwt = require("jsonwebtoken");

//Initialize app variable with express

const app = express();

//Get Method

app.get('/api',(req, res) => {
    res.json({ 
        message: 'Welcome to the API!',
    });
});

app.post('/api/validate',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Validated',
                authData
            });
        }
    });
});
app.post('/api/Login',(req, res) => {
    //Mock user
    const user ={
        username: 'jk',
        email: 'jaykrishnareddy@gmail.com'
    }
    jwt.sign({user:user},'secretkey',{expiresIn: '30s'},(err,token)=>{
        res.json({token})
    })
})

//Access token
//Authorization : Bearer <access token>y

//Verify Token
function verifyToken(req, res,next) {
    //Get Auth header value
    const bearerHearder = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHearder != 'undefined'){
        //split at the space
        const bearer = bearerHearder.split(' ');
        //Get the token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        //Next middleware
        next();

    }else{
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000,()=>console.log('listening on port 5000'));