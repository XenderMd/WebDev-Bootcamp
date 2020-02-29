//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const dburl=("mongodb://localhost:27017/todolistDB");
const _=require("lodash");

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

  Item.find((err, results)=>{
    if (err){
      console.log(err);
      res.send("An error occured on the server! Please try again");
    }
    else{
      res.render("list", {listTitle:"Today", newListItems: results});
    }
  });
});

app.get("/:list", (req, res) => {

  customListName=_.capitalize(req.params.list);

  if (req.params.list !== "about") {
    List.findOne({ name: customListName}, (err, result) => {
      if (err) {
        console.log(err);
        res.send("There was an error on the server ! Please try again");
      } else {
        if (result) {
          res.render("list", {
            listTitle: customListName,
            newListItems: result.items
          });
        } else {
          List.create(
            {
              name: customListName,
              items: GenerateDefaultItems()
            },
            err => {
              if (err) {
                console.log(err);
                res.redirect("/");
              } else {
                res.redirect("/" + customListName);
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

  const itemName =req.body.newItem;
  const listName=req.body.list;

  const todo = new Item({
    name:itemName
  });

  if(listName==="Today"){
    todo.save();
    res.redirect("/");
  }
  else{
    List.findOne({name:listName},(err, foundList)=>{
      if(err){
        console.log(err);
        res.send("There was a server error ! Please try again");
      }else{
        if(foundList){
          foundList.items.push(todo);
          foundList.save();
          res.redirect("/"+listName);
        }
      }
    });
  }
});

app.post("/delete", function(req, res){
  
  const checkedItemId=req.body.checkBox;
  const listName = req.body.listName;

  if(listName==="Today")
  {
    Item.findByIdAndDelete(checkedItemId, (err)=>{
      if(err){
        console.log(err);
      }
    });
    res.redirect("/"); 
  }else{
    List.findOneAndUpdate({name:listName}, {$pull:{items:{_id:checkedItemId}}}, (err, foundList)=>{
      if(err)
      {
        console.log(err);
      }else{
        res.redirect("/"+listName);
      }
    })
  }
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
