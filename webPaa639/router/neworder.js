var bodyParser = require('body-parser');


module.exports = function(app, db){
    
    var orderId=8;

	app.use(bodyParser());
	app.get('/neworder', function(req,res){

		        res.render('neworder',{

                            error: false,
			                title: 'Title',
			                name: 'Name'
		        });
	});
    
    app.post('/neworder', function(req,res){
        
        var cookiesTable = db.getCookies();
        var emailField = cookiesTable[0];
    
        
        if(emailField){
        

            if(req.body.crusts&&req.body.cheese&&req.body.sauce&&req.body.toppings){
        console.log('from new order if');

                var crusts = req.body.crusts;
                var cheese = req.body.cheese;
                var sauce = req.body.sauce;
                var toppings = req.body.toppings;
                
                var totalPizza = 10;
                if(crusts){                    
                    totalPizza+=200;                                    
                }
                if(cheese){                    
                    totalPizza+=200;
                }
                if(sauce){                
                    if(sauce=='BBQ'){
                        totalPizza+=100;
                    }else{                    
                        totalPizza+=50;
                    }
                }
                if(toppings){                    
                    if(toppings=='meat'){                        
                        totalPizza+=200;
                    }else if(toppings=='vegetable'){                        
                        totalPizza+=300;
                    }else if(toppings=='onion'){                        
                        totalPizza+=150;                
                    }else{                    
                        totalPizza+=100;
                    }
                }
                                
                                
                orderId++;
                
                var pizza = [{"id":orderId,"user":emailField.email,"items":[{ "id":"1","name":crusts,"price":200 },{ "id":"2","name":cheese,"price":200 },{ "id":"3","name":sauce,"price":100 },{ "id":"4","name":toppings,"price":200 }],"date":"2017-07-19","status":"active","total":totalPizza}];
                
                var grandTotal = 10;
                
                db.addOrder({"id":orderId,"date":"2017-07-19","user":emailField.email,"pizza":pizza,"total":totalPizza,"status":"active"});
                

                res.render('checkout', {

                    title: "Title",
                    name: "Name",
                    pizza: pizza,
                    grandTotal: totalPizza                    
                });            
            }else if(req.body.selected){            
                
                var num = req.body.selected;
                console.log('from new order else if ' + num);
                
                var or = db.getOrdersFind({user:emailField.email});
                
                var orders = db.getOrders();
                
                orderId++;
                
                var pizza;
                            
                var grandTotal = 10;
                
                var totalPizza = 10;
                
                for(var x=0;x<or.length;x++){
                    if(or[x].id==num){
                        or[x].pizza[0].id = orderId;
                        pizza = or[x].pizza;
                        totalPizza=or[x].pizza[0].total
                    }
                }
                
                db.addOrder({"id":orderId,"date":"2017-07-19","user":emailField.email,"pizza":pizza,"total":totalPizza,"status":"active"});
                
                
                res.render('checkout', {

                    title: "Title",
                    name: "Name",
                    pizza: pizza,
                    grandTotal: totalPizza                    
                }); 
                
            }else{

                console.log('from new order else ');
                res.render('neworder', {

                    error: true,
                    name: 'Select at least one ingredients'
                });
            }
        }else{
        
            res.redirect('/login');
        }
        
    });

}
