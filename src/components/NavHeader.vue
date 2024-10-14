<template>
  <div class="nav-header">
    <div class="nav-left" @click="goHome">
      <img src="@/assets/imgs/navOrFooter/header_logo.png" alt="" />
    </div>
    <div class="nav-center">
      <div class="menu-item" v-for="(item, index) in menuList" :key="item.id" @click="mainJumpTo(item, index)">
        <span :class="`${activeTab == index ? 'active' : ''} ${locale}`">{{ item?.[`name${$i18n?.locale}`] }}</span>
        <div class="sub-menu-wrap" v-if="item?.subMenuList" :style="{ width: item?.with }">
          <!-- <div
          class="sub-menu-wrap"
          v-if="item?.subMenuList"
          :style="{ width: item?.with, display: index === 1 ? 'flex' : 'none' }"
        > -->
          <div class="sub-menu-list" v-for="child in item?.subMenuList" :key="child?.id">
            <div class="sub-menu-title" v-if="child?.[`name${locale}`]">
              {{ child?.[`name${locale}`] }}
            </div>
            <div class="sub-menu-item" v-for="(subItem, idx) in child?.list" :key="subItem?.id" @click.stop="
              jumpTo(subItem, {hasChild: Boolean(subItem?.childCategories?.length)})
              ">
              <a>
                {{ subItem?.label || subItem?.[`name${locale}`] }}
                <i v-if="subItem?.childCategories?.length" class="el-icon-arrow-right"></i>
              </a>
              <!-- <el-collapse-transition> -->
              <div class="sub-menu-item-wrap" v-show="activeChildId == subItem.id &&
                subItem?.childCategories?.length
                ">
                <div class="sub-menu-item-wrap-item" v-for="childItem in subItem?.childCategories" :key="childItem?.id"
                  @click.stop="jumpTo(childItem, {jumpFlag: true, parentId: subItem?.id})">
                  {{ childItem?.[`name${$i18n.locale}`] }}
                </div>
              </div>
              <!-- </el-collapse-transition> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-right">
      <div class="right-item language-icon" @click="changeLangEvent">
        {{ locale === "Zh" ? "中文" : ""
        }}<img v-if="locale === 'En'" src="@/assets/imgs/navOrFooter/language_icon.png" alt="" />
      </div>
      <div class="right-item personal-icon" @click.stop="showPersonalMenu">
        <img src="@/assets/imgs/navOrFooter/personal_icon.png" alt="" />
        <div class="personal-menu" :class="`${showMenu ? 'show' : ''}`" @click="(e) => e.stopPropagation()">
          <div class="personal-menu-item personal-name">
            {{ userInfo.nickname }}
          </div>
          <!-- <div class="personal-menu-item personal-email">{{userInfo.email}}</div> -->
          <div class="personal-menu-item pad-top8" @click="myAccount">
            {{ locale === "Zh" ? "我的账户" : "My Account" }}
          </div>
          <div class="personal-menu-item pad-top8" @click="changePassword">
            {{ locale === "Zh" ? "修改密码" : "Change Password" }}
          </div>
          <div class="personal-menu-item" @click="loginOut">
            {{ locale === "Zh" ? "退出" : "Exit" }}
          </div>
        </div>
      </div>
      <div class="right-item buy-car" @click="buyCar">
        <img src="@/assets/imgs/navOrFooter/buy_car_icon.png" alt="" /><span>{{ locale == "Zh" ? "¥ " : "$ "
        }}{{ $globalState.productTotalMoney }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getModelCategory } from "@/api/index.js";
import { getUserInfo, logOut } from "@/api/user.js";
import { goLoginNew, getToken } from "@/utils/index.js";
import Cookies from "js-cookie";

const menuList = [
  {
    id: 1,
    nameZh: "模型库",
    nameEn: "MODEL LIBRARY",
    with: "490px",
    redirect: true,
    path: "/modelList",
    subMenuList: [
      {
        id: "1.1",
        nameZh: "模型分类",
        nameEn: "Model Categories",
        list: [
          {
            id: "1.1.1",
            name: "所有全身模型",
            path: "/modelList",
          },
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
        nameZh: "场景分类",
        nameEn: "Scene Categories",
        list: [
          { id: "1.2.1", nameEn: "Casual", nameZh: "休闲", tagId: '13', redirect: true, path: '/modelList?tagId=13' },
          { id: "1.2.2", nameEn: "Business", nameZh: "商务", tagId: '14', redirect: true,  path: '/modelList?tagId=14' },
          { id: "1.2.3", nameEn: "Movement", nameZh: "运动", tagId: '17', redirect: true,  path: '/modelList?tagId=17' },
          { id: "1.2.4", nameEn: "Shopping", nameZh: "购物", tagId: '18', redirect: true,  path: '/modelList?tagId=18' }, // 暂定
        ],
      },
    ],
  },
  {
    id: 2,
    nameZh: "免费案例",
    nameEn: "FREE MODLE",
    with: "188px",
    redirect: true,
    path: "/freeModel",
    // subMenuList: [
    //   {
    //     id: "2.1",
    //     list: [
    //       {
    //         id: "2.1.1",
    //         isFree: 1,
    //         nameEn: "全身姿态模型",
    //         nameZh: "全身姿态模型",
    //         path: "/modelList?modelType=1&isFree=1",
    //       },
    //       {
    //         id: "2.1.2",
    //         isFree: 1,
    //         nameEn: "全身 A-pose模型",
    //         nameZh: "全身 A-pose模型",
    //         path: "/modelList?modelType=3&isFree=1",
    //       },
    //     ],
    //   },
    // ],
  },
  { id: 3, nameZh: "常见问题", nameEn: "FAQ", redirect: true, path: "/questionList" },
  { id: 4, nameZh: "教程", nameEn: "TUTORIALS", redirect: true, path: "" },
  { id: 5, nameZh: "联系我们", nameEn: "CONTACT US", redirect: true, path: "/contactUs" },
];

export default {
  name: "NavHeader",
  data() {
    return {
      showMenu: false,
      userInfo: {},
      menuList,
      language: localStorage.getItem("lang") || "En",
      activeChildId: "",
      activeTab: 0,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale == "Zh" ? "Zh" : "En";
    },
  },
  mounted() {
    const storageLang = localStorage.getItem("locale");
    const browserLang = navigator.language;
    const tar = storageLang || browserLang
    if (tar === "Zh" || tar === 'zh-CN') {
      this.language = "Zh"
      this.$i18n.locale = "Zh"
    } else {
      this.language = "En"
      this.$i18n.locale = "En"
    }
  },
  methods: {
    // 我的账户
    myAccount() {
      this.$router.push("/myAccount");
    },
    // 退出
    async loginOut() {
      const res = await logOut();
      console.log("退出>>>>>", res);
      if (!res?.code) {
        Cookies.set("token", "");
        window.location.replace("/home"); // TODO
      }
    },
    // 修改密码
    async changePassword() {
      this.$router.push("/changePassword");
    },
    // 展示个人中心菜单
    showPersonalMenu(e) {
      e.stopPropagation();
      if (!getToken()) {
        goLoginNew({ router: this.$router }); // TODO
        return;
      }
      this.showMenu = !this.showMenu;
    },
    // 购物车
    buyCar(e) {
      e.stopPropagation();
      if (!getToken()) {
        goLoginNew({ router: this.$router }); // TODO
        return;
      }
      this.$router.push("/buyCar");
    },
    // 去首页
    goHome() {
      this.$router.push("/home");
    },
    // 一级菜单跳转
    mainJumpTo(item, idx) {
      if(item?.redirect && item?.path) {
        this.activeTab = idx;
        item?.path && this.$router.push(item?.path);
        return;
      }
    },
    // 二级菜单跳转
    jumpTo(item, config = {}) {
      if(item?.redirect) {
        item?.path && this.$router.push(item?.path);
        return;
      }
      if (config.hasChild) {
        // 有子节点
        this.activeChildId =
          item?.id && this.activeChildId != item?.id ? item?.id : "";
        return;
      }
      config.jumpFlag && this.$router.push(`/modelList?parentId=${config.parentId}&modelType=${item?.id}${item?.isFree ? '&isFree=1' : ''}`);
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
    // 获取模型的子菜单
    getModelSubMenu(data = []) {
      const list = data || [];
      this.$set(this.menuList?.[0]?.subMenuList?.[0], "list", list);
      console.log("menuList>>>>>>>>", this.menuList);
      // this.$forceUpdate();
    },
    async getModelCategoryData() {
      const res = await getModelCategory();
      console.log("getModelCategory>>>>>>>", res);
      this.getModelSubMenu(res || []);
      localStorage.setItem("modelCategory_data", JSON.stringify(res || []));
    },
    // 获取用户信息
    async getUserInfoData() {
      // if (!getToken()) return;
      this.userInfo = await getUserInfo();
      console.log("用户信息>>>>>>>>", this.userInfo, this.$route);
    },
  },
  created() {
    this.getUserInfoData();
    this.getModelCategoryData();
    document.addEventListener("click", () => {
      this.showMenu = false;
    });
  },
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
    flex-shrink: 0;
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
    justify-content: space-around;
    height: 100%;
    flex: 1;
    margin: 0 20px 0 50px;

    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      // margin-right: 50px;
      height: 100%;
      cursor: pointer;

      span {
        font-size: 26px;
        padding: 5px 20px;
        white-space: nowrap;
        border-radius: 6px;
        &.En {
          font-size: 20px;
        }
        &.active {
          color: #fff;
          background: #ed6336;
        }
      }

      &:hover {
        span {
          color: #fff;
          background: #ed6336;
          border-radius: 6px;
        }
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
          border-radius: 6px;
        }
      }

      .sub-menu-wrap {
        position: absolute;
        left: 50%;
        top: 95px;
        display: none;
        flex: 1;
        padding: 30px 26px 30px;
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
        transform: translateX(-50%);

        &::after {
          content: "";
          position: absolute;
          left: 48%;
          top: -14px;
          transform: rotate(-45deg) translateX(-50%);
          border: 10px solid rgba(236, 236, 236, 0.98);
          z-index: 11;
        }

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
            // height: 18px;
            margin-bottom: 20px;
            font-size: 15px;

            a:hover {
              color: #ed6336;
            }

            .sub-menu-item-wrap {
              margin-top: 10px;
              padding: 10px;
              background-color: rgba(255, 255, 255, 0.4);
              border-radius: 4px;
              width: 174px;

              // &.show {
              //   display: block;
              // }
              .sub-menu-item-wrap-item {
                line-height: 18px;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e5e5;
                font-size: 14px;
                color: #333;

                &:last-child {
                  border-bottom-color: transparent;
                  padding-bottom: 0;
                  margin-bottom: 0;
                }

                &:hover {
                  color: #ed6336;
                }
              }
            }
          }
        }
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;
    display: flex;
    height: 100%;
    cursor: pointer;
    width: 360px;

    .right-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 20px;
      height: 100%;

      &:last-child {
        margin-left: 0;
      }

      &.language-icon {
        width: 50px;

        img {
          width: 30px;
          height: 30px;
        }
      }

      &.personal-icon {
        img {
          width: 30px;
          height: 32px;
        }

        .personal-menu {
          display: none;
          position: absolute;
          width: 150px;
          top: 80px;
          left: 50%;
          padding: 10px 0;
          border-radius: 4px;
          transform: translateX(-50%);
          background-color: rgba(236, 236, 236, 0.98);
          z-index: 5;

          &.show {
            display: block;
          }

          .personal-menu-item {
            position: relative;
            color: #000;
            font-size: 14px;
            line-height: 36px;
            text-align: center;

            &.pad-top8 {
              padding-top: 8px;
            }

            &:hover {
              color: #ed6336;
            }

            &.personal-name {
              margin: 0 15px;
              padding-bottom: 8px;
              line-height: 28px;
              color: #666;
              border-bottom: 1px solid #aaa;
            }
          }
        }
      }

      &.buy-car {
        height: auto;
        line-height: 38px;
        margin-top: -5px;
        display: flex;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
        }

        span {
          margin-left: -10px;
          padding: 0 8px 0;
          background: #ed6336;
          border-radius: 12px 12px 12px 12px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
