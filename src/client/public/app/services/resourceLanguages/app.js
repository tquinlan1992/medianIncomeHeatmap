const request = require('request');
const languagesConfigs = require("../../languagesConfigs.json");
const availableLanguages = languagesConfigs.available;
const resolveUrl = require("resolve-url");


function getLanguageSelection() {
    let defaultLanguageSelection = availableLanguages[0];
    let preferredLanguage = "";
    const browserLanguages = navigator.languages || []; //jshint ignore:line
    console.log('browserLanguages', browserLanguages);
    browserLanguages.every(languageOption => {
        let languageResourceOption = availableLanguages.find(availableLanguage => {
            return availableLanguage === languageOption;
        });
        if (languageResourceOption) {
            preferredLanguage = languageOption;
            return false;
        }
        return true;
    });
    return preferredLanguage || defaultLanguageSelection;
}

function getLanguageJSONPromise(deferred) {
    request(resolveUrl("app/resourceLanguages/" + getLanguageSelection() + ".json"), {
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            deferred.resolve(body);
        }
        deferred.resolve(error);
    });
}


const angular = require("angular");

const app = angular.module("resource-languages", []);

app.service("getLanguageJSON", ($q) => {
    "ngInject";
    const deferred = $q.defer();
    getLanguageJSONPromise(deferred);
    return deferred.promise;
});

module.exports = "resource-languages";
