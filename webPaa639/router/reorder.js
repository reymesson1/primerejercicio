var bodyParser = require('body-parser');
        
module.exports = function(app, db){
    
    app.use(bodyParser());
    
    app.get('/reorder', function(req,res){
                
        var cookiesTable = db.getCookies();
        var emailField = cookiesTable[0];
        
        if(emailField){
            
                        
            //var orders = db.getOrdersFind({"user":emailField.email, "status":"active"});
            var orders = db.getOrdersFind({"user":emailField.email, $or : [ { "status" : "active" }, {"status":"cancelled"},{"status":"delivered"}]}).sort({id:1});
            //{ $or: [ {"name": "gary"}, {"name": "rob"}
            
            
            //var isAvailable = db.getOrdersFind({"user":emailField.email}).length == 0 ? false : true;
            var isAvailable = db.getOrdersFind({"user":emailField.email, $or : [ { "status" : "active" }, {"status":"cancelled"},{"status":"delivered"} ]   }).length == 0 ? false : true;
                        
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