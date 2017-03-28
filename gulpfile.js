"use strict";


var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    del = require("del"),
    tslint = require("gulp-tslint"),
    runSequence = require("run-sequence"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul");
//********CLEAN ************

gulp.task("clean-source", function (cb) {
    return del([
        "./src/**/*.js",
        "./src/**/*.d.ts",
        "./src/**/*.js.map"], cb)
})

gulp.task("clean-test", function (cb) {
    return del([
        "./test/**/*.js",
        "./test/**/*.d.ts",
        "./test/**/*.js.map"], cb)
})

gulp.task("clean-lib", function (cb) {
    return del([
        "./lib/**/*.js",
        "./lib/**/*.d.ts",
        "./lib/**/*.js.map"], cb)
})


gulp.task("clean", function (cb) {
    runSequence("clean-source", "clean-test", "clean-lib", cb);
});

/********* LINT */

gulp.task("lint", function () {

    var config = { formatter: "verbose", emitError: (process.env.CI) ? true : false };

    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
        .pipe(tslint(config))
        .pipe(tslint.report());

});


//******** BUILD *************

var tsProject = tsc.createProject("tsconfig.json", {
    declaration: false,
    noResolve: false,
    typescript: require("typescript")
});

gulp.task("build-source", function () {
    return gulp.src([
        "src/**/**.ts"
    ])
        .pipe(tsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .pipe(gulp.dest("src/"));
});

var tsTestProject = tsc.createProject("tsconfig.json", {
    declaration: false,
    noResolve: false,
    typescript: require("typescript")
});

gulp.task("build-test", function () {
    return gulp.src([
        "test/**/**.ts"
    ])
        .pipe(tsTestProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .pipe(gulp.dest("test"));
});


gulp.task("build", function (cb) {
    runSequence("build-source", "build-test", cb);
});


//******** TEST *************
gulp.task('pre-test', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(istanbul({ includeUntested: false }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
});

//******** DISTRIBUTION *************
gulp.task("build-lib", function () {
    return gulp.src(["src/**/*.js", "src/**/*.d.ts"])
        .pipe(gulp.dest("lib/source/"));
});

var tsDtsProject = tsc.createProject("tsconfig.json", {
    declaration: true,
    noResolve: false,
    typescript: require("typescript")
});

gulp.task("build-dts", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsDtsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .dts.pipe(gulp.dest("lib/dts"));
});

gulp.task("dist", function (cb) {
    runSequence("build-lib", "build-dts", cb);
});

/** DEFAULT */
gulp.task("default", function (cb) {
    runSequence(
        "clean",
        "build",
        "test",
        "dist",
        cb);
}); 