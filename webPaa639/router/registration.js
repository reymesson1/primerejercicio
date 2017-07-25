var bodyParser = require('body-parser');

module.exports = function(app,db, dba){
    app.use(bodyParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
    
        extended: true
    }));
        
    
    app.get('/registration', function(req,res){

                res.render('registration', {

                        error: false,
                        name: 'Name'
                });
    });
    
    app.post('/registration', function(req,res){
                
        var emailField = req.body.email;
        var pwdField = req.body.password;
        var cPwdField = req.body.confirmPassword;
        
        dba.getUsers(function(data){
            
            console.log(data.length);        
        })
        
        res.redirect('/rey');
        
        /*var usersTable = db.getUsers();
        var isUsed = false;
        
        for(var x=0;x<usersTable.length;x++){            
            if(usersTable[x].email==emailField){
                isUsed=true;
            }
        }
            
        if(isUsed){
            
                res.render('registration',{

                    error: true,
                    name: 'Users already exists'
                });
            
        }else{

            db.addUser({email:emailField,password:pwdField});
            usersTable = db.getUsers();
            

            res.redirect('/rey');
        }*/
            

        
    });
}
