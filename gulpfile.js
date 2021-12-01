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

