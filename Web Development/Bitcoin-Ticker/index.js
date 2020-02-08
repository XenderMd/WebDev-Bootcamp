const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    let crypto =req.body.crypto;
    let fiat = req.body.fiat;
    let url = `https://api.alternative.me/v1/ticker/${crypto}/?convert=${fiat}`

    request(url, function(error, response, body){
        
        let apiResponse='';
        
        if (response.statusCode === 200)
        {
            let data = JSON.parse(body);
            let keys= Object.keys(data[0]);
            if (fiat==="USD")
            {
                apiResponse=`The current value of 1 ${crypto.toUpperCase()} equals ${data[0][keys[4]]} ${fiat.toUpperCase()}`
            }
            else
            {
                apiResponse=`The current value of 1 ${crypto.toUpperCase()} equals ${data[0][keys[15]]} ${fiat.toUpperCase()}`
            }
            
        }
        else {
            apiResponse=`The requested data is currently not available`;
        }
        res.send(apiResponse);
    ;})
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})