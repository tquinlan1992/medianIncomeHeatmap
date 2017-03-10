const angular = require("angular");

const app = angular.module("sampleComponentModule", []);

app.component("sampleComponentIndex", {
    bindings: {
        test: '@',
        objectTest: "="
    },
    templateUrl: "/app/components/sample/index.html",
    controller: function(sampleComponentApi) {
        sampleComponentApi.getSampleJson().then(successResponse => {
            this.sampleJSON = successResponse.data;
        }, errorResponse => {
            console.log('errorResponse', errorResponse);
        });

        this.tasks = [1,2,3];

    }
});

app.factory("sampleComponentApi", ($http, getEnvConfigs) => {
    "ngInject";
    const factory = {};

    factory.getSampleJson = function() {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/sample.json");
        });
    };

    return factory;
});



module.exports = "sampleComponentModule";
