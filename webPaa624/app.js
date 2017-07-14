
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const home = require('./router/home.route.js');//1
const neworder = require('./router/neworder.route.js');//1 //masa
const newordercheese = require('./router/newordercheese.route.js');//1 //queso
const newordersauce = require('./router/newordersauce.route.js');//1 //salsa
const newordertoppings = require('./router/newordertoppings.route.js');//1 //ingredientes
const newordercheckout = require('./router/newordercheckout.route.js');//1 //checkout
const neworderpayment = require('./router/neworderpayment.route.js');//1 //neworderpayment

var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 

app.use(cookieParser());

app.use(expressSession({secret:'somesecrettokenhere'}));

app.use(bodyParser());

app.use(express.static(__dirname+'/public'));

var bool = false;
var login = "";

var handlebars = require('express-handlebars');

app.set('view engine','html');

app.engine('html', handlebars({

	defaultLayout: 'base',
	extname: '.html'
}));

/*Database*/

var tipoMasaHelper = require('./tipoMasa.js');
var tipoQuesoHelper = require('./tipoQueso.js');
var tipoSalsaHelper = require('./tipoSalsa.js');
var tipoIngredientesHelper = require('./tipoIngredientes.js');


var tipoMasa = tipoMasaHelper();
var tipoQueso = tipoQuesoHelper();
var tipoSalsa = tipoSalsaHelper();
var tipoIngredientes = tipoIngredientesHelper();

var products = [
    { "name":"Materials Cards" },
    { "name":"Materials Cards" },
    { "name":"Materials Cards" },
    { "name":"Material Cards" },
];

var value = [];

home(app, products, bool, login);//2 / router
neworder(app, tipoMasa);//2 //masa / router
newordercheese(app, value, tipoQueso);//2 //queso / router
newordersauce(app, value, tipoSalsa);//2 //salsa / router
newordertoppings(app, value, tipoIngredientes);//2 //ingredientes / router
newordercheckout(app, value);//2 //checkout / router
neworderpayment(app, value);//2 //payment / router

//var historico = ['Masa Tradicional 4 Pezados','Queso Mozarella Triple','Salsa BBQ Triple','Toppings Maiz Triple'];

var historico = [
    
    {"id":"1","username":"juanperez","tipo":['Masa Tradicional 4 Pezados','Queso Mozarella Triple','Salsa BBQ Triple','Toppings Maiz Triple']},
    {"id":"3","username":"danielperez","tipo":['Masa Tradicional 4 Pezados','Queso Mozarella Triple','Salsa BBQ Triple','Toppings Maiz Triple']},    

];

app.get('/reorder', function(req,res){

    res.render('reorder',{

        title:'Title',
        name: 'Name',
        historico: historico
    });
});

app.get('/authentication2', function(req, res){//1
  
  if (req.session.userName) {
    var html = '<br>Your username from your session is: ' + req.session.userName;
  }
    res.render('authentication');
  //res.send(html);  
});


app.post('/authentication2', function(req, res){//3
  req.session.userName = req.body.userName;  
    bool = true;
    login=req.session.userName;
    console.log(bool);
    console.log(login);    
  res.redirect('/newordercheckout');//4
});


app.listen(8082, function(){

	console.log('Listening from 8082...');
});
