// 引入Vue的h函数
import Vue, { h } from "vue";
import Login from "@/components/Login.vue";
import { getToken } from "./index.js";

function renderFunction(props = {}) {
  // 使用h函数创建VNode
  console.log("props>>>>>", props);
  return h(Login, { props: { ...props, id: Math.random() } });
}

// 去登录
export const goLogin = (config) => {
  if (getToken()) return;
  window.MessageBox({
    title: "登录",
    message: renderFunction(config),
    showCancelButton: false,
    showConfirmButton: false,
    customClass: "login-dialog",
    beforeClose: (action, instance, done) => {
      console.log(2424, action, instance, done);
      done();
    },
  });
};

// 去登录
export const goLoginNew = (config) => {
  if (getToken() || window.instanceMessageBox) return;
  const constrcutor = Vue.extend(Login);
  const instance = new constrcutor(config);
  window.instanceMessageBox = instance;
  instance.$mount();
  document.body.appendChild(instance.$el);
};

// 关闭登录弹窗
export const closeLogin = () => {
  const modal = document.getElementsByClassName("v-modal")[0];
  const wrapper = document.getElementsByClassName('login-module')[0];
  document.body.removeChild(modal);
  document.body.removeChild(wrapper);
  window.instanceMessageBox = null;
};
