const angular = require("angular");

const app = angular.module("index-module", [
]);

app.component("index", {
        templateUrl: "components/index/index.html"
});

module.exports = "index-module";
