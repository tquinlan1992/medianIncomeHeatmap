const angular = require("angular");

angular.module('app', [
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
