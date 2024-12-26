// 引入Vue的h函数
import Vue from "vue";
import Login from "@/components/Login.vue";
import { getToken } from "./index.js";

// 去登录
export const goLoginNew = (config) => {
  if (getToken() || window.instanceMessageBox) return;
  const constrcutor = Vue.extend(Login);
  const instance = new constrcutor(config);
  window.instanceMessageBox = instance;
  instance.$mount();
  document.body.appendChild(instance.$el);
  document.body.style="paddingRight: 0;"
};

// 关闭登录弹窗
export const closeLogin = () => {
  document.body.classList.remove('el-popup-parent--hidden');  // 去除隐藏不能滚动
  const modal = document.getElementsByClassName("v-modal")[0];
  const wrapper = document.getElementsByClassName('login-module')[0];
  document.body.removeChild(modal);
  document.body.removeChild(wrapper);
  window.instanceMessageBox = null;
  document.body?.classList?.remove("el-popup-parent--hidden");
};
