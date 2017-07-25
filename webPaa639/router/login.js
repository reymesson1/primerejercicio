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
            
            console.log('login post ' + data[0].email + ' ' + data[0].password);
            if(data.email==emailField&&data.password==passwordField){
                db.addCookie({email:emailField});
                res.redirect('/rey');                
            }else{
                res.render('login',{
                    error: true,
                    title: 'Title',
                    name: 'Password incorrect'                
                });
            }
        })
        
        
        /*var usersTable = db.getUsers();
        var isUsed = false;
        var isPass = false;
          
        for(var x=0;x<usersTable.length;x++){            
            
            if(usersTable[x].email==emailField){                
                isUsed=true;
                if(usersTable[x].password==passwordField){
                    isPass=true;                
                }
            }            
        }
        
        if(isUsed&&isPass){
            
            db.addCookie({email:emailField});
            res.redirect('/rey');
        }else{
        
            
                res.render('login',{

                    error: true,
                    title: 'Title',
                    name: 'Password incorrect'                
                });
            
        }*/
        
    });
}
