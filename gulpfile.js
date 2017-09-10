const gulp = require('gulp');
const createCleanTask = require("./gulpUtil/clean");
const createCopyTask = require("./gulpUtil/copy");
const createBrowserifyTask = require("./gulpUtil/browserify");
const createSassifyTask = require("./gulpUtil/sassify");
const clientBuildPath = "./build/client/";
const publicBuildPath = clientBuildPath + "./public/";
const publicBuildAppPath = publicBuildPath + "./app/";
const tempBuildPathToBrowserifyAppWithTemplateCache = "./build/tempAppWithTemplateCache/";
const srcClientPath = "./src/client/";
const srcPublicPath = srcClientPath + "./public/";
const srcAppPath = srcPublicPath + './app/';
const createJshintTask = require("./gulpUtil/jshint");
const createKarmaTask = require("./gulpUtil/karma");
const createProtractorTask = require("./gulpUtil/protractor");
const templatecache = require("./gulpUtil/templatecache");
const karmaTests = "./build/karmaTests/client/";

function createTemplateCache(dest) {
    return templatecache("src/client/public/app/**/*.html", {standalone:true, templateFooter: "}]);module.exports='templates';"}, dest);
}


gulp.task('jshint', createJshintTask(['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js']));

gulp.task("clean-client-html", createCleanTask([publicBuildAppPath + "**/*.html"]));

gulp.task("cleanTempAppWithTemplateCache", createCleanTask([tempBuildPathToBrowserifyAppWithTemplateCache]));

gulp.task("copyTemplateCacheToBrowserifyWithApp", createTemplateCache(tempBuildPathToBrowserifyAppWithTemplateCache));

gulp.task("copySrcAppJsToTempToCombineWithTemplateCache", ["cleanTempAppWithTemplateCache", "copyTemplateCacheToBrowserifyWithApp"], createCopyTask(srcAppPath + "./**", srcAppPath, tempBuildPathToBrowserifyAppWithTemplateCache));

gulp.task('jshint-src', createJshintTask(['src/**/*.js', "!src/**/*spec.js"]));

gulp.task("cleanKarmaTest", createCleanTask([karmaTests + "*/**"]));

gulp.task("copyTemplateCacheToBrowserifyWithAngularApp", createTemplateCache(karmaTests));

gulp.task("copyAngularAppTokarmaTest", createCopyTask(srcAppPath + "**/*", srcAppPath, karmaTests));

gulp.task('browserify-client-angularApp', ["cleanKarmaTest", "copyTemplateCacheToBrowserifyWithAngularApp", "copyAngularAppTokarmaTest"], createBrowserifyTask.rawJsStream(karmaTests + './angularApp.js', "app", "./build/test/client/"));



gulp.task("karma-tests", ["browserify-client-angularApp"], createKarmaTask(__dirname + "/karma.conf.js"));

gulp.task("protractor-tests", createProtractorTask("./protractor.conf.js"));

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

gulp.task('browserify-client-unminified', ["copySrcAppJsToTempToCombineWithTemplateCache", "jshint-src", "clean-client-js", "clean-client-map"], createBrowserifyTask.rawJsStream(tempBuildPathToBrowserifyAppWithTemplateCache + './app.js', "app", publicBuildAppPath));
gulp.task('browserify-client-minified', ["copySrcAppJsToTempToCombineWithTemplateCache", "jshint-src", "clean-client-js", "clean-client-map"], createBrowserifyTask.minJsStream(tempBuildPathToBrowserifyAppWithTemplateCache + './app.js', "app", publicBuildAppPath));

gulp.task("browserify-heatmap", createBrowserifyTask.rawJsStream(srcPublicPath + './heatmap/app.js', "app", publicBuildPath + "/heatmap"));

gulp.task("copy-server", ["clean-client-server"], createCopyTask(srcClientPath + "./**.js", srcClientPath, clientBuildPath));
gulp.task("copy-client-json", ["clean-client-json"], createCopyTask(srcPublicPath + "./**/*.json", srcPublicPath, publicBuildPath));
gulp.task("copy-html", ["clean-client-html"], createCopyTask(srcPublicPath + "./index.html", srcPublicPath, publicBuildPath));
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
    gulp.watch([srcAppPath + '**/*.js', srcAppPath + '**/*.html', srcAppPath + '**/*.json'], ['browserify-client-unminified']);
    gulp.watch([srcAppPath + './**/*.json'], ['copy-client-json']);
    gulp.watch([srcClientPath + './server.js', "src/client/server/**/*"], ['copy-server']);
    gulp.watch(srcAppPath + './**/*.scss', ["sassify-client"]);
    gulp.watch(srcPublicPath + './heatmap/**/*.js', ["browserify-heatmap"]);
});

gulp.task('build-client', [
    "browserify-client-unminified",
    "browserify-heatmap",
    "copy-client",
    "sassify-client"
]);
