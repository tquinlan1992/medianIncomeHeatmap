const request = require("request");

const languagesConfigsJSON = require("./resourceLanguages/languagesConfigs.json");
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

    getLanguageJSONPromise(callback) {
        return request(resolveUrl("/app/resourceLanguages/" + this.getLanguageSelection() + ".json"), {
            json: true
        }, callback);
    }



}
new GetLanguages(languagesConfigsJSON).getLanguageJSONPromise(((err, response, data) => {
    console.log(data);


    /*
    const angular = require("angular");

    const app = angular.module("resource-languages", []);

    app.service("getLanguageJSON", () => {
        "ngInject";
        return data;
    });

    module.exports = "resource-languages";
    */


    const angular = require("angular");

    const app = angular.module('app', [
        require('angular-animate'),
        require("angular-resource"),
        require("angular-material"),
        require('angular-aria'),
        require('angular-messages'),
        require("./configs/app"),
        require("./components/app"),
        require("./filters/app"),
        require("./services/app"),
        "envConfigs"
    ]);
    app.service("getLanguageJSON", () => {
        "ngInject";
        return data;
    });
}));
