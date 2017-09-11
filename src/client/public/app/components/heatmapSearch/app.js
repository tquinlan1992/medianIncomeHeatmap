const angular = require("angular");

const app = angular.module("heatmap-search", []);

app.component("heatmapSearch", {
            bindings: {
                centerCoordinates: '<'
            },
            templateUrl: "components/heatmapSearch/index.html",
            controller: function($state) {
                "ngInject";
                this.centerCoordinates = {
                    latitude: null,
                    longitude: null
                };
                this.setCoordinates = () => {
                    $state.go("index.heatmapSearch.heatmap", {
                            lat: Number(this.centerCoordinates.latitude),
                            lng: Number(this.centerCoordinates.longitude)
                        });
                    };
                }
            });

        module.exports = "heatmap-search";
