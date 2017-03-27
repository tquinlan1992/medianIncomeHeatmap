const angular = require("angular");
const _ = require("lodash");

const app = angular.module("translate-module", [
]);

app.filter("translate", (getLanguageJSON) => {
    "ngInject";
    console.log("getLanguageJSON", getLanguageJSON);
    function filter(input) {
        return _.get(getLanguageJSON, input);
    }
    return filter;
});

module.exports = "translate-module";
