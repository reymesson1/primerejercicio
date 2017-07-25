module.exports = function(app, db, dba){

	app.get('/deals', function(req,res){
        
        //var orders = db.getOrdersFind({ $and: [ { status: "active" }, { discount: { $ne: 0 } } ] });
	var orders = dba.getOrdersFind({ $and: [ { status: "active" }, { discount: { $ne: 0 } } ] });

		res.render('deals',{

			title: 'Title',
			name: 'Name',
			orders: orders
		});
	});
}
