const angular = require("angular");

const app = angular.module("sampleComponentModule", []);

app.component("sampleComponentIndex", {
    bindings: {
        test: '@',
        objectTest: "="
    },
    templateUrl: "/app/components/sample/index.html",
    controller: function($scope, sampleComponentApi) {
        sampleComponentApi.getSampleJson().then(successResponse => {
            $scope.sampleJSON = successResponse.data;
                console.log('successResponse from server api confured from /sample.json', successResponse);
            },
            errorResponse => {
                console.log('errorResponse', errorResponse);
            });
    }
});

app.factory("sampleComponentApi", ($http, getEnvConfigs) => {
    "ngInject";
    const factory = {};

    factory.getSampleJson = function() {
        return getEnvConfigs.then(envConfigs => {
            console.log('gotConfigs', envConfigs);
            return $http.get(envConfigs.serverUrl + "/sample.json");
        });
    };

    return factory;
});



module.exports = "sampleComponentModule";
