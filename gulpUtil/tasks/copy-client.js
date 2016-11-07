const gulp = require('gulp');

module.exports = {
    copyServer: function() {
        return gulp.src(["./src/client/server/**/*", "./src/client/server.js", "./src/client/public/app/resources/**/*"], {
                base: "./src/client"
            })
            .pipe(gulp.dest("build/client", {}));
    },
    copyHtml: function() {
        return gulp.src(["./src/client/public/**/*.html"], {
                base: "./src/client"
            })
            .pipe(gulp.dest("build/client", {})).on("end", () => {
            });
    },
    copyCssDependencies: function() {
        const src = [
            "./node_modules/animate.css/animate.min.css",
            "./node_modules/font-awesome/css/font-awesome.min.css",
            "./node_modules/angular-material/angular-material.min.css"
        ];
        return gulp.src(src, {
                base: "./node_modules"
            })
            .pipe(gulp.dest("build/client/public/app/css/dependencies", {}));
    },
    copyJsDependencies: function() {
        const src = [
            "./node_modules/angular-translate/dist/angular-translate.min.js"
        ];
        return gulp.src(src, {
                base: "./node_modules"
            })
            .pipe(gulp.dest("build/client/public/app/js/dependencies", {}));
    },
    copyFontDependencies: function() {
        const src = [
            "node_modules/font-awesome/fonts/*",
        ];
        return gulp.src(src, {
                base: "./node_modules"
            })
            .pipe(gulp.dest("build/client/public/app/fonts/dependencies", {}));
    }
};
