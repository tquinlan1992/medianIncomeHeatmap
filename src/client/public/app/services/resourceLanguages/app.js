const request = require('request');
const languagesConfigsJSON = require("../../resourceLanguages/languagesConfigs.json");
const resolveUrl = require("resolve-url");

class GetLanguages {

    constructor(languagesConfigs) {
        this.languagesConfigs = languagesConfigs;
    }

    getLanguageSelection() {
        let defaultLanguageSelection = this.languagesConfigs.default || this.languagesConfigs.available[0];
        return this.getBrowserPreferredLanguageIfAvailable() || defaultLanguageSelection;
    }

    getBrowserPreferredLanguageIfAvailable() {
        let preferredLanguage = "";
        const browserLanguages = navigator.languages || []; //jshint ignore:line
        browserLanguages.every(languageOption => {
            let languageResourceOption = this.languagesConfigs.available.find(availableLanguage => {
                return availableLanguage === languageOption;
            });
            if (languageResourceOption) {
                preferredLanguage = languageOption;
                return false;
            }
            return true;
        });
        return preferredLanguage;
    }

    getLanguageJSONPromise(done) {
        request(resolveUrl("app/resourceLanguages/" + this.getLanguageSelection() + ".json"), {
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                done(body);
            }
            done(error);
        });
    }



}


const angular = require("angular");

const app = angular.module("resource-languages", []);

app.service("getLanguageJSON", ($q) => {
    "ngInject";
    const deferred = $q.defer();
    new GetLanguages(languagesConfigsJSON).getLanguageJSONPromise(deferred.resolve);
    return deferred.promise;
});

module.exports = "resource-languages";
