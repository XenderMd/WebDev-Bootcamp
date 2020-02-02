const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

app.get("/", function(req, res){
    let file = __dirname +"/index.html";
    console.log(file);
    res.sendFile(file);
});

app.get("/bmiCalculator", function(req, res){
    let file = __dirname+"/bmiCalculator.html";
    res.sendFile(file);
})

app.post("/bmiCalculator", function (req, res){
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let bmi=weight/Math.pow(height,2);
    console.log(height);
    res.send("Your BMI calculation is: "+Math.round(bmi));
})

app.post("/", function (req, res){

    let num1=Number(req.body.num1);
    let num2=Number(req.body.num2);
    let result= num1+num2;
    res.send("The result of the calculation is: " + result);
})

app.listen(port, ()=>{
    console.log(`Started listening on port ${port}`);
})