const angular = require("angular");

const app = angular.module("envConfigs", []);

app.service("getEnvConfigs", ($http) => {
    "ngInject";
    return $http.get("/app/envConfigs.json");
});

module.exports = "envConfigs";
