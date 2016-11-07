const angular = require("angular");

const app = angular.module("sampleComponentModule", [
]);

app.component("sampleComponentIndex", {
        bindings: {
            test: '@',
            objectTest: "="
        },
        templateUrl: "/app/components/sample/index.html",
        controller: function(envConfigs, sampleComponentApi) {
            console.log('envConfigs', envConfigs);
            console.log('this.test', this.test);
            console.log('this.objectTest', this.objectTest);
            sampleComponentApi.getSampleJson().then(successResponse => {
                console.log('successResponse from server api confured from env variable', successResponse);
            },
            errorResponse => {
                console.log('errorResponse', errorResponse);
            });
        }
});

app.factory("sampleComponentApi", ($http, envConfigs) => {
        "ngInject";

        const factory = {};

        factory.getSampleJson = function() {
            return $http.get(envConfigs.serverUrl + "/sample.json");
        };

        return factory;
});



module.exports = "sampleComponentModule";
