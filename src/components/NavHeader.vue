<template>
  <div class="nav-header">
    <div class="nav-left" @click="goHome">
      <img src="@/assets/imgs/navOrFooter/header_logo.png" alt="" />
    </div>
    <div class="nav-center">
      <div
        class="menu-item"
        v-for="item in menuList"
        :key="item.id"
        @click="jumpTo(item)"
      >
        <span>{{ item.name }}</span>
        <div
          class="sub-menu-wrap"
          v-if="item?.subMenuList"
          :style="{ width: item?.with }"
        >
          <div
            class="sub-menu-list"
            v-for="child in item?.subMenuList"
            :key="child?.id"
          >
            <div class="sub-menu-title" v-if="child?.title">
              {{ child?.title }}
            </div>
            <div
              class="sub-menu-item"
              v-for="subItem in child?.list"
              :key="subItem?.id"
              @click="jumpTo(subItem)"
            >
              {{ subItem?.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-right">
      <div class="right-item language-icon" @click="changeLangEvent">
        {{ language === "Zh" ? "中文" : ""
        }}<img
          v-if="language === 'En'"
          src="@/assets/imgs/navOrFooter/language_icon.png"
          alt=""
        />
      </div>
      <div class="right-item personal-icon">
        <img src="@/assets/imgs/navOrFooter/personal_icon.png" alt="" />
      </div>
      <div class="right-item buy-car" @click="buyCar">
        <img src="@/assets/imgs/navOrFooter/buy_car_icon.png" alt="" /><span
          >￥300</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getModelCategory } from "@/api/index.js";

const menuList = [
  {
    id: 1,
    name: "模型库",
    with: "490px",
    path: "/modelList",
    subMenuList: [
      {
        id: "1.1",
        title: "模型分类",
        list: [
          { id: "1.1.1", name: "所有全身模型", path: "/modelList" },
          {
            id: "1.1.2",
            name: "全身姿态 模型",
            path: "/modelList?modelType=1",
          },
          {
            id: "1.1.3",
            name: "全身姿态 高精度模型",
            path: "/modelList?modelType=2",
          },
          {
            id: "1.1.4",
            name: "全身 A-pose模型",
            path: "/modelList?modelType=3",
          },
          {
            id: "1.1.5",
            name: "全身 微动态模型",
            path: "/modelList?modelType=4",
          },
        ],
      },
      {
        id: "1.2",
        title: "场景分类",
        list: [
          { id: "1.2.1", name: "休闲" },
          { id: "1.2.2", name: "商务" },
          { id: "1.2.3", name: "购物" },
          { id: "1.2.4", name: "工装" },
          { id: "1.2.5", name: "民族服饰" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "免费案例",
    with: "188px",
    path: "/modelList?isFree=1",
    subMenuList: [
      {
        id: "2.1",
        list: [
          {
            id: "2.1.1",
            name: "全身姿态模型",
            path: "/modelList?modelType=1&isFree=1",
          },
          {
            id: "2.1.2",
            name: "全身 A-pose模型",
            path: "/modelList?modelType=3&isFree=1",
          },
        ],
      },
    ],
  },
  { id: 3, name: "常见问题", path: "/questionList" },
  { id: 4, name: "教程" },
  { id: 5, name: "联系我们", path: "/contactUs" },
];

export default {
  name: "NavHeader",
  data() {
    return {
      menuList,
      language: localStorage.getItem("lang") || "En"
    };
  },
  methods: {
    // 购物车
    buyCar() {
      this.$router.push("/buyCar");
    },
    // 去首页
    goHome() {
      this.$router.push("/home");
    },
    // 联系我们
    jumpTo(item) {
      if (item?.path) {
        this.$router.push(item.path);
      }
    },
    // 切换语言
    changeLangEvent() {
      if (this.language == "En") {
        localStorage.setItem("locale", "Zh");
        this.$i18n.locale = localStorage.getItem("locale");
        localStorage.setItem("lang", "Zh");
        this.language = "Zh";
      } else if (this.language == "Zh") {
        localStorage.setItem("locale", "En");
        this.$i18n.locale = localStorage.getItem("locale");
        localStorage.setItem("lang", "En");
        this.language = "En";
      }
      // console.log("i18n>>>>>>>", this.language);
    },
    async getModelCategoryData() {
      const res = await getModelCategory();
      console.log('getModelCategory>>>>>>>', res);
    },
  },
  created() {
    this.getModelCategoryData();
  }
};
</script>
<style lang="less" scoped>
.nav-header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 0;
  top: 0;
  align-items: center;
  width: 100%;
  height: 100px;
  background: #1e1e1e;
  border-radius: 0px 0px 0px 0px;
  font-family: Inter, Inter;
  font-size: 32px;
  color: #ffffff;
  line-height: 38px;
  z-index: 99;
  .nav-left {
    display: flex;
    align-items: center;
    width: 152px;
    height: 100%;
    margin-left: 88px;
    cursor: pointer;
    white-space: nowrap;
    img {
      display: block;
      width: 100%;
    }
  }
  .nav-center {
    display: flex;
    align-items: center;
    height: 100%;
    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 50px;
      height: 100%;
      cursor: pointer;
      span {
        font-size: 28px;
        padding: 5px 20px;
      }
      @media screen and (max-width: 1420px) {
        span {
          font-size: 22px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #ed6336;
      }
      &:nth-child(1):hover,
      &:nth-child(2):hover {
        color: #fff;
        .sub-menu-wrap {
          display: flex;
          justify-content: space-between;
        }
        span {
          background: #ed6336;
          border-radius: 6px 6px 6px 6px;
        }
      }
      .sub-menu-wrap {
        position: absolute;
        right: 0;
        top: 100px;
        display: none;
        flex: 1;
        padding: 30px 26px 80px;
        // width: 493px;
        // height: 359px;
        background: rgba(236, 236, 236, 0.98);
        border-radius: 9px 9px 9px 9px;
        font-family: Inter, Inter;
        font-weight: 500;
        font-size: 16px;
        color: #000;
        line-height: 19px;
        letter-spacing: 1px;
        text-align: left;
        z-index: 10;
        .sub-menu-title {
          position: relative;
          font-weight: bold;
          padding-bottom: 20px;
          margin-bottom: 20px;
          cursor: default;
          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 174px;
            height: 0px;
            border-bottom: 1px solid #000000;
          }
        }
        .sub-menu-list {
          flex: 1;
          .sub-menu-item {
            height: 18px;
            margin-bottom: 20px;
            font-size: 15px;
            &:hover {
              color: #ed6336;
            }
          }
        }
      }
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }
  .nav-right {
    display: flex;
    align-items: center;
    font-size: 20px;
    .right-item {
      display: flex;
      align-items: center;
      margin-right: 32px;
      height: 100%;
      &:last-child {
        margin-left: 0;
      }
      &.language-icon {
        width: 50px;
        img {
          width: 38px;
          height: 38px;
        }
      }
      &.personal-icon {
        img {
          width: 36px;
          height: 35px;
        }
      }
      &.buy-car {
        height: auto;
        line-height: 38px;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          // margin-left: 5px;
          padding: 0 8px 0;
          background: #ed6336;
          border-radius: 12px 12px 12px 12px;
        }
      }
    }
  }
}
</style>
