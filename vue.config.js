const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  // 解决跨域问题
  devServer: {
    port: 9999,              // 设置本地默认端口  选填
    // proxy: {                 // 设置代理，必须填
    //   '/': {              // 设置拦截器  拦截器格式:斜杠+拦截器名字(名字自己定）
    //     target: 'http://localhost:8888',     // 代理的目标地址
    //     changeOrigin: true,              // 是否设置同源，输入是的
    //     pathRewrite: {                   // 路径重写
    //       '/': ''                     // 选择忽略拦截器里面的单词
    //     }
    //   }
    // }
  },
  chainWebpack: (config) => {
    // 设置标题名称
    config
        .plugin('html')
        .tap(args => {
            args[0].title = '电影推荐系统'
            return args
        })
    // 添加svg文件
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()

    // 编译某些npm包里的es6代码
    config.module
        .rule('vxe')
        .test(/\.js$/)
        .include
        .add(resolve('node_modules/vxe-table'))
        .add(resolve('node_modules/vxe-table-plugin-antd'))
        .end()
        .use()
        .loader('babel-loader')
        .end()
  }
})
