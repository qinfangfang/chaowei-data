<template>
  <div class="chaowei-footer">
    <div class="chaowei-info footer-item">
      <div class="footer-item-wrap">
        <div class="chaowei-logo">
          <img :src="footer.logoUrl" alt="" />
        </div>
        <div class="chaowei-title">{{ footer?.title }}</div>
        <div class="info-desc">
          <div class="desc-label">备案号：</div>
          {{ footer?.recordCode }}
        </div>
        <div class="info-desc">
          <div class="desc-label">许可证：</div>
          {{ footer?.licenceCode }}
        </div>
        <div class="info-desc">
          <div class="desc-label">网案：</div>
          {{ footer?.netCaseCode }}
        </div>
      </div>
    </div>
    <div class="footer-item" v-for="item in footer?.list" :key="item?.id">
      <div class="footer-item-wrap">
        <div class="item-title">{{ item?.title }}</div>
        <div class="sub-list">
          <div
            class="sub-item"
            v-for="subItem in item?.menuList"
            :key="subItem?.id"
          >
            {{ subItem?.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/imgs/navOrFooter/footer_logo.png";
export default {
  data() {
    return {
      footer: {
        logoUrl: Logo,
        title: "3D扫描人物超市",
        recordCode: "备案号XXXXXXXXXXX",
        licenceCode: "许可证XXXXXXXXXXX",
        netCaseCode: "网案XXXXXXXXXXXXX",
        list: [
          {
            id: "list-1",
            title: "模型分类",
            menuList: [
              { id: "list-1-1", name: "所有全身模型" },
              { id: "list-1-2", name: "全身姿态 A类模型" },
              { id: "list-1-3", name: "全身姿态 B类模型" },
              { id: "list-1-4", name: "全身 A-pose模型 " },
              { id: "list-1-5", name: "4D动态模型" },
              { id: "list-1-6", name: "PBR头脸部模型" },
            ],
          },
          {
            id: "list-2",
            title: "会员页面",
            menuList: [
              { id: "list-2-1", name: "交易记录" },
              { id: "list-2-2", name: "收藏夹" },
              { id: "list-2-3", name: "优惠券" },
            ],
          },
          {
            id: "list-3",
            title: "网站支持",
            menuList: [
              { id: "list-3-1", name: "联系我们" },
              { id: "list-3-2", name: "常见问题" },
              { id: "list-3-3", name: "模型授权范围" },
              { id: "list-3-4", name: "教程" },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.chaowei-footer {
  display: flex;
  justify-content: space-around;
  padding: 75px 0;
  color: #fff;
  background: linear-gradient(180deg, #404040 6%, #000000 100%);

  .chaowei-info {
    .chaowei-logo {
      width: 278px;
      height: 137px;
      img {
        display: block;
        width: 100%;
      }
    }
    .chaowei-title {
      height: 55px;
      margin-top: 15px;
      font-family: Inter, Inter;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
    }
    .info-desc {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-family: Inter, Inter;
      font-size: 24px;
      color: #a8a8a8;
      line-height: 28px;
      text-align: left;
      .desc-label {
        width: 100px;
        white-space: nowrap;
      }
    }
  }
  .footer-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 25%;
    &::after {
      position: absolute;
      right: 0%;
      top: 0%;
      content: "";
      height: 300px;
      border-right: 1px solid #e5e5e5;
    }
    &:last-child {
      &::after {
        content: "";
        border-right: none;
      }
    }
    .item-title {
      font-family: Inter, Inter;
      font-weight: bold;
      font-size: 24px;
      color: #e5e5e5;
      line-height: 28px;
      letter-spacing: 2px;
      text-align: left;
    }
    .sub-list {
      margin-top: 52px;
      .sub-item {
        margin-bottom: 20px;
        font-family: Inter, Inter;
        font-weight: 500;
        font-size: 16px;
        color: #e5e5e5;
        line-height: 19px;
        letter-spacing: 1px;
        text-align: left;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          color: #ED6336;
        }
      }
    }
  }
}
</style>
