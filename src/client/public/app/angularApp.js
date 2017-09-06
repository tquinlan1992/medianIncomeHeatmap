const angular = require("angular");

angular.module('app', [
    require('angular-animate'),
    require("angular-resource"),
    require("angular-material"),
    require('angular-aria'),
    require('angular-messages'),
    require("./components/app"),
    require("./templates"),
    require("./states/app"),
    require("./services/app"),
    require("./filters/app"),
    require("./resourceLanguages/app"),
    require("./configs/app"),
    "envConfigs"
]);
