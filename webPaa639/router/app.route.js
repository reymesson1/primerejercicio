module.exports = function(app,db){
            
	app.get('/', function(req,res){
        
        var orders = db.getOrders();
        

		        res.render('index',{

		                title: 'Title',
		                name: 'Name',
                        orders: orders,
                        login: 'true'
		        });
                        
	});                                   

}