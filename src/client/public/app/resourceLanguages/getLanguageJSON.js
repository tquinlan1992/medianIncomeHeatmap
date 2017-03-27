const request = require("request");
const resolveUrl = require("resolve-url");
const languagesConfigsJSON = require("./languagesConfigs.json");

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

module.exports = function(done) {
    new GetLanguages(languagesConfigsJSON).getLanguageJSONPromise(((err, response, data) => {
        if (err) {
            done(err);
        } else {
            require("./inUseResource").data = data;
            done();
        }
    }));
};
