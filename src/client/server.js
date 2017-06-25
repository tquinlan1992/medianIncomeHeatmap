const express = require('express');
const app = express();
const envConfigs = require("./envConfigs");

app.use(express.static(__dirname + '/public'));

app.get("/app/envConfigs.json", (req, res) => {
    res.send(envConfigs);
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/app/index.html');
});

var port = 3000;

app.listen(port, function(){
  console.log('client server listening on port '+ port);
});
