
module.exports = function(app,db){
            
	app.get('/', function(req,res){
        
        var orders = db.getOrdersFind({ $and: [ { status: "active" }, { discount: { $eq: 0 } } ] });
        
		        res.render('index',{

		                title: 'Title',
		                name: 'Name',
                        orders: orders,
                        login: 'true'
		        });
                        
	});                                   

}
