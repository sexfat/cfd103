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

// 任務函式
function sassstyle() {
    return src('./src/sass/style.scss') //來源檔案
        .pipe(sass.sync().on('error', sass.logError))// sass編譯
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




//監看所有任務
function watchall() {
    watch(['src/sass/*.scss', 'src/sass/**/*.scss'], sassstyle); // 監看哪些檔案（檔案變動）並執行sassstyle
    watch(['src/*.html', 'src/layout/*.html'], includeHTML); // 監看哪些檔案（檔案變動）並執行includeHTML 
}

exports.w = watchall;


