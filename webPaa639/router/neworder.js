var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function(app, db, dba){
    
    var orderId=16;
    
    var date1 = new Date();          
    date1.now;                                
    var dateOrder = moment().format('DD/MM/YYYY HH:mm:ss');
    var timeOrder = date1.toLocaleTimeString();

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
        

            if(req.body.crusts&&req.body.cheese&&req.body.sauce&&req.body.toppings){//start new order
                var pizzaObj = new Object();
                pizzaObj.crusts= req.body.crusts;
                pizzaObj.cheese = req.body.cheese;
                pizzaObj.sauce = req.body.sauce;
                pizzaObj.toppings = req.body.toppings;
                pizzaObj.toppings2 = req.body.toppings2;
                pizzaObj.size = req.body.size;
                pizzaObj.extra = req.body.extra;
                pizzaObj.totalPizza = 10;
                
                //var totalPizza = 10;
                if(pizzaObj.crusts){                    
                    pizzaObj.totalPizza+=200;                                    
                }
                if(pizzaObj.cheese){                    
                    pizzaObj.totalPizza+=200;
                }
                if(pizzaObj.sauce){                
                    if(pizzaObj.sauce=='BBQ'){
                        pizzaObj.totalPizza+=100;
                    }else{                    
                        pizzaObj.totalPizza+=50;
                    }
                }
                if(pizzaObj.toppings){                    
                    if(pizzaObj.toppings=='meat'){                        
                        pizzaObj.totalPizza+=200;
                    }else if(pizzaObj.toppings=='vegetable'){                        
                        pizzaObj.totalPizza+=300;
                    }else if(pizzaObj.toppings=='onion'){                        
                        pizzaObj.totalPizza+=150;                
                    }else{                    
                        pizzaObj.totalPizza+=100;
                    }
                }
                
                if(pizzaObj.extra){                    
                    pizzaObj.totalPizza+=300;
                }
                              
                orderId++;

                var pizza = [{"id":orderId,"user":emailField.email,"items":[{ "id":"1","name":pizzaObj.crusts,"price":200 },{ "id":"2","name":pizzaObj.cheese,"price":200 },{ "id":"3","name":pizzaObj.sauce,"price":100 },{ "id":"4","name":pizzaObj.toppings,"price":200 },{ "id":"5","name":pizzaObj.toppings2,"price":200 },{"id":"6","name":pizzaObj.size,"price":100},{"id":7,"name":pizzaObj.extra,"extra":300}],"date":dateOrder,"status":"active","total":pizzaObj.totalPizza, "discount":0}];                
                
                var grandTotal = 10;
                
                db.addOrder({"id":orderId,"date":dateOrder,"user":emailField.email,"pizza":pizza,"total":pizzaObj.totalPizza,"status":"active", "discount":0});
                dba.addOrder({"id":orderId,"date":dateOrder,"user":emailField.email,"pizza":pizza,"total":pizzaObj.totalPizza,"status":"active", "discount":0});
          
                res.render('checkout', {

                    title: "Title",
                    name: "Name",
                    pizza: pizza,
                    grandTotal: totalPizza,
                    discountApply: false
                });            
            }else if(req.body.selected){//pizza deals reorder 
                
                if(req.body.selected&&req.body.cancel){
                    
                    var num = {"id":req.body.selected};
                    
                    var timeoutRule = false;
                    
                    var change;
                                        
                    dba.getOrdersFind(num, function(data){
                        
                        console.log(data);
                        var now  = moment().format('DD/MM/YYYY HH:mm:ss');
                        var then = data.date;
                        
                        var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
                        var d = moment.duration(ms);
                        var s = Math.floor(d.asMinutes()) + moment.utc(ms).format(":mm:ss");

                        if(Math.floor(d.asMinutes())>2){

                            timeoutRule = true;                                    

                        }else{
                            change = {"id":req.body.selected}, {"$set":{"status":"cancelled"} };
                            dba.setOrders(change);
                        }
                    })
                    
                    /*var or = db.getOrders();
                    
                    
                    
                    for(var x=0;x<or.length;x++){
                        if(or[x].id==num){
                                var now  = moment().format('DD/MM/YYYY HH:mm:ss');
                                var then = or[x].date;

                                var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
                                var d = moment.duration(ms);
                                var s = Math.floor(d.asMinutes()) + moment.utc(ms).format(":mm:ss");
                            
                                if(Math.floor(d.asMinutes())>2){
                                    
                                    timeoutRule = true;                                    
                                    
                                }else{
                                    or[x].status = "cancelled";                                
                                }
                        }
                    }*/
                    
                    if(timeoutRule){
                           res.render('checkout', {
                                error: true,
                                name: 'Unavailable to cancelled the orders is on the road...'
                           });
                    }else{
                           res.redirect('/rey');
                    }
                    
                
                }else{
            
                
                        var num = req.body.selected;

                        var or = db.getOrders();

                        var orders = db.getOrders();

                        orderId++;

                        var pizza;

                        var grandTotal = 10;

                        var totalPizza = 10;
                    
                        var statusCancelled = false;

                        for(var x=0;x<or.length;x++){
                            if(or[x].id==num){
                                or[x].pizza[0].id = orderId;
                                pizza = or[x].pizza;
                                totalPizza=or[x].pizza[0].total
                                if(or[x].status=='cancelled'){
                                    statusCancelled=true;
                                }
                            }
                        }

                       if(statusCancelled){
                           
                           res.render('checkout', {
                                error: true,
                                name: 'This orders is already cancelled'  
                           });
                           
                       }else{
                           
                            calculated = pizza[0].total - (pizza[0].total * pizza[0].discount/100);
                           
                            pizza[0].total = Math.round(calculated);
                           
                           
                            db.addOrder({"id":orderId,"date":dateOrder,"user":emailField.email,"pizza":pizza,"total":calculated,"status":"active","discount":0});

                            res.render('checkout', {

                                title: "Title",
                                name: "Name",
                                pizza: pizza,                                
                                grandTotal: totalPizza,
                                discountApply: true
                            }); 
                       }
                    
                }
                
            }else{

                res.render('neworder', {

                    error: true,
                    name: 'Select at least one ingredients'
                });
            }
        }else{
        
            res.redirect('login');
        }
        
    });

}
