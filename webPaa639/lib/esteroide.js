var handlebars = require('express-handlebars');

module.exports = function(app, db){
    app.engine('html', handlebars({
        
        defaultLayout: 'base',
        helpers: {

            calculateDiscount : function(price,discount){
                                                
                var calculated = price - (price * discount / 100);            
                                
                return Math.round(calculated);
            },
            navBarLogin : function(data){
                
                var cookies = db.getCookies();
                
                if(cookies.length==0){                    
                    return '<li><a href="login">Sign in</a></li><li><a href="registration">Sign up</a></li>';
                }else{
                    return '<li><a href="logout">Sign out</a></li>';
                }
            }
        },
        extname: '.html'
    }));
}
