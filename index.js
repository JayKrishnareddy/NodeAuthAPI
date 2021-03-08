const express = require("express");
const jwt = require("jsonwebtoken");

//Initialize app variable with express

const app = express();

app.get('/api',(req, res) => {
    res.json({ 
        message: 'Welcome to the API!',
    });
});

app.listen(5000,()=>console.log('listening on port 5000'));