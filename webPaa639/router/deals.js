
module.exports = function(app, db){

	app.get('/deals', function(req,res){
        
        var orders = db.getOrdersFind({ "status" : "offer" });

		        res.render('deals',{

		                title: 'Title',
		                name: 'Name',
                        orders: orders
		        });
        
                
	});
    
    

}