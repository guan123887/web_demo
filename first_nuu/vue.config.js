module.exports = {
  // 基本路径
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 9090,
    https: false,
    hotOnly: false,
    proxy: {
      "/BeMoralOfficial": {
        target: "http://****.****.****.****:8001", //目标接口域名
        secure: false, //false为http访问，true为https访问
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/BeMoralOfficial": "/BeMoralOfficial", //重写接口
        },
      },
    }, // 设置代理
    before: (app) => {},
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};
