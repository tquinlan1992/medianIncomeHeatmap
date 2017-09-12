const angular = require("angular");

const app = angular.module("heatmap-list", []);

app.component("heatmapList", {
    templateUrl: "components/heatmapList/index.html",
    controller: function(HeatmapModel, $state) {
        "ngInject";
        HeatmapModel.getCoordinates((err, result) => {
            this.heatmaps = result;
        });

        this.goToHeatmap = (heatmap) => {
            $state.go("index.heatmapSearch.heatmap", {latitude: heatmap.centerCoordinates.latitude, longitude: heatmap.centerCoordinates.longitude, id: null}, {reload: 'index.heatmapSearch.heatmap'});
        };
    }
});

module.exports = "heatmap-list";
