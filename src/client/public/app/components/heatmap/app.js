const angular = require("angular");

const app = angular.module("heatmap-module", [
    require("./buttons/app"),
    require("./model")
]);

app.component("heatmap", {
    templateUrl: "components/heatmap/index.html",
    bindings: {
        centerCoordinates: "<"
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

            this.getPoints(points => {
                global.heatmap.setData(points);
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

        function mapGoogleMapWithPoints(points) {
            return points.map(point => {
                return new google.maps.LatLng(point.latitude, point.longitude); //jshint ignore:line
            });
        }

        this.getPoints = (done) => {
            HeatmapModel.getHeatmapCoordinates({
                latitude: this.centerCoordinates.lat,
                longitude: this.centerCoordinates.lng
            }, (err, coordinates) => {
                const mappedGoogleCoordinates = mapGoogleMapWithPoints(coordinates);
                done(mappedGoogleCoordinates);
            });
        };

        this.getPolygonCoordinates = (done) => {
            HeatmapModel.getPolygonCoordinates({
                latitude: this.centerCoordinates.lat,
                longitude: this.centerCoordinates.lng
            }, (err, points) => {
                done(points);
            });
        };

        this.$onInit = () => {
            console.log("this.centerCoordinates ",this.centerCoordinates );
            this.initOnCenter(this.centerCoordinates || {
                lat: 42.358985,
                lng: -71.058595
            });
        };

        this.setHeatmapOnMapCenter = () =>  {
            const centerCoordinates = {
                lat: global.heatmap.map.center.lat(),
                lng: global.heatmap.map.center.lng()
            };
            this.initOnCenter(centerCoordinates);
        };

    }
});

module.exports = "heatmap-module";
