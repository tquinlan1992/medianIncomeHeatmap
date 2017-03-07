const gulp = require('gulp');
const createCleanTask = require("./gulpUtil/tasks/clean");
const createCopyTask = require("./gulpUtil/tasks/copy");
const createBrowserifyTask = require("./gulpUtil/tasks/browserify");
const createSassifyTask = require("./gulpUtil/tasks/sassify");
const clientBuildPath = "./build/client/";
const publicBuildPath = clientBuildPath + "./public/";
const publicBuildAppPath = publicBuildPath + "./app/";
const srcClientPath = "./src/client/";
const srcPublicPath = srcClientPath + "./public/";
const srcAppPath = srcPublicPath + './app/';
const createJshintTask = require("./gulpUtil/tasks/jshint");
const createKarmaTask = require("./gulpUtil/tasks/karma");

gulp.task('jshint', createJshintTask(['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js']));

gulp.task('jshint-src', createJshintTask(['src/**/*.js']));

gulp.task("front-end-tests", createKarmaTask(__dirname + "/frontEndTests.karma.conf.js"));

gulp.task("clean-client-html", createCleanTask([publicBuildAppPath + "**/*.html"]));
gulp.task("clean-client-js", createCleanTask([
    publicBuildAppPath + "./**/*.js",
    "!" + publicBuildAppPath + "./resources/**/*",
    "!" + publicBuildAppPath + "./js/**/*"
]));
gulp.task("clean-client-map", createCleanTask(publicBuildAppPath + "**/*.map"));
gulp.task("clean-client-server", createCleanTask([
    clientBuildPath + "server/**/*",
    clientBuildPath + "server.js",
    publicBuildPath + "/app/resources/**/*"
]));
gulp.task("clean-client-css-dependencies", createCleanTask(publicBuildAppPath + "./css/dependencies/**/*.css"));
gulp.task("clean-client-font-dependencies", createCleanTask(publicBuildAppPath + "./font/dependencies/**/*"));
gulp.task("clean-client-json", createCleanTask([publicBuildAppPath + "./**/*.json"]));
gulp.task("clean-client-css-custom", createCleanTask(publicBuildAppPath + "./css/custom/**/*.css"));

gulp.task('browserify-client-unminified', ["jshint-src", "clean-client-js", "clean-client-map"], createBrowserifyTask.rawJsStream(srcAppPath + './app.js', "app", publicBuildAppPath));
gulp.task('browserify-client-minified', ["jshint-src", "clean-client-js", "clean-client-map"], createBrowserifyTask.minJsStream(srcAppPath + './app.js', "app", publicBuildAppPath));


gulp.task("copy-server", ["clean-client-server"], createCopyTask(srcClientPath + "./**.js", srcClientPath, clientBuildPath));
gulp.task("copy-client-json", ["clean-client-json"], createCopyTask(srcPublicPath + "./**/*.json", srcPublicPath, publicBuildPath));
gulp.task("copy-html", ["clean-client-html"], createCopyTask(srcPublicPath + "./**/*.html", srcPublicPath, publicBuildPath));
gulp.task("copy-css-dependencies", ["clean-client-css-dependencies"], createCopyTask([
    "./node_modules/animate.css/animate.min.css",
    "./node_modules/font-awesome/css/font-awesome.min.css",
    "./node_modules/angular-material/angular-material.min.css"
], "./node_modules", publicBuildAppPath + "css/dependencies"));
gulp.task("copy-font-dependencies", ["clean-client-font-dependencies"], createCopyTask("./node_modules/font-awesome/fonts/*", "./node_modules", publicBuildAppPath + "fonts/dependencies"));

gulp.task("copy-client", [
    "copy-server",
    "copy-html",
    "copy-css-dependencies",
    "copy-font-dependencies",
    "copy-client-json"
]);

gulp.task("sassify-client", ["clean-client-css-custom"], createSassifyTask.buildMin(srcAppPath + './sass/index.scss', publicBuildAppPath + './css/custom'));

gulp.task('watch-build-client', function() {
    gulp.watch([srcAppPath + './**/*.js', "!./js/**/*spec.js"], ['browserify-client-unminified']);
    gulp.watch([srcAppPath + './**/*.html'], ['copy-html']);
    gulp.watch([srcAppPath + './**/*.json'], ['copy-client-json']);
    gulp.watch([srcClientPath + './server.js', "src/client/server/**/*"], ['copy-server']);
    gulp.watch(srcAppPath + './**/*.scss', ["sassify-client"]);
});

gulp.task('build-client', [
    "browserify-client-unminified",
    "copy-client",
    "sassify-client"
]);
