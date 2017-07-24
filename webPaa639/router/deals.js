module.exports = function(app, db){

	app.get('/deals', function(req,res){
        
        var orders = db.getOrdersFind({ $and: [ { status: "active" }, { discount: { $ne: 0 } } ] });

		        res.render('deals',{

		                title: 'Title',
		                name: 'Name',
                        orders: orders
		        });
        
                
	});
    
    

}
