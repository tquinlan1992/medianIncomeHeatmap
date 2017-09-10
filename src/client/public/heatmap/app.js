var map, heatmap;

global.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), { //jshint ignore:line
        zoom: 13,
        center: {
            lat: 42.358985,
            lng: -71.058595
        },
        mapTypeId: 'satellite'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({ //jshint ignore:line
        map: map
    });
    heatmap.set('radius', 50);
    heatmap.setData(getPoints());
    // Define the LatLng coordinates for the polygon's path.
    var triangleCoords = [ { lat: 42.323985, lng: -71.058595 },
      { lat: 42.341485, lng: -71.041095 },
      { lat: 42.376484999999995, lng: -71.041095 },
      { lat: 42.393984999999994, lng: -71.058595 },
      { lat: 42.376484999999995, lng: -71.076095 },
      { lat: 42.341485, lng: -71.076095 },
      { lat: 42.323985, lng: -71.058595 } ];

    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({ //jshint ignore:line
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
};

global.toggleHeatmap = function() { //jshint ignore:line
    heatmap.setMap(heatmap.getMap() ? null : map);
};
var gradient = require("./gradient.json");
global.changeGradient = function() { //jshint ignore:line
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
};

global.changeRadius = function() { //jshint ignore:line
    heatmap.setData(getPoints().slice(0, 30));
    heatmap.set('radius', heatmap.get('radius') ? null : 50);
};

global.changeOpacity = function() { //jshint ignore:line
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
};

var points = require("./points.json");


function mapGoogleMapWithPoints(points) {
    return points.map(point => {
        return new google.maps.LatLng(point.latitude, point.longitude); //jshint ignore:line
    });
}
// Heatmap data: 500 Points
function getPoints() {
    return mapGoogleMapWithPoints(points);
}
