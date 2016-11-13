const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get("/app/envConfigs.json", (req, res) => {
    const envConfigs = {
        serverUrl: process.env.API_SERVER_URL
    };
    res.send(envConfigs);
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/app/index.html');
});

var port = process.env.PORT || 8000;

app.listen(port, function(){
  console.log('client server listening on port '+ port);
});
