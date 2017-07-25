module.exports = function(){ 
    
    function addUser(user){  
        
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/rey";
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          //var myobj = { email: "Company Inc", address: "Highway 37" };
          db.collection("users").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            db.close();
          });
        });  
     }  
    function getUsers(user,callback){    
          var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/rey";
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;        
              db.collection("users").find(user).toArray(function(err,result){            
                  callback(result);   
              })        
            db.close();
          });    
    }
    
  function addOrder(order){
      
      var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/rey";
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          //var myobj = { email: "Company Inc", address: "Highway 37" };
          db.collection("orders").insertOne(order, function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            db.close();
          });
        });    
   }
    
   function getOrders(callback){
       
       var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/rey";
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;        
              db.collection("orders").find({}).toArray(function(err,result){            
                  callback(result);   
              })        
            db.close();
          });      
   }
    
   function getOrdersFind(order){
       
       var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/rey";
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;        
              db.collection("orders").find(order).toArray(function(err,result){            
                  callback(result);   
              })        
            db.close();
          });      
   }
    
    
   
  return {
        getUsers: getUsers,
        addUser: addUser,
        getOrders: getOrders,
        addOrder: addOrder,
        getOrdersFind: getOrdersFind
  }  
}
