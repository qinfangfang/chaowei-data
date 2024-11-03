const { defineConfig } = require("@vue/cli-service");
const  px2rem =  require('postcss-plugin-px2rem')
	// 插件的参数设置
	const px2remOptions = {
	  rootValue: 16,  //换算基数， 默认100 ,根元素字体的大小
	  unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
	  // propWhiteList: [], // 白名单
	  // propBlackList: [], // 黑名单
	  exclude:false,  //默认false，排除某些文件夹的方法，例如/(node_module)/ 。
	  // selectorBlackList: [], //要忽略并保留为 px 的选择器。可以是字符串或者正则表达式
	  // ignoreIdentifier: false, //（boolean/string）一种忽略单个属性的方法，当启用 ignoreIdentifier 时，replace将自动设置为true。
	  // replace: true, // （布尔值）替换包含 rems 的规则，而不是添加后备规则。
	  mediaQuery: false, //（布尔值）允许在媒体查询中转换px
	  minPixelValue: 0  // 设置要替换的最小像素值。 默认 0
	}
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
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins:[px2rem(px2remOptions)]
        }
      }
    }
  }
});
