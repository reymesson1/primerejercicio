var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/rey';

function insertItem(collection, params, callback) {
    
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

       
          // Get the documents collection
          var col = db.collection(params);
          // Insert some documents
          col.insertOne(
            { 
                 a : 1,
                 email:"reymesson@gmail.com"
            }, 
              function(err, result) {
                callback(result);
          });
                  
           
      db.close();
    });
}

function getUsers(collection, params, callback) {
    
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

       
          // Get the documents collection
          var col = db.collection(params);
          // Insert some documents
          col.findOne(
            { 
                 param
            }, 
              function(err, result) {
                callback(result);
          });
                  
           
      db.close();
    });
}

module.exports.getUsers = getUsers;
module.exports.insertItem = insertItem;
