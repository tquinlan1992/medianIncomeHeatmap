const angular = require("angular");

const app = angular.module("getLanguageJSONApp", [
    require("./translate/app")
]);

app.service("getLanguageJSON", () => {
    "ngInject";
    return require("./inUseResource").data;
});

module.exports = "getLanguageJSONApp";
