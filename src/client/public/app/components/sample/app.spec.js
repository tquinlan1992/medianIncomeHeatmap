var describe,
    beforeEach,
    expect,
    it,
    inject,
    $compile,
    $scope,
    element,
    angular;

describe('Unit testing sample component', function() {

    // Load the myApp module, which contains the directive
    beforeEach(module("envConfigs", 'sampleComponentModule', 'app.templates'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function($injector, _$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $scope = _$rootScope_.$new();

    }));

    describe('test controller', function() {
        it("test values", function() {
            $scope.objectTest = {
                text: "objectTest is working"
            };

            element = angular.element("<sample-component-index test='component working' object-test='objectTest'></sample-component-index>");

            $compile(element)($scope);
            $scope.$digest();
            var isolated = element.isolateScope();
            var $ctrl = isolated.$ctrl;
            expect($ctrl).toBeDefined();
            expect($ctrl.test).toEqual("component working");
            expect($ctrl.objectTest).toEqual({
                text: "objectTest is working"
            });
            expect(element.html()).toContain("component working");
            $ctrl.test = "newValue";
            $scope.$digest();
            expect(element.html()).toContain("newValue");
        });
    });
});
