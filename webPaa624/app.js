var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

var handlebars = require('express-handlebars');

app.set('view engine','html');

app.engine('html', handlebars({

	defaultLayout: 'base',
	extname: '.html'
}));

var tipoMasa = [
    { "id":"1","name":"Tradicional", "tipo":[{"name":"4 Pezados"},{"name":"8 Pezados"},{"name":"12 Pezados"}] }, 
    { "id":"2","name":"Finita","tipo":[{"name":"8 Pezados Mediana"},{"name":"8 Pezados Grande"}]  },
    { "id":"3","name":"Pan Pizza", "tipo":[{"name":"8 Pezados Mediana"},{"name":"8 Pezados Grande"}] }
];

var tipoQueso = [

    {"id":"1", "name":"Mozarella", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},    
    {"id":"2", "name":"Ricotta", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},        
];

var tipoSalsa = [
    
    {"id":"2", "name":"BBQ", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},
    {"id":"3", "name":"Marinara", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]}
];

var tipoIngredientes = [
    
    {"id":"2", "name":"Maiz", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},
    {"id":"3", "name":"Aceituna", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},
    {"id":"3", "name":"Carne molida", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},
    {"id":"3", "name":"Vegetales", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]},
    {"id":"3", "name":"Hongos", "tipo":[{"name":"Poco"},{"name":"Normal"},{"name":"Extra"},{"name":"Triple"}]}
];


var products = [
    { "name":"Materials Cards" },
    { "name":"Materials Cards" },
    { "name":"Materials Cards" },
    { "name":"Material Cards" },
];

app.get('/', function(req,res){

	res.render('index',{
	
		title:'Title',
		name: 'Name',
        products: products  
	});
});

app.get('/neworder', function(req,res){

	res.render('neworder',{
	
		title:'Title',
		name: 'Name',
        tipoMasa: tipoMasa  
	});
});

app.get('/newordercheese', function(req,res){

	res.render('newordercheese',{
	
		title:'Title',
		name: 'Name',
        tipoQueso: tipoQueso  
	});
});

app.get('/newordersauce', function(req,res){

	res.render('newordersauce',{
	
		title:'Title',
		name: 'Name',
        tipoSalsa: tipoSalsa  
	});
});

app.get('/newordertoppings', function(req,res){

	res.render('newordertoppings',{
	
		title:'Title',
		name: 'Name',
        tipoIngredientes: tipoIngredientes
	});
});

app.get('/newordercheckout', function(req,res){

	res.render('newordercheckout',{
	
		title:'Title',
		name: 'Name',
        tipoIngredientes: tipoIngredientes
	});
});

var value = [];

app.post('/newordercheese', function(req, res){
  var userName = req.body.userName;
  value.push(userName);
  console.log(value);    
  res.render('newordercheese',{
	
		title:'Title',
		name: 'Name',
        tipoQueso: tipoQueso  
	});  
});

app.post('/newordersauce', function(req, res){
  var userName = req.body.userName;
  value.push(userName);
  console.log(value);    
  res.render('newordersauce',{
	
		title:'Title',
		name: 'Name',
        tipoSalsa: tipoSalsa  
	});  
});

app.post('/newordertoppings', function(req, res){
  var userName = req.body.userName;
  value.push(userName);
  console.log(value);    
  res.render('newordertoppings',{
	
		title:'Title',
		name: 'Name',
        tipoIngredientes: tipoIngredientes  
	});  
});

app.post('/newordercheckout', function(req, res){
  var userName = req.body.userName;
  value.push(userName);
  console.log(value);    
  res.render('newordercheckout',{
	
		title:'Title',
		name: 'Name',
        value: value
	});  
});

app.listen(8082, function(){

	console.log('Listening from 8082...');
});