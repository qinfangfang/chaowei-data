import VueRouter from "vue-router";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../pages/home/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/contactUs",
      name: "contactUs",
      component: () => import("../pages/contactUs/index.vue"),
      meta: {
        title: "联系我们",
      },
    },
    {
      path: "/modelList",
      name: "ModelList",
      component: () => import("../pages/modelList/index.vue"),
      meta: {
        title: "所有模型",
      },
    },
    {
      path: "/prodDetail/:id",
      name: "ProdDetail",
      component: () => import("../pages/prodDetail/index.vue"),
      meta: {
        title: "模型详情",
      },
    },
    {
      path: "/questionList",
      name: "questionList",
      component: () => import("../pages/questionList/index.vue"),
      meta: {
        title: "常见问题",
      },
    },
    {
      path: "/buyCar",
      name: "buyCar",
      component: () => import("../pages/buyCar/index.vue"),
      meta: {
        title: "购物车",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/register/index.vue"),
      meta: {
        hideNavBar: true,
        title: "注册",
      },
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: () => import("../pages/forgetPassword/index.vue"),
      meta: {
        hideNavBar: true,
        title: "忘记密码",
      },
    },
    {
      path: "/changePassword",
      name: "changePassword",
      component: () => import("../pages/changePassword/index.vue"),
      meta: {
        hideNavBar: true,
        title: "修改密码",
      },
    },
    {
      path: "/myAccount",
      name: "myAccount",
      component: () => import("../pages/myAccount/index.vue"),
      meta: {
        title: "我的账户",
      },
    },
    {
      path: "/PaySuccess",
      name: "PaySuccess",
      component: () => import("../pages/paySuccess/index.vue"),
      meta: {
        title: "支付成功",
      },
    },
    {
      // 重定向到首页
      path: "/:pathMatch(.*)",
      redirect: "/home",
    },
  ],
});
