//const _ = require("lodash");

module.exports = [{
    name: "index.heatmap",
    url: "/heatmapMedianIncome?latitude?longitude",
    component: "heatmap",
    resolve: {
        centerCoordinates: ($stateParams) => {
            "ngInject";
            const latitude = $stateParams.latitude;
            const longitude = $stateParams.longitude;
            if (!isNaN(latitude) && !isNaN(longitude)) {
                return {
                    lat: Number(latitude),
                    lng: Number(longitude)
                };
            }
        }
    }
},{
    name: "index.testParamId",
    url: "/testParamId/:idFromParam",
    component: "sampleUrlParam",
    resolve: {
        id: $stateParams => {
            "ngInject";
            return $stateParams.idFromParam;
        }
    }
}];
