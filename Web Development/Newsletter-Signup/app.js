const express = require('express');
const request = require ('request');
const bodyParser = require('body-parser');

const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/', (req, res)=>{
    console.log(req.body);
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})