module.exports = function(app, value) {//3
      
    app.get('/neworderpayment', function(req, res){
      if (req.session.userName) {
          var userName = req.body.userName;
          value.push("Total "+userName);
          console.log(value);    
          res.render('neworderpayment',{

                title:'Title',
                name: 'Name',
                value: value
            });
          console.log('if');
      }else{

          res.redirect('/authentication2');//4
      }
    });
}
