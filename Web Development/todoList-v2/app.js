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

app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find((err, results)=>{
    if (err){
      console.log(err);
      res.send("An error occured on the server! Please try again");
    }
    else{
      if(results.length===0)
      {
        Item.insertMany(GenerateDefaultItems(), (err)=>{
          if(err) {
            console.log(err);
          }
          else{
            res.redirect("/");
          }
        })
      }
      else{
        res.render("list", {listTitle: day, newListItems: results});
      }
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const todo = new Item({
    name:itemName
  });

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    todo.save();
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

function GenerateDefaultItems() {
  const todo0 = new Item({
    name: "Do Javascript"
  });

  const todo1 = new Item({
    name: "Clean House"
  });

  const todo2 = new Item({
    name: "Cook"
  });

  return [todo0, todo1, todo2];
}
