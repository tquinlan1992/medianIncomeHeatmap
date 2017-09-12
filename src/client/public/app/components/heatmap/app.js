const angular = require("angular");
const _ = require("lodash");

const app = angular.module("heatmap-module", [
    require("./buttons/app"),
    require("./model")
]);

app.component("heatmap", {
    templateUrl: "components/heatmap/index.html",
    bindings: {
        centerCoordinates: "<?",
        heatmapId: "<?"
    },
    controller: function(HeatmapModel) {
        "ngInject";

        this.initOnCenter = (center) => {
            global.map = new google.maps.Map(document.getElementById('map'), { //jshint ignore:line
                zoom: 13,
                center,
                mapTypeId: 'satellite'
            });

            global.heatmap = new google.maps.visualization.HeatmapLayer({ //jshint ignore:line
                map: global.map
            });

            this.getCoordinates(coordinates => {
                const initCoordinates = coordinates;
                const initPoints = this.getPoints(initCoordinates);
                global.heatmap.setData(initPoints);
            });

            this.getPolygonCoordinates(coordinates => {
                var bermudaTriangle = new google.maps.Polygon({ //jshint ignore:line
                    paths: coordinates,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });
                bermudaTriangle.setMap(global.map);
            });

            global.heatmap.set('radius', 50);
        };



        this.initOnCenterWithHeatmap = (heatmap) => {
            const center = {
                lat: heatmap.centerCoordinates.latitude,
                lng: heatmap.centerCoordinates.longitude
            };
            global.map = new google.maps.Map(document.getElementById('map'), { //jshint ignore:line
                zoom: 13,
                center,
                mapTypeId: 'satellite'
            });

            global.heatmap = new google.maps.visualization.HeatmapLayer({ //jshint ignore:line
                map: global.map
            });

            const initCoordinates = heatmap.medianIncomeCoordinates;
            const initPoints = this.getPoints(initCoordinates);
            global.heatmap.setData(initPoints);



            const polygonCoordinates = _.map(heatmap.polygonCoordinates, coordinates => {
                return {
                    lat: coordinates.latitude,
                    lng: coordinates.longitude
                };
            });
            var bermudaTriangle = new google.maps.Polygon({ //jshint ignore:line
                paths: polygonCoordinates,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2
            });
            bermudaTriangle.setMap(global.map);

            global.heatmap.set('radius', 50);
        };

        function mapGoogleMapWithPoints(points) {
            return points.map(point => {
                return new google.maps.LatLng(point.latitude, point.longitude); //jshint ignore:line
            });
        }

        this.medianIncomeCoordinates = null;

        this.getCoordinates = done => {
            HeatmapModel.getHeatmapCoordinates({
                latitude: this.centerCoordinates.lat,
                longitude: this.centerCoordinates.lng
            }, (err, coordinates) => {
                this.medianIncomeCoordinates = coordinates;
                done(coordinates);
            });
        };

        this.getPoints = (coordinates) => {
            const mappedGoogleCoordinates = mapGoogleMapWithPoints(coordinates);
            return mappedGoogleCoordinates;
        };

        this.polygonCoordinates = null;

        this.getPolygonCoordinates = (done) => {
            HeatmapModel.getPolygonCoordinates({
                latitude: this.centerCoordinates.lat,
                longitude: this.centerCoordinates.lng
            }, (err, points) => {
                this.polygonCoordinates = points;
                done(points);
            });
        };

        this.saveHeatmap = () => {
            const medianIncomeCoordinates = this.medianIncomeCoordinates;
            const polygonCoordinates = _.map(this.polygonCoordinates, coordinates => {
                return {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                };
            });
            const centerCoordinates = {
                latitude: this.centerCoordinates.lat,
                longitude: this.centerCoordinates.lng
            };
            HeatmapModel.addHeatmap({
                medianIncomeCoordinates,
                polygonCoordinates,
                centerCoordinates
            }, (err, result) => {
                console.log("saved heatmap", result);
            });
        };

        this.$onInit = () => {
            if (this.heatmapId) {
                HeatmapModel.getHeatmap(this.heatmapId, (err, heatmap) => {
                    console.log("heatmap", heatmap);
                    this.initOnCenterWithHeatmap(heatmap);
                    return heatmap;
                });
            } else {
                this.initOnCenter(this.centerCoordinates || {
                    lat: 42.358985,
                    lng: -71.058595
                });
            }
        };

    }
});

module.exports = "heatmap-module";
