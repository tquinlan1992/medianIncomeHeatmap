const angular = require("angular");

const app = angular.module("getLanguageJSONApp", []);

app.service("getLanguageJSON", () => {
    "ngInject";
    return require("../../resourceLanguages/inUseResource").data;
});

module.exports = "getLanguageJSONApp";
