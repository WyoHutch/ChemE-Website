var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "laramie",
  database: "chemTest",
  insecureAuth: true
});

con.connect(function(err) {
  if (err) throw console.log(err);
  var sql = "INSERT INTO Downloads (AppNum) VALUES ('4444')";
  console.log(sql);
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  con.end();
});
