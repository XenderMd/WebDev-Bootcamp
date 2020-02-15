const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

let items =["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function(req, res){
   
    let today=new Date();
    var options={
        weekday:"long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay:day, newListItem:items});

});


app.post("/", function(req, res){
    items.push(req.body.UserInput);
    res.redirect("/");
});



app.listen(3000, function(){
    console.log("Server started on port 3000")
});