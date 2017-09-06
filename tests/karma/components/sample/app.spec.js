var describe,
    beforeEach,
    expect,
    it,
    inject,
    $compile,
    $scope,
    element,
    angular,
    $httpBackend,
    afterEach;

function getCtrl() {
    $scope.objectTest = {
        text: "objectTest is working"
    };

    element = angular.element("<sample-component-index test='component working' object-test='objectTest'></sample-component-index>");

    $compile(element)($scope);
    $scope.$digest();
    $httpBackend.flush();
    return element.isolateScope().$ctrl;
}
describe('Unit testing sample component', function() {

    beforeEach(module("envConfigs", 'sampleComponentModule', "templates"));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function($injector, _$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $httpBackend = $injector.get('$httpBackend');
        $scope = _$rootScope_.$new();

        $httpBackend.when('GET', '/app/envConfigs.json')
            .respond({
                serverUrl: '/localhost'
            });
        $httpBackend.when('GET', '/localhost/sample.json')
            .respond({
                worked: true
            });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    var $ctrl;
    beforeEach(function(){
        $ctrl = getCtrl();
    });


    describe('test controller', function() {
        it("test values", function() {
            expect($ctrl).toBeDefined();
            expect($ctrl.test).toEqual("component working");
            expect($ctrl.objectTest).toEqual({
                text: "objectTest is working"
            });
            expect(element.html()).toContain("component working");
            expect($ctrl.sampleJSON).toEqual({
                worked: true
            });
            $ctrl.test = "newValue";
            $scope.$digest();
            expect(element.html()).toContain("newValue");
        });
    });
});
