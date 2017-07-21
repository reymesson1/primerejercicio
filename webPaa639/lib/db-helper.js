module.exports = function(){
    
    var loki = require('lokijs');

    var db = new loki('loki.json');
    
    /******************Table USERs**********************/
    
    var users = db.addCollection('users');
        
    function addUser(user){
            
        users.insert(user);
    }

    // TODO: sdsds
    function getUsers() {
        return users.find();
    }
    
    /******************Table PIZZA**********************/
    
    var pizzas = db.addCollection('pizzas');
    
    function addPizza(pizza){
    
        pizzas.insert(pizza);
    }
    
    function getPizzas(){
    
        return pizzas.find();
    }
    
    /******************Table COOKIES**********************/
    
    
    var cookies = db.addCollection('cookies');
    
    function addCookie(cookie){
    
        cookies.insert(cookie);
    }
    
    function getCookies(){
    
        return cookies.find();
    }
    
    function setCookieDelete(){
    
        var value = cookies.find();
        return cookies.remove(value[0]);
    }
    
    /******************Table ORDERS**********************/
    
    var orders = db.addCollection('orders');
    
    function addOrder(order){
    
        orders.insert(order);
    }
    
    function getOrders(){
    
        return orders.find();
    }
    
    function getOrdersFind(user){
        
        return orders.find(user);
    }
    
    
    return {
        getUsers: getUsers,
        addUser: addUser,
        getPizzas: getPizzas,
        addPizza: addPizza,
        getCookies: getCookies,
        addCookie: addCookie,
        getOrders: getOrders,
        addOrder: addOrder,
        getOrdersFind: getOrdersFind,
        setCookieDelete: setCookieDelete
    };
    
}
