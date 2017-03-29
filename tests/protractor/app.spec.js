// spec.js
describe('Protractor Demo App', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000/home');
    });
    it('should have a title', function() {


        expect(browser.getTitle()).toEqual('Angular Gulp Template');
    });

    it('should have a header with the english resource file', function() {


        expect(element(by.tagName("h1")).getInnerHtml()).toEqual('Header English');
    });

    it('should have all tasks', function() {
        expect(element.all(by.repeater("x in $ctrl.tasks")).count()).toEqual(3);
    });
});
