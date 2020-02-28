const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
    const collection=db.collection('fruits');

    //InsertDocuments(collection);
    FindMany(collection);
});


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
