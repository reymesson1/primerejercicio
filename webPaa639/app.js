var express = require('express');
    
var app = express();

app.set('view engine','html');


var appRoute = require('./router/app.route.js');
var reorderRoute = require('./router/reorder.js');
var dealsRoute = require('./router/deals.js');
var neworderRoute = require('./router/neworder.js');
var loginRoute = require('./router/login.js');
var registrationRoute = require('./router/registration.js');
var checkoutRoute = require('./router/checkout.js');
var logoutRoute = require('./router/logout.route.js');
var esteroideHelpers = require('./lib/esteroide.js');
var microservice = require('./lib/microservice');

var db = require('./lib/db-helper.js')();

var pizza = [{"id":1,"user":"reymesson@gmail.com","items":[{ "id":"1","name":"Tradicional","price":200,"discount":"15" },{ "id":"2","name":"Mozarella","price":200,"discount":"10" },{ "id":"3","name":"BBQ","price":100,"discount":"5" },{ "id":"4","name":"Maiz","price":200,"discount":"2" }],"date":"21/07/2017 11:27:04","status":"offer","total":600}];
                
                
db.addOrder({"id":1,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});
db.addOrder({"id":2,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":16});
db.addOrder({"id":3,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});
db.addOrder({"id":4,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});
db.addOrder({"id":5,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":17});
db.addOrder({"id":6,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});
db.addOrder({"id":7,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});
db.addOrder({"id":8,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"offer","discount":10});

db.addOrder({"id":9,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":10,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":11,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":12,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":13,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":14,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":15,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});
db.addOrder({"id":16,"date":"21/07/2017 11:27:04","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active","discount":0});


db.addUser({email:"reymesson@gmail.com",password:"1234"});




appRoute(app, db);
reorderRoute(app, db);
dealsRoute(app, db);
neworderRoute(app, db);
loginRoute(app, db);
registrationRoute(app, db);
checkoutRoute(app, db);
logoutRoute(app, db);
esteroideHelpers(app, db);
microservice(app,db);

app.listen('6719', function(){

	console.log('Listening from 8081...');
});
