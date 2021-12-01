const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function taskcon(cb){
  console.log('第一個任務');
  cb(); 
}

// 任務的輸出 -> print cmd screen
exports.console = taskcon;



function taskA(cb){
  console.log('任務A');
  cb(); 
}

function taskB(cb){
  console.log('任務B');
  cb(); 
}

exports.a = series(taskA , taskB);  // 依序執行
exports.b = parallel(taskA , taskB);// 同時執行
