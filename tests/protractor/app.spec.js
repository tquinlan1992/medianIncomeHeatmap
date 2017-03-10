// spec.js
describe('Protractor Demo App', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000/home');
    });
    it('should have a title', function() {


        expect(browser.getTitle()).toEqual('Angular Gulp Template');
    });

    it('should have all tasks', function() {
        expect(element.all(by.repeater("x in $ctrl.tasks")).count()).toEqual(3);
    });
});
