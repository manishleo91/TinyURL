"use strict";

var mysql = require("mysql");
var fs = require("fs");

var dbConn = mysql.createConnection({
  host: "172.25.0.102",
  //host: "localhost",
  user: "root",
  password: "12345678",
  database: "aqilliz_db",
});

var dbConnect = function () {
  dbConn.connect();
};

var dbEndConnection = function () {
  dbConn.end();
};

var insertUrl = function (tinyurl, longurl, timerequested, expirydate) {

  var sql;
  if (expirydate) {
    sql =
    `insert into url_map (tinyurl, longurl, timerequested, expirydate) values ('${tinyurl}' , '${longurl}', '${timerequested}', '${expirydate}')`;
  } else {
    sql =
    `insert into url_map (tinyurl, longurl, timerequested, expirydate) values ('${tinyurl}' , '${longurl}', '${timerequested}', ${expirydate})`;
  }

  var query = dbConn.query(sql, function (err, result) {
    console.log(query.sql);
    if (err) {
      console.error("error connecting: " + err.stack);
      fs.writeFileSync("server.log", `Error connecting to the database.\n`, {flag: "as", encoding:"UTF-8"});
      return;
    }
    fs.writeFileSync("server.log", `Inserted ${longurl} = ${tinyurl} into database.\n`, {flag: "as", encoding:"UTF-8"});
    console.log("connected as id " + dbConn.threadId);
  });
};

var getLongUrl = function(tinyurl, callback){
	var query = dbConn.query(`select longurl from url_map where tinyurl = '${tinyurl}'`, function(err, rows, fields){
		console.log(query.sql);
		if (err) {
      console.error('error connecting: ' + err.stack);
      fs.writeFileSync("server.log", `Error connecting.\n`, {flag: "as", encoding:"UTF-8"});
			return;
		}
    //console.log('connected as id ' + dbConn.threadId);
    fs.writeFileSync("server.log", `Connected as id ${dbConn.threadId}.\n`, {flag: "as", encoding:"UTF-8"});
    fs.writeFileSync("server.log", `Retrieved ${query} from the database .\n`, {flag: "as", encoding:"UTF-8"});
		callback(rows[0]);
	});
};

module.exports = {
  dbConnect: dbConnect,
  dbEndConnection: dbEndConnection,
  insertUrl: insertUrl,
  getLongUrl: getLongUrl,
};
