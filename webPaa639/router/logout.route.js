module.exports = function(app, db){
            
	app.get('/logout', function(req,res){
        
        db.setCookieDelete();
		res.redirect('/');
	});
}