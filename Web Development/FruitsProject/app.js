const mongoose = require("mongoose");
// Connection URL
const url = 'mongodb://localhost:27017/fruitsDB';

//Connect to the MongoDB
mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser: true});

//Specify the DB Schema
const fruitSchema = new mongoose.Schema({
    name:String,
    rating:Number,
    review:String
});

const personSchema = new mongoose.Schema({
    name: String,
    age:Number
});

//Specify a model or collection I guess
const Fruit=mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

const person=new Person({
    name: "John",
    age:37
});

const kiwi=new Fruit({
    name: "kiwi",
    rating:7,
    review:"Best fruit"
});


const banana=new Fruit({
    name: "banana",
    rating:7,
    review:"So nutricious ! :) "
});

const orange=new Fruit({
    name: "orange",
    rating:7,
    review:"Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully saved all of the fruits to fruitsDB");
    }
})


//fruit.save();
//person.save();


const InsertDocuments = function (collection){
       // Insert multiple documents
       collection.insertMany([
        {
            name:"Apple",
            score:8,
            review: "Great Fruit !!"
        },
        {
            name:"Orange",
            score:6,
            review:"Kinda sour :/"
        },
        {
            name:"Banana",
            score:9,
            review:"Great Stuff"
        }
        ], function(err, r) {
        assert.equal(null, err);
        assert.equal(3, r.insertedCount);
        console.log("Inserted 3 documents into the collection");
        client.close();
      });
};

const FindMany = function(collection){
    collection.find().toArray(function(err, fruits){
        assert.equal(null, err);
        console.log("Found the following records:");
        console.log(fruits);
        client.close();
      });
};
