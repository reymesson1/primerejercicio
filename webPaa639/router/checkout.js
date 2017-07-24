var bodyParser = require('body-parser');
        
module.exports = function(app, db){
    
	app.use(bodyParser());
    
    
    
    app.post('/checkout', function(req,res){
        
        res.redirect('/rey');
        
    });
    
};
