({
    appDir: './', // 应用程序的目录（即<root>）。在这个文件夹下的所有文件将会被复制到dir参数标注的文件夹下。
    baseUrl: './js', // 相对于appDir，代表查找文件的锚点
    dir: './dist', // 这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下。
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/, // 排除r.js 与 build.js
    optimizeCss: 'standard', // 优化 CSS 的选项
    removeCombined: true, // 优化完的删除
    paths: {
        jquery: 'lib/jquery-1.9.1.min' // 跟 require.config一样， 给那些没有被模块话的js类库声明一下
    }
})