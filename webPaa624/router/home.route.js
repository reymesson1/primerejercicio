
module.exports = function(app, products, bool, login) {//3
      
    app.get('/', function(req,res){//4

        res.render('index',{//5

            title:'Title',
            name: 'Name',
            products: products,//6
            bool: bool,
            login: login
        });
    });
        console.log(login);
}