const angular = require("angular");
const _ = require("lodash");

const app = angular.module("translate-module", [
    require("../../services/resourceLanguages/app")
]);
let languageResource;

function getResourceValue(key) {
    return _.get(languageResource, key);
}

app.filter("translate", (getLanguageJSON) => {

    function filter(input) {
        if (!languageResource) {
            getLanguageJSON.then(result => {
                languageResource = result.data;
                return getResourceValue(input);
            });
            return "language resource file not loaded";
        } else {
            return getResourceValue(input);
        }
    }
    filter.$stateful = true;
    return filter;
});

module.exports = "translate-module";
