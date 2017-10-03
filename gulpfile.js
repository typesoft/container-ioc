const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const tslint = require('gulp-tslint');

const tsProjectDevelopment = ts.createProject('tsconfig.json');
const tsProjectDist = ts.createProject('tsconfig.json', { noImplicitAny: true });

gulp.task('dev', ['compile', 'test'], function() {
    gulp.watch(['src/**/*.ts', '!src/**/*.d.ts'], function() {
        gulp.run('compile', 'test');
    });
});

gulp.task('compile', ['tslint'], function() {
    return gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
        .pipe(tsProjectDevelopment())
        .pipe(gulp.dest('src/'));
});

gulp.task('test', ['compile'], function() {
    return gulp.src('src/tests/**/*.spec.js', {read: false})
        .pipe(mocha({
            reporter: 'dot'
        }))
});

gulp.task('compile-dist', ['tslint'], function() {
    return gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
        .pipe(tsProjectDevelopment())
        .pipe(gulp.dest('dist/'));
});

gulp.task('test-dist', ['compile-dist'], function () {
    return gulp.src('dist/tests/**/*.spec.js', {read: false})
        .pipe(mocha({
            reporter: 'dot'
        }))
});

gulp.task("tslint", () => {
    return gulp.src(["src/**/*.ts", '!src/**/*.d.ts'])
        .pipe(tslint({
            configuration: "./tslint.json"

        }))
        .pipe(tslint.report());
    }
);

gulp.task('dist', ['tslint', 'compile-dist', 'test-dist']);

gulp.task("default", ["tslint", "compile", "test"]);