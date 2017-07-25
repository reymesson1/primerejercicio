
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
    
   function getOrdersFind(order, callback){
       
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
    
   function setOrders(idOrder, callback){
       
       var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://127.0.0.1:27017/rey";

        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          
          var newValue = {"id":idOrder};
          //db.collection("orders").updateOne({"id":27},{"$set":{"status":"cancelled"}}, function(err, res) {                           
          db.collection("orders").updateOne({"id":27},{"$set":{"status":"cancelled"}}, function(err, res) {              
            if (err) throw err;              
             
            callback(res);
            db.close();
          });
        });
   }
   
   return {
        getUsers: getUsers,
        addUser: addUser,
        getOrders: getOrders,
        addOrder: addOrder,
        getOrdersFind: getOrdersFind,
        setOrders: setOrders
   }  
}
