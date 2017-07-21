var handlebars = require('express-handlebars');

module.exports = function(app, db){
    app.engine('html', handlebars({
        
        defaultLayout: 'base',
        helpers: {

            calculateDiscount : function(id, price,discount){
                
                var or = db.getOrdersFind({status:"offer"});
                
                var calculated;
                
                
                if(discount==0){
                    
                    calculated = price - (price * 1 / 100);
                }else{
                
                    calculated = price - (price * discount / 100);
                }
                                
                return calculated;
            },
            navBarLogin : function(data){
                
                var cookies = db.getCookies();
                
                if(cookies.length==0){                    
                    return '<li><a href="/login">Sign in</a></li><li><a href="/registration">Sign up</a></li>';
                }else{
                    return '<li><a href="/logout">Sign out</a></li>';
                }
            }
        },
        extname: '.html'
    }));
}