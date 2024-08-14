import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import VueI18n from "vue-i18n";
import ElementUI from "element-ui";
import "./assets/style/normalize.less";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(ElementUI);
// 1、创建中文语言包对象
const zh = {
  username: "用户名",
  email: "邮箱",
  mobile: "手机",
};
// 2、创建英文语言包对象
const en = {
  username: "Username",
  email: "Email",
  mobile: "Mobile",
};
// 3、组合语言包对象
const messages = {
  Zh: zh,
  En: en,
};
// 4、创建 VueI18n 实例，并为 messages 和 locale 属性赋值
const i18n = new VueI18n({
  messages,
  locale: "Zh",
});
Vue.config.productionTip = false;
// 5、挂载 i18n
new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
