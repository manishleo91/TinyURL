const db = require("./mysqlconnection");
const url = require("./urlgenerator");

function databaseConnect() {
  db.dbConnect();
}

function register(query) {
  const longurl = query.url;
  console.log(query.expirydays);
  
  // const longurl =new URLSearchParams(window.location.search); 
  if (longurl=='')
  { 

    return "Please enter a valid URL";
  }
  const expirydays = query.expirydays;
  const tinyurl = url.urlGenerator();
  //const tinyurl = longurl.urlGenerator();
  const timestamp = new Date();
  const timerequested = timestamp.toISOString().slice(0, 19).replace("T", " ");

  let expiryDate = null;

  if (expirydays) {
    timestamp.setDate(timestamp.getDate() + Number(expirydays));
    expiryDate = timestamp.toISOString().slice(0, 19).replace("T", " ");
  }

  //db.insertUrl(tinyurl, longurl, timerequested, expiryDate);
  console.log(tinyurl);
  return tinyurl;
  
}

function retrieve(query, callback) {
  const tinyurl = query.url;
  db.getLongUrl(tinyurl, (data) => {
    if (data) {
      callback(data.longurl);
    } else {
      callback("The tinyurl you have searched is not present in the database.");
    }
  });
}

module.exports = {
  register: register,
  retrieve: retrieve,
  databaseConnect: databaseConnect,
};
