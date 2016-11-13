const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifycss = require('gulp-minify-css');

module.exports = {
    buildMin: function(src, dest) {
        return function() {
            return gulp.src(src)
                .pipe(sass().on('error', sass.logError))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(minifycss())
                .pipe(gulp.dest(dest));
        };
    }
};
