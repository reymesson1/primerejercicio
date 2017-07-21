module.exports = function(app,db){
    
    var cron = require('node-cron');
    var moment = require('moment');

    cron.schedule('*/2 * * * *', function(){
        var deliveryTime = getRandomArbitrary(3, 5);
        var or = db.getOrders();
        for(var x=0;x<or.length;x++){
            if(or[x].status=="active"){
                var now  = moment().format('DD/MM/YYYY HH:mm:ss');
                var then = or[x].date;

                var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
                var d = moment.duration(ms);
                var s = Math.floor(d.asMinutes()) + moment.utc(ms).format(":mm:ss");

                if(Math.floor(d.asMinutes())>deliveryTime){
                                                
                    or[x].status = "delivered";
                }
            }
        }
    });
    
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
}
