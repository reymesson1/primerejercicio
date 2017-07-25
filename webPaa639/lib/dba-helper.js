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
            console.log(user);
              callback(result);    
          
          })
        
        db.close();
      });
  
  }  
  return {
        getUsers: getUsers,
        addUser: addUser
  }

  
  
  
}
