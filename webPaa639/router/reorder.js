var bodyParser = require('body-parser');
        
module.exports = function(app, db, dba){
    
    app.use(bodyParser());
    
    app.get('/reorder', function(req,res){
                
        var cookiesTable = db.getCookies();
        var emailField = cookiesTable[0];      
            
        if(emailField){
            
                var order = {"user":emailField.email, $or : [ { "status" : "active" }, {"status":"cancelled"},{"status":"delivered"}]};//input
                var orders;//output
                var isAvailable;
            
                dba.getOrdersFind(order,function(data){                
                
                    orders = data;
                    isAvailable = data.length == 0 ? false : true;
                    res.render('reorder',{
                        title: 'Title',
                        name: 'Name',
                        orders: orders,
                        isAvailable: isAvailable
                    });
                });
        }else{
                res.redirect('login');
        }
    });
};
