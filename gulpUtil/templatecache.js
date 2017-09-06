const templateCache = require('gulp-angular-templatecache');
const gulp = require("gulp");

module.exports = function(src, options, dest) {
    return function() {
        return gulp.src(src)
          .pipe(templateCache(options))
          .pipe(gulp.dest(dest));
    };
};
