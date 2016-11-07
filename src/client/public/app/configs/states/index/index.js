module.exports = [{
    state: "index.home",
    url: "/home",
    views: {
        "": {
            templateUrl: "/app/configs/states/index/home.html",
            controller: ($scope) => {
                $scope.objectTest = {
                    text: "objectTest is working"
                };
            }
        }
    }
}];
