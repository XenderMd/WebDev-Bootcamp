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
    let amount=Number(req.body.amount);
    
    let options={
        url: `https://api.alternative.me/v1/ticker/${crypto}`,
        method:"GET",
        qs:{
            convert: fiat
        }
    }
    
    request(options, function(error, response, body){
        
        let apiResponse='';
        
        if (response.statusCode === 200)
        {
            let data = JSON.parse(body);
            let keys= Object.keys(data[0]);
            let lastUpdate = new Date(data[0].last_updated*1000);
            
            res.write(`<p> Last update at ${lastUpdate.getHours()}: ${lastUpdate.getMinutes()} UTC</p>`);

            if (fiat==="USD")
            {
                apiResponse=`<h1>The current value of ${amount} ${crypto.toUpperCase()} equals ${Number(data[0][keys[4]]) * amount} ${fiat.toUpperCase()}</h1>`
            }
            else
            {
                apiResponse=`<h1>The current value of ${amount} ${crypto.toUpperCase()} equals ${Number(data[0][keys[15]]) * amount} ${fiat.toUpperCase()}</h1>`
            }
            
        }
        else {
            apiResponse=`The requested data is currently not available`;
        }

        res.write(apiResponse);
        res.send();
    ;})
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})