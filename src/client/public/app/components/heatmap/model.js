const angular = require("angular");
const _ = require("lodash");

class HeatmapModel {
    constructor({
        getHeatmapCoordinatesPromise,
        getPolygonCoordinatesPromise,
        getAddHeatmapPromise,
        getCoordinatesPromise,
        getHeatmapPromise
    }) {
        _.assign(this, {
            getHeatmapCoordinatesPromise,
            getPolygonCoordinatesPromise,
            getAddHeatmapPromise,
            getCoordinatesPromise,
            getHeatmapPromise
        });
    }

    getHeatmapCoordinates(centerCoordinates, done) {
        this.getHeatmapCoordinatesPromise(centerCoordinates).then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }

    getPolygonCoordinates(centerCoordinates, done) {
        this.getPolygonCoordinatesPromise(centerCoordinates).then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }

    addHeatmap({medianIncomeCoordinates, polygonCoordinates, centerCoordinates}, done) {
        this.getAddHeatmapPromise({medianIncomeCoordinates, polygonCoordinates, centerCoordinates}).then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }

    getCoordinates(done) {
        this.getCoordinatesPromise().then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }

    getHeatmap(id, done) {
        this.getHeatmapPromise().then(successResponse => {
            done(null, successResponse.data);
        }, errorResponse => {
            done(errorResponse);
        });
    }
}

const app = angular.module("heatmap-model", []);

app.factory("HeatmapModel", function(getEnvConfigs, $http) {
    "ngInject";

    const getHeatmapCoordinatesPromise = centerCoordinates => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/heatmapCoordinates?latitude=" + centerCoordinates.latitude + "&longitude=" + centerCoordinates.longitude);
        });
    };
    const getPolygonCoordinatesPromise = centerCoordinates => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/polygonCoordinates?latitude=" + centerCoordinates.latitude + "&longitude=" + centerCoordinates.longitude);
        });
    };

    const getCoordinatesPromise = () => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/");
        });
    };

    const getHeatmapPromise = heatmapId => {
        return getEnvConfigs.then(envConfigs => {
            return $http.get(envConfigs.data.serverUrl + "/coordinates/" + heatmapId);
        });
    };

    const getAddHeatmapPromise = (({medianIncomeCoordinates, polygonCoordinates, centerCoordinates}) => {
        return getEnvConfigs.then(envConfigs => {
            return $http.put(envConfigs.data.serverUrl + "/coordinates/", {medianIncomeCoordinates, polygonCoordinates, centerCoordinates});
        });
    });
    return new HeatmapModel({
        getHeatmapCoordinatesPromise,
        getPolygonCoordinatesPromise,
        getAddHeatmapPromise,
        getCoordinatesPromise,
        getHeatmapPromise
    });

});

module.exports = "heatmap-model";
