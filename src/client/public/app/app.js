const angular = require("angular");

angular.module('app', [   // jshint ignore:line
    require('angular-animate'),
    require("angular-resource"),
    require("angular-material"),
    require('angular-aria'),
    require('angular-messages'),
    require("./configs/app"),
    require("./components/app"),
    "envConfigs",
    "translateProvider"
]);
