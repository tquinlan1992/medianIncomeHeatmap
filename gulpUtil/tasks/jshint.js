const gulp = require('gulp');
const packageJSON = require('../../package');
const jshintConfig = packageJSON.jshintConfig;
const jshint = require('gulp-jshint');

module.exports = function(src) {
    return function() {
        return gulp.src(src)
            .pipe(jshint(jshintConfig))
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));
    };
};
