module.exports = function(app, value, tipoIngredientes) {//3
      
    app.post('/newordertoppings', function(req, res){
      var userName = req.body.userName;
      value.push("Salsa "+userName);
      console.log(value);    
      res.render('newordertoppings',{

            title:'Title',
            name: 'Name',
            tipoIngredientes: tipoIngredientes  
        });  
    });
}
