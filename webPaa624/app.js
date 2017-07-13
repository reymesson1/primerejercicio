var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

app.set('view engine','html');

app.engine('html', handlebars({

	defaultLayout: 'base',
	extname: '.html'
}));

app.get('/', function(req,res){

	res.render('index',{
	
		title: 'Title',
		name: 'Name'
	});
});

app.listen('8081', function(){

	console.log('Listening from 8081...');
});
