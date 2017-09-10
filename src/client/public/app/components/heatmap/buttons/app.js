const angular = require("angular");

const app = angular.module("heatmap-buttons", [
]);

app.component("heatmapButtons", {
        bindings: {
        },
        templateUrl: "components/heatmap/buttons/index.html",
        controller: function () {
            this.changeRadius = () => { //jshint ignore:line
                global.heatmap.set('radius', global.heatmap.get('radius') ? null : 50);
            };

            this.changeOpacity = function() { //jshint ignore:line
                global.heatmap.set('opacity', global.heatmap.get('opacity') ? null : 0.2);
            };

            this.toggleHeatmap = function() { //jshint ignore:line
                global.heatmap.setMap(global.heatmap.getMap() ? null : global.map);
            };
            var gradient = require("./gradient.json");
            this.changeGradient = function() { //jshint ignore:line
                global.heatmap.set('gradient', global.heatmap.get('gradient') ? null : gradient);
            };
        }
});

module.exports = "heatmap-buttons";
