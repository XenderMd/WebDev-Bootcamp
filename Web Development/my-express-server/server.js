const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at: email@domain.com");
});

app.get("/about", function(req, res){
    res.send("This is a starter express server application, with demo data");
});

app.get("/hobbies", function(req, res){
    res.send("My hobbies are programming + gaming :)")
})

app.listen(3000, function (){
    console.log("Server started on port 3000");
});
