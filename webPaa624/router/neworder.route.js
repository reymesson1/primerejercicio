
module.exports = function(app, tipoMasa) {//3
      
    app.get('/neworder', function(req,res){//4

        res.render('neworder',{//5

            title:'Title',
            name: 'Name',
            tipoMasa: tipoMasa  //6
        });
    });
}
