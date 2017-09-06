const angular = require("angular");

const app = angular.module("sample-url-param-module", [
]);

app.component("sampleUrlParam", {
        bindings: {
            id: '<'
        },
        template: "<h1>header text {{$ctrl.id}}</h1>",
        controller: function($scope) {
            "ngInject";
            $scope.id = this.id;
        }
});

module.exports = "sample-url-param-module";
