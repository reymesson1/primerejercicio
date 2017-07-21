var express = require('express');
    
var app = express();

app.set('view engine','html');
var handlebars = require('express-handlebars');


var appRoute = require('./router/app.route.js');
var reorderRoute = require('./router/reorder.js');
var dealsRoute = require('./router/deals.js');
var neworderRoute = require('./router/neworder.js');
var loginRoute = require('./router/login.js');
var registrationRoute = require('./router/registration.js');
var checkoutRoute = require('./router/checkout.js');
var logoutRoute = require('./router/logout.route.js');

var db = require('./lib/db-helper.js')();


var pizza = [{"id":1,"user":"reymesson@gmail.com","items":[{ "id":"1","name":"Tradicional","price":200,"discount":"15" },{ "id":"2","name":"Mozarella","price":200,"discount":"10" },{ "id":"3","name":"BBQ","price":100,"discount":"5" },{ "id":"4","name":"Maiz","price":200,"discount":"2" }],"date":"2017-07-19","status":"active","total":600}];
                
                
db.addOrder({"id":1,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":2,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":3,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":4,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":5,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":6,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":7,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});
db.addOrder({"id":8,"date":"2017-07-19","user":"reymesson@gmail.com","pizza":pizza,"total":600,"status":"active"});



appRoute(app, db);
reorderRoute(app, db);
dealsRoute(app, db);
neworderRoute(app, db);
loginRoute(app, db);
registrationRoute(app, db);
checkoutRoute(app, db);
logoutRoute(app, db);



app.engine('html', handlebars({

	defaultLayout: 'base',
	extname: '.html'
}));

app.listen('8081', function(){

	console.log('Listening from 8081...');
})
