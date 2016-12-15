var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var pool      =    mysql.createPool({
  connectionLimit : 100, //important
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'NODEJS',
  debug    :  false
});

function handle_database(query, result) {
  pool.getConnection(function(err,connection){
    if (err) {
      connection.release();
     return {"code" : 100, "status" : "Error in connection database"};
    }

    console.log('connected as id ' + connection.threadId);

    connection.query(query,function(err,rows){
      connection.release();
      if(!err) {
        console.log("Rows: ",rows);
        result = rows;
      }
    });

    connection.on('error', function(err) {
      return {"code" : 100, "status" : "Error in connection database"};
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = "select * from ENTITY";
  var result;
  handle_database(query, result);
  console.log("Result: ",result);
  res.render('index', { title: 'Express' });
});

module.exports = router;
