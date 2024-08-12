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
      // 重定向到首页
      path: "/:pathMatch(.*)",
      redirect: "/home",
    },
  ],
});
