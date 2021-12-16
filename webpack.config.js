const path = require('path');


module.exports = {
    // entry: ['./src/app.js' ,'./src/app2.js'], // 入口文件 //array
    entry: {
      home : './src/app.js',
      about : './src/app2.js' 
    }, // 入口文件 //object
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },             // 出口文件
    //module: {},              // 處裡對應模組
    //plugins: [],             // 對應的插件
    //devServer: {},           // 服務器配置
    mode: 'development'      // 開發模式配置 production development
}