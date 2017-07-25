var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

var helpers = require('./lib/helpers');

app.set('view engine', 'html');

app.engine('html', handlebars({

	defaultLayout: 'base',
	helpers: helpers,
	layoutDir: __dirname + '/views/layouts/',	
	partialDir: [
		__dirname + '/views/partials'
	],
	extname: '.html'
}));

app.use('/static', express.static( __dirname + '/public'));


app.get('/', function(req, res){

	res.render('index', {

		title: 'Header',
		name: 'Header'	

	});
});

app.get('/about', function(req, res){

	res.render('about', {

		title: 'Der',
		name: 'About'
	});
});

var rey = {

	"id": "1"
};

app.listen(6719);
console.log('Listening from 6719...');
