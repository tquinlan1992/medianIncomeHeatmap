const angular = require("angular");

angular.module('app', [
    require('angular-animate'),
    require("angular-resource"),
    require("angular-material"),
    require('angular-aria'),
    require('angular-messages'),
    require("./components/app"),
    require("./filters/app"),
    require("./services/app"),
    require("./resourceLanguages/app"),
    require("./states/app"),
    "envConfigs"
]);
