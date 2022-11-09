//添加全局配置文件
const path = require('path');

module.exports = {
    lintOnSave: false,

    //开发服务器相关配置
    devServer: {
        contentBase: path.join(__dirname, 'public'),//配置静态资源目录
        port: 8085,

    },
    //配置webpack相关
    configureWebpack: {
        //解析
        resolve: {
            //配置路径别名
            alias: {
                '@v': path.resolve(__dirname, 'src/views'),
                '@c': path.resolve(__dirname, 'src/components'),
            }
        }
    }
}
