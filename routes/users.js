var express = require('express');
var router = express.Router();
var connection = require('../Utils/connection');
/* GET users listing. */
router.get('/', function(req, res, next) {
  /*req.getConnection(function (err, connection) {
   connection.query("select * from ENTITY", function(err, rows) {
   if(!err){
   console.log("Rows: ",rows);
   }
   connection.end();
   });
   });*/
  connection.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      return {"code": 100, "status": "Error in connection database"};
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("select * from ENTITY", function (err, rows) {
      connection.release();
      if (!err) {
        console.log("Rows: ", rows);
        result = rows;
      }
    });

    connection.on('error', function (err) {
      return {"code": 100, "status": "Error in connection database"};
    });
  });

  res.send('respond with a resource');
});

module.exports = router;
