module.exports = function(app){    
    app.get('/menu', function(req,res){

        res.json({"logo": "Brand","pizza":"Pizza","deals":"Deals","reorder":"Re-Order","neworder":"Start New Order"});

    });

}
