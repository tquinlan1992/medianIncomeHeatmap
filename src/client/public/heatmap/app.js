global.initMap = function() {
    global.map = new google.maps.Map(document.getElementById('map'), { //jshint ignore:line
        zoom: 13,
        center: {
            lat: 42.358985,
            lng: -71.058595
        },
        mapTypeId: 'satellite'
    });

    global.heatmap = new google.maps.visualization.HeatmapLayer({ //jshint ignore:line
        map: global.map
    });
};
