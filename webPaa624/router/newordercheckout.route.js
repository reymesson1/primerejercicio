
module.exports = function(app, value) {//3
      
    app.post('/newordercheckout', function(req, res){
      var userName = req.body.userName;
      value.push("Toppings "+userName);
      res.render('newordercheckout',{

            title:'Title',
            name: 'Name',
            value: value
        });  
    });
    
    
    app.get('/newordercheckout', function(req, res){
      var userName = req.body.userName;
      value.push("Toppings "+userName);
      console.log(value);    
      res.render('newordercheckout',{

            title:'Title',
            name: 'Name',
            value: value
        });  
    });

}
