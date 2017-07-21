module.exports = function(app, db){

	app.get('/deals', function(req,res){
        
        var orders = db.getOrders();

		        res.render('deals',{

		                title: 'Title',
		                name: 'Name',
                        orders: orders
		        });
	});

}