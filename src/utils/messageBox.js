// 引入Vue的h函数
import { h } from "vue";
import Login from "@/components/Login.vue";

function renderFunction(props = {}) {
  // 使用h函数创建VNode
  console.log("props>>>>>", props);
  return h(Login, { props: { visible: true, a: 1, b: 2, ...props } });
}

// 去登录
export const goLogin = (config) => {
  window.MessageBox({
    title: "消息",
    message: renderFunction(config),
    showCancelButton: false,
    showConfirmButton: false,
  });
};
