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

    getLanguageJSONPromise($http) {
        return $http.get(resolveUrl("app/resourceLanguages/" + this.getLanguageSelection() + ".json"));
    }



}


const angular = require("angular");

const app = angular.module("resource-languages", []);

app.service("getLanguageJSON", ($http) => {
    "ngInject";
    return new GetLanguages(languagesConfigsJSON).getLanguageJSONPromise($http);
});

module.exports = "resource-languages";
