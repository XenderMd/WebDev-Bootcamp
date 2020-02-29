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

const listSchema={
  name: String,
  items:[itemsSchema]
}

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

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

app.get("/:list", (req, res) => {
  if (req.params.list !== "about") {
    List.findOne({ name: req.params.list }, (err, result) => {
      if (err) {
        console.log(err);
        res.send("There was an error on the server ! Please try again");
      } else {
        if (result) {
          res.render("list", {
            listTitle: req.params.list,
            newListItems: result.items
          });
        } else {
          List.create(
            {
              name: req.params.list,
              items: GenerateDefaultItems()
            },
            err => {
              if (err) {
                console.log(err);
                res.redirect("/");
              } else {
                res.redirect("/" + req.params.list);
              }
            }
          );
        }
      }
    });
  }
  else {
    res.render("about");
  }
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

app.post("/delete", function(req, res){
  const checkedItemId=req.body.checkBox;
  Item.findByIdAndDelete(checkedItemId, (err)=>{
    if(err){
      console.log(err);
    }
  });
  res.redirect("/");
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