//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const dburl=("mongodb://localhost:27017/todolistDB");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect(dburl, {useNewUrlParser:true, useUnifiedTopology: true});
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const todo0= new Item({
  name:"Do Javascript"
});

const todo1= new Item({
  name:"Clean House"
});

const todo2= new Item({
  name:"Cook"
});

const defaultItems = [todo0, todo1, todo2];

Item.insertMany(defaultItems, (err)=>{
    if (err){
      console.log(err);
    }
    mongoose.connection.close();
});


app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
