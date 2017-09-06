var gulp = require('gulp');
var angularProtractor = require('gulp-angular-protractor');

module.exports = configFile => {
    return () => {
        gulp.src(['./src/tests/*.js'])
            .pipe(angularProtractor({
                'configFile': configFile
            }))
            .on('error', e => {
                throw e;
            });
    };
};
