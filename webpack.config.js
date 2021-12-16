const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
   module: {
        rules: [{
            // 格式
            test: /\.css$/,
            //順序是由下到上 css > style
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './dist'
                }
              },
                //'style-loader', 會跟原本的衝突 
                'css-loader'
            ],
        }]

    },               // 處裡對應模組
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./[name].css"
        })
    ],             // 對應的插件
    //devServer: {},           // 服務器配置
    mode: 'development'      // 開發模式配置 production development
}