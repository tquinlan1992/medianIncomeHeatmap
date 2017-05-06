const angular = require("angular");
const _ = require("lodash");

const app = angular.module("translate-module", [
]);

app.filter("translate", (getLanguageJSON) => {
    "ngInject";
    function filter(input) {
        return _.get(getLanguageJSON, input);
    }
    return filter;
});

module.exports = "translate-module";
