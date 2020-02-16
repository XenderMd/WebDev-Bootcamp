const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items =["Buy Food", "Cook Food", "Eat Food"];
let workItems=[];

app.get("/", function(req, res){
   
    let today=new Date();
    var options={
        weekday:"long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle:day, newListItems:items});

});


app.get("/work", function(req, res){
    res.render("list", {listTitle:"Work List", newListItems:workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});


app.post("/work", function(res, req){
    items.push(req.body.UserInput);
    res.redirect("/work");
})

app.post("/", function(req, res){
    console.log(req.body);

    if(req.body.list==="Work List")
    {
        workItems.push(req.body.UserInput);
        res.redirect("/work");
    }
    else {
        items.push(req.body.UserInput);
        res.redirect("/");
    }
});



app.listen(3000, function(){
    console.log("Server started on port 3000")
});