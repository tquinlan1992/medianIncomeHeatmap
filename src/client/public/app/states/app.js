const angular = require("angular");
const _ = require("lodash");

const app = angular.module("states-module", [   // jshint ignore:line
    require('angular-ui-router')
]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise("/home");

    const states = _.concat(
        [{
            state: "index",
            abstract: true,
            views: {
                "": {
                    templateUrl: "/app/states/index/index.html"
                }
            }
        }],
        require("./index/index")
    );

    _.forEach(states, state => {
        $stateProvider.state(state.state, _.omit(state, "state"));
    });

    $locationProvider.html5Mode(true);
});

module.exports = "states-module";
