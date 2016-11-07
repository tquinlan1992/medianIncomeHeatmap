const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require("babelify");
const es2015 = require("babel-preset-es2015");
const ngAnnotate = require('gulp-ng-annotate');
const buildLocation = "./build/client/public/app";

function TreeviewBrowserifyBundle() {
    return browserify({
            entries: './src/client/public/app/app.js',
            debug: true
        })
        .transform(babelify, {
            presets: [es2015]
        })
        .bundle();
}

module.exports = {

    rawJsStream: function() {
        return TreeviewBrowserifyBundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(gulp.dest(buildLocation));
    },
    minJsStream: function() {
        return TreeviewBrowserifyBundle()
            .pipe(source('app.min.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(buildLocation));
    }
};
