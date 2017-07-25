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
var menuAJAX = require('./lib/ajaxMenu.js');

var db = require('./lib/db-helper')();
var dba = require('./lib/dba-helper')();


var pizza = [{"id":1,"user":"reymesson@gmail.com","items":[{ "id":"1","name":"Tradicional","price":200 },{ "id":"2","name":"Mozarella","price":200 },{ "id":"3","name":"BBQ","price":100 },{ "id":"4","name":"Maiz","price":200 }],"date":"21/07/2017 11:27:05","status":"active",discount:0,"total":600}];
var pizza1 = [{"id":1,"user":"reymesson@gmail.com","items":[{ "id":"1","name":"Tradicional","price":200 },{ "id":"2","name":"Mozarella","price":200},{ "id":"3","name":"BBQ","price":100},{ "id":"4","name":"Maiz","price":200}],"date":"21/07/2017 11:27:05","status":"active","discount":15,"total":600}];
                
                
db.addOrder({"id":1,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":2,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza1,"total":600,"status":"active","discount":15});
db.addOrder({"id":3,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":4,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":5,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":6,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":7,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});
db.addOrder({"id":8,"date":"21/07/2017 11:27:04","user":"admin@gmail.com","pizza":pizza, "total":600,"status":"active","discount":0});

menuAJAX(app);
appRoute(app, db);
reorderRoute(app, db, dba);
dealsRoute(app, db);
neworderRoute(app, db, dba);
loginRoute(app, db, dba);
registrationRoute(app, db, dba);
checkoutRoute(app, db);
logoutRoute(app, db);
esteroideHelpers(app, db);
microservice(app,db);

app.listen('6719', function(){

	console.log('Listening from 6719...');
});
