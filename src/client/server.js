const express = require('express');
const app = express();
const _ = require("lodash");
const CreateAngularResourceProviderModule = require("./server/util/createAngularResourceProviderModule");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get("/app/envConfigs.js", (req, res) => {
    const envConfigsAngularModule = require("./server/util/createAngularConstantApp")("envConfigs", {
        serverUrl: process.env.API_SERVER_URL
    });
    res.send(envConfigsAngularModule);
});

app.get("/app/languageResourceProvider.js", (req, res) => {
    let languageOptions = _.split(req.headers["accept-language"], ",");
    languageOptions = _.map(languageOptions, languageOption => {
        let numberOfCharacters = 2;
        if (languageOption[2] === "-") {
            numberOfCharacters = 5;
        }
        return _.join(_.take(languageOption, numberOfCharacters), "");
    });
    const angularResourceProvider = new CreateAngularResourceProviderModule(languageOptions).getTranslateProviderJs();

    res.send(angularResourceProvider);
});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/app/index.html');
});

var port = process.env.PORT || 8000;

app.listen(port, function(){
  console.log('client server listening on port '+ port);
});
