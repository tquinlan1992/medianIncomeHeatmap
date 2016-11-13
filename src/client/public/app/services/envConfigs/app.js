const request = require('request');
const resolveUrl = require("resolve-url");


function getEnvConfigsPromise(deferred) {
    request(resolveUrl("app/envConfigs.json"), {
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('resolveUrl("envConfigs")', resolveUrl("app/envConfigs.json"));
            console.log('gotEnvConfgis', body);
            deferred.resolve(body);
        }
        deferred.resolve(error);
    });
}


const angular = require("angular");

const app = angular.module("envConfigs", []);

app.service("getEnvConfigs", ($q) => {
    "ngInject";
    const deferred = $q.defer();
    getEnvConfigsPromise(deferred);
    return deferred.promise;
});

module.exports = "envConfigs";
