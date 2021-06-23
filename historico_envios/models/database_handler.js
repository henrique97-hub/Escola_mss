//Resource.: https://www.w3schools.com/nodejs/nodejs_mysql_create_db.asp
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "pass",
  database: "trabalhodb"
});

con.connect(function(err) {
  con.query("SELECT * FROM trabalhotest", function (err, result, fields) {
    console.log(result);
  });
});