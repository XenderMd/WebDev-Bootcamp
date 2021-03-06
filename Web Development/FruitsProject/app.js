const mongoose = require("mongoose");
// Connection URL
const url = 'mongodb://localhost:27017/fruitsDB';

//Connect to the MongoDB
mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser: true});

//Specify the DB Schema
const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'the fruit name is not defined !']
    },
    rating:{
        type:Number,
        min: 1,
        max: 10
    },
    review:String
});

const personSchema = new mongoose.Schema({
    name: String,
    age:Number,
    favouriteFruit: fruitSchema
});

//Specify a model or collection I guess
const Fruit=mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);


// Insert Fruits
// const fruit = new Fruit({
//     name:"Peach",
//     rating:34,
//     review:"The best fruit there is !"
// });

const fruit = new Fruit({
    name:"Lemon",
    rating:9,
    review:"Super sour fruit!"
});

fruit.save();

const person = new Person ({
    name: "John",
    age:37,
    favouriteFruit: fruit
})

person.save();

//mongoose.connection.close();


//fruit.save();


// Fruit.find(function(err, fruits){
//     if (err){
//         console.log(err);
//     }
//     else{
//         fruits.forEach((item, index)=>{
//             console.log(item.name);
//         });
//     }
//     mongoose.connection.close();
// })

// Fruit.updateOne({_id:"5e5911eecacfe12d006370a6"}, {rating:10}, function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else {
//         console.log("Update successful");
//     }
//     mongoose.connection.close();
// });

// Fruit.deleteOne({name:"Apple"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Item succesfully deleted !");
//     };
//     mongoose.connection.close();
// })

// Person.deleteOne({name:"John"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Item succesfully deleted !");
//     };
//     mongoose.connection.close();
// })



// const InsertDocuments = function (collection){
//        // Insert multiple documents
//        collection.insertMany([
//         {
//             name:"Apple",
//             score:8,
//             review: "Great Fruit !!"
//         },
//         {
//             name:"Orange",
//             score:6,
//             review:"Kinda sour :/"
//         },
//         {
//             name:"Banana",
//             score:9,
//             review:"Great Stuff"
//         }
//         ], function(err, r) {
//         assert.equal(null, err);
//         assert.equal(3, r.insertedCount);
//         console.log("Inserted 3 documents into the collection");
//         client.close();
//       });
// };

// const FindMany = function(collection){
//     collection.find().toArray(function(err, fruits){
//         assert.equal(null, err);
//         console.log("Found the following records:");
//         console.log(fruits);
//         client.close();
//       });
// };
