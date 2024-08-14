const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint语法检查
  transpileDependencies: true,
  devServer: {
    // host: "0.0.0.0",
    // port: 8081,
    // open: true, // 自动打开浏览器
    proxy: {
      "/api": {
        target: "http://43.154.72.131:8200/", // 测试环境
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
});
