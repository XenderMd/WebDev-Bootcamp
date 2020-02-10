const express = require('express');
const request = require ('request');
const bodyParser = require('body-parser');

const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//MAIL Chimp API Key
// 57b114f076cbfaa65b1d3fec4339b8c1-us4

// MAIL Chimp Unique ID
//8573918afa

// curl --request GET \
// --url 'https://<dc>.api.mailchimp.com/3.0/' \
// --user 'anystring:<your_apikey>'

// https://us4.api.mailchimp.com/3.0/lists/{list_id}/members

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/', (req, res)=>{
    console.log(req.body);
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let email=req.body.email;

    let data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    let jasonData = JSON.stringify(data);
    
    let options ={
        url:"https://us4.api.mailchimp.com/3.0/lists/8573918afa",
        method: "POST",
        headers:{
            "Authorization": "XenderMD 57b114f076cbfaa65b1d3fec4339b8c1-us4"
        },
        body:jasonData
    };

    request(options, function(error, response, body){
        if(error){
            console.log(response.statusCode);
            console.log(error);
            //res.send("Subscription not successul - error on the server !");
        }
        else{
           //res.send("Subscription successul !");
        }
        console.log(response.statusCode);
    });

    res.send("Subscription successul !");
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})