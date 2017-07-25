module.exports = function(app, db, dba){

	app.get('/deals', function(req,res){
                
	var order = { $and: [ { status: "active" }, { discount: { $eq: 0 } } ] };
		
		dba.getOrdersFind(order, function(data){		
			var orders = data;
			res.render('deals',{
				title: 'Title',
				name: 'Name',
				orders: orders
			});	
		});
	
	});
}
