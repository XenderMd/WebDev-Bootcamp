//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");
const blogDB= "mongodb://127.0.0.1:27017/blogDB";
mongoose.connect(blogDB, {useNewUrlParser:true});
const Schema = mongoose.Schema;
const postSchema = new Schema ({
  title: {
    type:String,
    required:true,
    unique:true
  },
  content: String
});
const contentSchema=new Schema({
  name:{
    type: String,
    required:true,
    unique: true},
  content:String
})

const StaticContent = mongoose.model("StaticContent", contentSchema);
const Post=mongoose.model("Post", postSchema);
let homeStartingContent="";
let aboutContent="";
let contactContent="";

StaticContent.findOne({name:"starterContent"},(err, result)=>{
  if(err){
    console.log(err);
  }else{
    if(result){
      homeStartingContent=result.content;
    }else{
      homeStartingContent="Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
      StaticContent.create(
        {
        name: "starterContent",
        content: homeStartingContent
        });
      };
    }
});

StaticContent.findOne({name:"aboutContent"},(err, result)=>{
  if(err){
    console.log(err);
  }else{
    if(result){
      aboutContent=result.content;
    }else{
      aboutContent="Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
      StaticContent.create(
        {
        name: "aboutContent",
        content: aboutContent
        });
      };
    }
});

StaticContent.findOne({name:"contactContent"},(err, result)=>{
  if(err){
    console.log(err);
  }else{
    if(result){
      contactContent=result.content;
    }else{
      contactContent="Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
      StaticContent.create(
        {
        name: "contactContent",
        content: contactContent
        });  
      };
    }
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

  Post.find((err, foundPosts)=>{
    if(err)
    {
      next(err);
    }else{
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundPosts
        });
      }
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const newPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  Post.create(newPost, err=>{
    if(err){
      console.log(err);
      next(err);
    }
    else{
      res.redirect("/");
    }
  });
});

app.get("/posts/:postID", function(req, res){

  const requestedID = req.params.postID;

  Post.findOne({_id:requestedID},(err, foundPost)=>{
    if (err)
    {
      next(err);
    }
    else{
      res.render("post", {
      id:foundPost._id,
      title: foundPost.title,
      content: foundPost.content
      });
    }
  });
});

app.get("/delete", function(req, res)
{
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
