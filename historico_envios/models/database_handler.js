//Resource.: https://www.w3schools.com/nodejs/nodejs_mysql_create_db.asp
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE trabalhodb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});