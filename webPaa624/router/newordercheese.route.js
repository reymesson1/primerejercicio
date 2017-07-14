module.exports = function(app, value, tipoQueso) {//3
      
    app.post('/newordercheese', function(req, res){//4
      var userName = req.body.userName;
      value.push("Masa "+userName);//5
      console.log(value);    
      res.render('newordercheese',{//6

            title:'Title',
            name: 'Name',
            tipoQueso: tipoQueso  //7
        });  
    });
}
