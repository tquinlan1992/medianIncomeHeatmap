const angular = require("angular");
const _ = require("lodash");
require('angular-ui-router');
const app = angular.module("states-module", [
    'ui.router'
]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise("/heatmapSearch/heatmapMedianIncome?latitude=42.3562&longitude=-71.062065");

    const states = _.concat(
        [{
            name: "index",
            abstract: true,
            views: {
                "": {
                    component: "index"
                }
            }
        }],
        require("./index/index")
    );

    _.forEach(states, state => {
        $stateProvider.state(state);
    });

    $locationProvider.html5Mode(true);
});

module.exports = "states-module";
