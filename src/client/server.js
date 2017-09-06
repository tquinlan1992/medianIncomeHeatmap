const express = require('express');
const app = express();
const envConfigs = require("./envConfigs");

app.get("/app/envConfigs.json", (req, res) => {
    res.send(envConfigs);
});

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.CLIENT_PORT || 3000;

app.listen(port, function(){
  console.log('client server listening on port '+ port);
});
