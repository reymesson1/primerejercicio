var bodyParser = require('body-parser');

module.exports = function(app, db, dba){
    
    app.use(bodyParser());
    
    var isUsed = false;
    var usersTable = db.getUsers();
    var emailField = "";
    
    app.get('/login', function(req,res){

        var cookiesTable = db.getCookies();
        var emailField =  cookiesTable[0];
        
        if(emailField){
            
            res.redirect('');                            
        }else{
            res.render('login',{

                title: 'Title',
                name: 'Name'                
            });
        }
        
    }); 
    
    app.post('/login', function(req,res){     
                
        var emailField =  req.body.userName;        
        var passwordField =  req.body.password; 
        
        var email = {email:emailField};
        
        dba.getUsers(email,function(data){
                        
            if(data[0].email==emailField&&data[0].password==passwordField){
                db.addCookie({email:emailField});
                res.redirect('/rey');                
            }else{
                res.render('registration',{
                    error: true,
                    title: 'Title',
                    name: 'Password incorrect'                                
                });
            }
        });
    });
}
