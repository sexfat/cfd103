const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function taskcon(cb) {
    console.log('第一個任務');
    cb();
}

// 任務的輸出 -> print cmd screen
exports.console = taskcon;



function taskA(cb) {
    console.log('任務A');
    cb();
}

function taskB(cb) {
    console.log('任務B');
    cb();
}

exports.a = series(taskA, taskB);  // 依序執行
exports.b = parallel(taskA, taskB);// 同時執行


//sass 編譯

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// 任務函式
function sassstyle() {
    return src('./src/sass/*.scss') //來源檔案
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))// sass編譯
        .pipe(autoprefixer())// 跨瀏覽器使用
        .pipe(cleanCSS({ compatibility: 'ie10' })) // 減小css檔案
        .pipe(sourcemaps.write()) // 來源原始檔 
        .pipe(dest('dist/css'))// 目的地檔案
}

//sass任務輸出
exports.sass = sassstyle;

// html template
const fileinclude = require('gulp-file-include');
function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}
exports.html = includeHTML;

//js uglify
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


function ugjs() {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })) //es6-es5
        .pipe(uglify()) // uglify js
        .pipe(dest('dist/js'));
}
exports.js = ugjs;


// 清除舊檔案

const clean = require('gulp-clean');

function clear() {
    return src('dist', { read: false, allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
        .pipe(clean({ force: true })); //強制刪除檔案 
}

exports.clearall = clear;


// 壓圖 大小

const imagemin = require('gulp-imagemin');
function imgmin() {
    return src('src/images/*.*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 10, progressive: true }) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
        ]))
        .pipe(dest('dist/images'))
}

exports.img = imgmin;






//監看所有任務
function watchall() {
    watch(['src/sass/*.scss', 'src/sass/**/*.scss'], sassstyle); // 監看哪些檔案（檔案變動）並執行sassstyle
    watch(['src/*.html', 'src/layout/*.html'], includeHTML); // 監看哪些檔案（檔案變動）並執行includeHTML 
    watch(['src/js/*.js', 'src/**/*.js'], ugjs);
}

exports.w = watchall;

//  圖片搬家
function moveimg() {
    return src('src/images/*.*').pipe(dest('dist/images'))
}





const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch(['src/sass/*.scss', 'src/sass/**/*.scss'], sassstyle).on('change', reload);
    watch(['src/*.html', 'src/layout/*.html'], includeHTML).on('change', reload);;
    watch(['src/js/*.js', 'src/**/*.js'], ugjs).on('change', reload);
    watch('src/images/*.*', moveimg)
    done();
}

exports.default = series(parallel(moveimg, includeHTML, sassstyle, ugjs ) , browser); //dev 開發使用

exports.packages = series(clear, parallel(includeHTML, sassstyle, ugjs), imgmin);





