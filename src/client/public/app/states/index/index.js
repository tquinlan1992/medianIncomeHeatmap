//const _ = require("lodash");

module.exports = [{
    name: "index.heatmapSearch.heatmap",
    url: "/heatmapMedianIncome?latitude?longitude?id",
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
        },
        heatmapId: ($stateParams) => {
            const heatmapId = $stateParams.id;
            return heatmapId;
        }
    }
},
{
    name: "index.heatmapSearch",
    url: "/heatmapSearch",
    component: "heatmapSearch"
},
{
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
