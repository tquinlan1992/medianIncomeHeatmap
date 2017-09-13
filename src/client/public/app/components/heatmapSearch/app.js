const angular = require("angular");

const app = angular.module("heatmap-search", []);

app.component("heatmapSearch", {
    bindings: {
        centerCoordinates: '<'
    },
    templateUrl: "components/heatmapSearch/index.html",
    controller: function($state, $stateParams, HeatmapDialogList) {
        "ngInject";
        this.$onInit = () => {
            const latitude = $stateParams.latitude;
            const longitude = $stateParams.longitude;
            this.centerCoordinates = {
                latitude: latitude || null,
                longitude: longitude || null
            };
        };
        this.setCoordinates = () => {
            $state.go("index.heatmapSearch.heatmap", {
                latitude: Number(this.centerCoordinates.latitude),
                longitude: Number(this.centerCoordinates.longitude)
            }, {
                reload: 'index.heatmapSearch.heatmap'
            });
        };
        this.openSavedHeatmapDialogList = () => {
            new HeatmapDialogList();
        };
    }
});

module.exports = "heatmap-search";
