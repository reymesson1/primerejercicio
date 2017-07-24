var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function(app, db){
    
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
                
                
                
                var pizza = [{"id":orderId,"user":emailField.email,"items":[{ "id":"1","name":crusts,"price":200 },{ "id":"2","name":cheese,"price":200 },{ "id":"3","name":sauce,"price":100 },{ "id":"4","name":toppings,"price":200 }],"date":dateOrder,"status":"active","total":totalPizza, "discount":0}];
                
                var grandTotal = 10;
                
                db.addOrder({"id":orderId,"date":dateOrder,"user":emailField.email,"pizza":pizza,"total":totalPizza,"status":"active", "discount":0});

                

                res.render('checkout', {

                    title: "Title",
                    name: "Name",
                    pizza: pizza,
                    grandTotal: totalPizza,
                    discountApply: false
                });            
            }else if(req.body.selected){//pizza deals reorder 
                
                if(req.body.selected&&req.body.cancel){
                    
                    var num = req.body.selected;
                    
                    var or = db.getOrders();
                    
                    var timeoutRule = false;
                    
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
                    }
                    
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
                           
                            console.log('neworder if');
                           
                            db.addOrder({"id":orderId,"date":dateOrder,"user":emailField.email,"pizza":pizza,"total":totalPizza,"status":"active","discount":0});

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

                console.log('from neworder else');
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
