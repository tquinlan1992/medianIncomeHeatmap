const angular = require("angular");

const app = angular.module("heatmap-dialog-list", []);

app.factory("HeatmapDialogList", function($mdDialog) {
    "ngInject";
    class HeatmapDialogList {

        constructor() {
            $mdDialog.show({
                    controller: ($scope) => {
                        $scope.onHeatmapClick = () => {
                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'components/heatmapDialogList/index.html',
                    clickOutsideToClose: true,
                })
                .then(() => {

                }, () => {

                });
        }
    }

    return HeatmapDialogList;
});

module.exports = "heatmap-dialog-list";
