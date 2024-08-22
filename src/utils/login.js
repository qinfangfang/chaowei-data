// 引入Vue的h函数
import { h } from "vue";
import Login from "@/components/Login.vue";
import { getToken } from "./index.js";

function renderFunction(props = {}) {
  // 使用h函数创建VNode
  console.log("props>>>>>", props);
  return h(Login, { props: { ...props } });
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

// 关闭登录弹窗
export const closeLogin = () => {
  window.MessageBox.close();
  const modal = document.getElementsByClassName("v-modal")[0];
  if (modal) modal.style.display = "none";
};
