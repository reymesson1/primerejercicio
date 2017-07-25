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
                
        var email = {email:emailField};
        
        var isUsed = false;
        
        dba.getUsers(email,function(data){
                        
            if(data.length>0){
                isUsed=true;                
            }
        });
        
        console.log(isUsed);
            
        /*if(isUsed){
            
                res.render('registration',{

                    error: true,
                    name: 'Users already exists'
                });
            
        }else{

            //db.addUser({email:emailField,password:pwdField});
            //usersTable = db.getUsers();
            //dba.addUser({email:emailField,password:pwdField});
            console.log('else');

            res.redirect('/rey');
        }*/
            

        
    });
}
