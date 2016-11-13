const gulp = require('gulp');
gulp.task('jshint', require("./gulpUtil/tasks/jshint"));
const createCleanTask = require("./gulpUtil/tasks/clean");
const createCopyTask = require("./gulpUtil/tasks/copy");
const createBrowserifyTask = require("./gulpUtil/tasks/browserify");
const createSassifyTask = require("./gulpUtil/tasks/sassify");

gulp.task("clean-client-html", createCleanTask(["build/client/public/app/**/*.html"]));
gulp.task("clean-client-js", createCleanTask([
    "build/client/public/app/**/*.js",
    "!build/client/public/app/resources/**/*",
    "!build/client/public/app/js/**/*"
]));
gulp.task("clean-client-map", createCleanTask("build/client/public/app/**/*.map"));
gulp.task("clean-client-server", createCleanTask([
    "./build/client/server/**/*",
    "./build/client/server.js",
    "./build/client/client/public/app/resources/**/*"
]));
gulp.task("clean-client-css-dependencies", createCleanTask("./build/client/public/app/css/dependencies/**/*.css"));
gulp.task("clean-client-font-dependencies", createCleanTask("./build/client/public/app/font/dependencies/**/*"));
gulp.task("clean-client-json", createCleanTask(["./build/client/public/app/**/*.json"]));
gulp.task("clean-client-css-custom", createCleanTask("./build/client/app/css/custom/**/*.css"));

gulp.task('browserify-client-unminified', ["clean-client-js", "clean-client-map"], createBrowserifyTask.rawJsStream('./src/client/public/app/app.js', "app", "./build/client/public/app"));
gulp.task('browserify-client-minified', ["clean-client-js", "clean-client-map"], createBrowserifyTask.minJsStream('./src/client/public/app/app.js', "app", "./build/client/public/app"));


gulp.task("copy-server", ["clean-client-server"], createCopyTask("./src/client/server.js", "./src/client", "build/client"));
gulp.task("copy-client-json", ["clean-client-json"], createCopyTask("./src/client/public/**/*.json", "./src/client", "build/client"));
gulp.task("copy-html", ["clean-client-html"], createCopyTask("./src/client/public/**/*.html", "./src/client", "build/client"));
gulp.task("copy-css-dependencies", ["clean-client-css-dependencies"], createCopyTask([
    "./node_modules/animate.css/animate.min.css",
    "./node_modules/font-awesome/css/font-awesome.min.css",
    "./node_modules/angular-material/angular-material.min.css"
], "./node_modules", "build/client/public/app/css/dependencies"));
gulp.task("copy-font-dependencies", ["clean-client-font-dependencies"], createCopyTask("node_modules/font-awesome/fonts/*", "./node_modules", "build/client/public/app/fonts/dependencies"));

gulp.task("copy-client", [
    "copy-server",
    "copy-html",
    "copy-css-dependencies",
    "copy-font-dependencies",
    "copy-client-json"
]);

gulp.task("sassify-client", ["clean-client-css-custom"], createSassifyTask.buildMin('./src/client/public/app/sass/index.scss', './build/client/public/app/css/custom'));

gulp.task('watch-build-client', function() {
    gulp.watch(['src/client/public/app/**/*.js'], ['browserify-client-unminified']);
    gulp.watch(['src/client/public/app/**/*.html'], ['copy-html']);
    gulp.watch(['src/client/public/app/**/*.json'], ['copy-client-json']);
    gulp.watch(['src/client/server.js', "src/client/server/**/*"], ['copy-server']);
    gulp.watch('src/client/public/app/**/*.scss', ["sassify-client"]);
});

gulp.task('build-client', [
    "browserify-client-unminified",
    "copy-client",
    "sassify-client"
]);
