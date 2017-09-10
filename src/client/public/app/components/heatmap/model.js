const angular = require("angular");
const _ = require("lodash");

class HeatmapModel {
    constructor({
        getHeatmapCoordinatesURL,
        getPolygonCoordinatesURL
    }) {
        _.assign(this, {
            getHeatmapCoordinatesURL,
            getPolygonCoordinatesURL
        });
    }

    getHeatmapCoordinates(centerCoordinates, done) {
        this.getHeatmapCoordinatesURL(centerCoordinates).then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }

    getPolygonCoordinates(centerCoordinates, done) {
        this.getPolygonCoordinatesURL(centerCoordinates).then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }
}

const app = angular.module("heatmap-model", []);

app.factory("HeatmapModel", function(getEnvConfigs, $http) {
    "ngInject";

    const getHeatmapCoordinatesURL = centerCoordinates => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/heatmapCoordinates?latitude=" + centerCoordinates.latitude + "&longitude=" + centerCoordinates.longitude);
        });
    };
    const getPolygonCoordinatesURL = centerCoordinates => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/polygonCoordinates?latitude=" + centerCoordinates.latitude + "&longitude=" + centerCoordinates.longitude);
        });
    };
    return new HeatmapModel({
        getHeatmapCoordinatesURL,
        getPolygonCoordinatesURL
    });

});

module.exports = "heatmap-model";
