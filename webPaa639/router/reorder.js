var bodyParser = require('body-parser');
        
module.exports = function(app, db){
    
	app.use(bodyParser());
    
    app.get('/reorder', function(req,res){
                
        var cookiesTable = db.getCookies();
        var emailField = cookiesTable[0];
        
        if(emailField){
            
                        
            var orders = db.getOrdersFind({"user":emailField.email});
            
            var isAvailable = db.getOrdersFind({"user":emailField.email}).length == 0 ? false : true;
                        
            res.render('reorder',{

                title: 'Title',
                name: 'Name',
                orders: orders,
                isAvailable: isAvailable
            });
        }else{
            res.redirect('/login');
        }
    });
    
};