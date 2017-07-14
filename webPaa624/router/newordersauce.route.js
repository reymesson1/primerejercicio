module.exports = function(app, value, tipoSalsa) {//3
      
    app.post('/newordersauce', function(req, res){//4
      var userName = req.body.userName;
      value.push("Queso "+userName);//5
      console.log(value);    
      res.render('newordersauce',{//6

            title:'Title',
            name: 'Name',
            tipoSalsa: tipoSalsa  //7
        });  
    });
}
