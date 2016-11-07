function createAngularConstantApp(nameOfModule, constantJSON) {
    return `var app = angular.module("${nameOfModule}", [
    ]);

    app.constant("${nameOfModule}", ${JSON.stringify(constantJSON)});`;
}

module.exports = createAngularConstantApp;
