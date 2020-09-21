const express = require("express");
var path = require("path");
const service = require("./service");
const app = express();

const port = 8000;

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
  service.databaseConnect();
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

//API endpoint: register
app.get("/register/", (req, res) => {
  const result = service.register(req.query);
  console.log(result);
  res.send(JSON.stringify({ tinyUrl: result }));
  //console.log(res);
  console.log(JSON.stringify({ tinyUrl: result }));
});

//API endpoint: retrieve 
app.get("/retrieve", (req, res) => {
  service.retrieve(req.query, (result) => {
    res.send(JSON.stringify({ longurl: result }));
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
