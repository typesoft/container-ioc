
const { src, dest, series }= require('gulp');
const gulp_ts = require('gulp-typescript');
const gulp_mocha = require('gulp-mocha');
const gulp_tslint = require('gulp-tslint');

const spc = "           ";
const src_folder =  'src/';
const dist_folder = 'dist/';

const src_files = ['src/**/*.ts', '!src/**/*.d.ts'];
const src_test = 'src/tests/**/*.spec.js';
const dist_test = 'dist/tests/**/*.spec.js';

const tsProjectDevelopment = gulp_ts.createProject('tsconfig.json');
const tsProjectDist = gulp_ts.createProject('tsconfig.json', { noImplicitAny: true });

// gulp.task('dev', ['compile', 'test'], function() {
//     gulp.watch(['src/**/*.ts', '!src/**/*.d.ts'], function() {
//         gulp.run('compile', 'test');
//     });
// });
exports.dev = series(compile, test);

// gulp.task('compile', ['tslint'], function() {
//     return gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
//         .pipe(tsProjectDevelopment())
//         .pipe(gulp.dest('src/'));
// });
function compile(){
     console.log(spc+`compile processing: updating tsconfig.json in ${ src_folder } folder...`);
     return src( src_files )
        .pipe( tsProjectDevelopment() )
        .pipe( dest( src_folder ) );
}
exports.compile = series( tslint, compile);


// gulp.task('test', ['compile'], function() {
//     return gulp.src('src/tests/**/*.spec.js', {read: false})
//         .pipe( gulp_mocha({ reporter: 'dot' }))
// });
function test(){
     console.log(spc+"test processing: running test...")
     return src( src_test , {read: false})
        .pipe( gulp_mocha( { reporter: 'dot' } )) // spec for details
}
exports.test = series(tslint, compile, test);

function verbose_test(){
     console.log(spc+"test processing: running test...")
     return src( src_test , {read: false})
        .pipe( gulp_mocha( { reporter: 'spec' } )) 
}
exports.verbose_test = series(tslint, compile, verbose_test);

// gulp.task("tslint", () => {
//     return gulp.src(["src/**/*.ts", '!src/**/*.d.ts'])
//         .pipe(tslint({
//             configuration: "./tslint.json"
//         }))
//         .pipe(tslint.report());
//     }
// );
function tslint(){
     console.log(spc+"tslint processing: checking typescript coding quality (against coding rules)...");
     return src( src_files )
        .pipe( gulp_tslint( { configuration: "./tslint.json" } ))
        .pipe(gulp_tslint.report());
}
exports.tslint = tslint;

// gulp.task('compile-dist', ['tslint'], function() {
//     return gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
//         .pipe(tsProjectDevelopment())
//         .pipe(gulp.dest('dist/'));
// });
function compile_dist(){
     console.log(spc+`compile_dist processing: updating tsconfig.json and ${ dist_folder } folder...`);
     return src( src_files )
        .pipe( tsProjectDevelopment() )
        .pipe( dest( dist_folder ) );
}
exports.compile_dist = series(tslint, compile_dist);

// gulp.task('test-dist', ['compile-dist'], function () {
//     return gulp.src('dist/tests/**/*.spec.js', {read: false})
//         .pipe(gulp_mocha({ reporter: 'dot' }))
// });
function test_dist(){
     console.log(spc+`test_dist processing: running test in ${ dist_folder } folder...`);
     return src( dist_test , {read: false})
         .pipe( gulp_mocha( { reporter: 'dot' } ))
}
exports.test_dist = series(tslint, compile_dist, test_dist);

// gulp.task('dist', ['tslint', 'compile-dist', 'test-dist']);
exports.dist = series( tslint, compile_dist, test_dist );

// gulp.task("default", ["tslint", "compile", "test"]);
exports.default = series( tslint, compile, test );
