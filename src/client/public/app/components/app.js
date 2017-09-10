const angular = require("angular");

angular.module("components-module", [
    require("./sample/app"),
    require("./index/app"),
    require("./sampleUrlParam/app"),
    require("./heatmap/app")
]);

module.exports = "components-module";
