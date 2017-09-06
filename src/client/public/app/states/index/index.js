module.exports = [
    {
        name: "index.home",
        url: "/home",
        views: {
            "": {
                component: "home"
            }
        }
    }, {
        name: "index.testParamId",
        url: "/testParamId/:idFromParam",
        component: "sampleUrlParam",
        resolve: {
            id: $stateParams => {
                "ngInject";
                return $stateParams.idFromParam;
            }
        }
    }
];
