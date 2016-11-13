const gulp = require('gulp');
gulp.task('jshint', require("./gulpUtil/tasks/jshint"));
const cleanClient = require("./gulpUtil/tasks/clean-client");
const copyClient = require("./gulpUtil/tasks/copy-client");
const createCopyTask = require("./gulpUtil/tasks/copy");

gulp.task("clean-client-html", cleanClient.cleanFilesBasedOnMatch(["build/client/public/app/**/*.html"]));
gulp.task("clean-client-js", cleanClient.cleanFilesBasedOnMatch([
    "build/client/public/app/**/*.js",
    "!build/client/public/app/resources/**/*",
    "!build/client/public/app/js/**/*"
]));
gulp.task("clean-client-map", cleanClient.cleanFilesBasedOnMatch("build/client/public/app/**/*.map"));
gulp.task("clean-client-server", cleanClient.cleanFilesBasedOnMatch([
    "./build/client/server/**/*",
    "./build/client/server.js",
    "./build/client/client/public/app/resources/**/*"
]));
gulp.task("clean-client-css-dependencies", cleanClient.cleanFilesBasedOnMatch("./build/client/public/app/css/dependencies/**/*.css"));
gulp.task("clean-client-font-dependencies", cleanClient.cleanFilesBasedOnMatch("./build/client/public/app/font/dependencies/**/*"));
gulp.task("clean-client-js-dependencies", cleanClient.cleanFilesBasedOnMatch(["./build/client/public/app/js/dependencies/**/*.js"]));
gulp.task("clean-client-json", cleanClient.cleanFilesBasedOnMatch(["./build/client/public/app/**/*.json"]));
gulp.task("clean-client-css-custom", cleanClient.cleanFilesBasedOnMatch("./build/client/app/css/custom/**/*.css"));
gulp.task('browserify-client-unminified', ["clean-client-js", "clean-client-map"], require("./gulpUtil/tasks/browserify-client").rawJsStream);
gulp.task('browserify-client-minified', ["clean-client-js", "clean-client-map"], require("./gulpUtil/tasks/browserify-client").minJsStream);
gulp.task("copy-server", ["clean-client-server"], copyClient.copyServer);
gulp.task("copy-client-json", ["clean-client-json"], createCopyTask("./src/client/public/**/*.json", "./src/client", "build/client"));
gulp.task("copy-html", ["clean-client-html"], copyClient.copyHtml);
gulp.task("copy-css-dependencies", ["clean-client-css-dependencies"], copyClient.copyCssDependencies);
gulp.task("copy-js-dependencies", ["clean-client-js-dependencies"], copyClient.copyJsDependencies);
gulp.task("copy-font-dependencies", ["clean-client-font-dependencies"], copyClient.copyFontDependencies);
gulp.task("copy-client", [
    "copy-server",
    "copy-html",
    "copy-css-dependencies",
    "copy-js-dependencies",
    "copy-font-dependencies",
    "copy-client-json"
]);
gulp.task("sassify-client", ["clean-client-css-custom"], require("./gulpUtil/tasks/sassify-client").buildMin);

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
