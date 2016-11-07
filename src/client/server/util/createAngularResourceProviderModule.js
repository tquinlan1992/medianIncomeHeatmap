const _ = require("lodash");
const resources = require("../resources/index");

class CreateAngularResourceProviderModule {

    constructor(languageOptions) {
        this.languageSelection = "es-US";
        this.languageResource = resources["es-US"];
        _.forEach(languageOptions, _.bind(languageOption => {
            let languageResourceOption = resources[languageOption];
            if (languageResourceOption) {
                this.languageSelection = languageOption;
                this.languageResource = languageResourceOption;
                return false;
            }
        }, this));
    }

    getTranslateProviderJs() {
        return `var app = angular.module("translateProvider", [
            'pascalprecht.translate'
        ]);

        app.config(['$translateProvider', function ($translateProvider) {
          $translateProvider.translations("${this.languageSelection}", ${JSON.stringify(this.languageResource)});

          $translateProvider.preferredLanguage("${this.languageSelection}");
      }]);`;
    }
}

module.exports = CreateAngularResourceProviderModule;
