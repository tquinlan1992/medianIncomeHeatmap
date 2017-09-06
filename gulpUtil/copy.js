const gulp = require('gulp');

module.exports = function(src, base, dest) {
    return function() {
        return gulp.src(src, {
                base: base
            })
            .pipe(gulp.dest(dest, {})).on("end", () => {});
    };
};
