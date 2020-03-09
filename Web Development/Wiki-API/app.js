const express = require("express");
const bodyParser=require ("body-parser");
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const url='mongodb://127.0.0.1/wikiDB';
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
const Schema = mongoose.Schema;
const articleSchema=new Schema ({
    title:{
        type:String,
        unique:true,
        require:true
    },
    content:{type:String}
});
const Article = mongoose.model("Article", articleSchema);

// Article.findOne({title:'API'}, (err, result)=>{
//     if(err){console.log(err);}
//     else{
//         console.log(result.content);
//     }
// });

app.route('/articles')
.get((req, res)=>{
    Article.find((err, foundArticles)=>{
        if(!err){
            res.send(foundArticles);
        }
        else{
            next(err);
        }
    })
})
.post(function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle= new Article({
        title: req.body.title,
        content:req.body.content
    });

    newArticle.save(function(err){
        if(!err){
            res.send('Succesfully added a new article');
        }
        else {
            res.send(err);
        }
    });
})
.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send('Successfully deleted all articles !');
        }else{
            res.send(err);
        }
    })
});



app.listen(3000, ()=>{
    console.log("Server has started on port 3000");
})