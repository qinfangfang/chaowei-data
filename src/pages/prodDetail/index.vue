<template>
  <div class="prod-detail">
    <div class="prod-detail-wrap">
      <div class="preview-module">
        <div class="preview-swiper">
          <el-carousel
            ref="previewSwiper"
            :interval="5000"
            :autoplay="true"
            indicator-position="none"
            arrow="always"
            @change="changeSlide"
          >
            <el-carousel-item v-for="item in previewList" :key="item?.imageUrl">
              <div class="slider-item">
                <img :src="item?.imageUrl" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="preview-list">
          <div
            class="preview-item"
            v-for="(item, idx) in previewList"
            :key="item?.imageUrl"
            @click="previewClick(item, idx)"
            :class="`${idx === index ? 'active' : ''}`"
          >
            <img :src="item?.imageUrl" alt="" />
          </div>
        </div>
      </div>
      <div class="product-info">
        <div class="product-price">
          <div class="name">{{ detail?.[`name${$i18n.locale}`] }}</div>
          <div class="code">{{ detail?.code }}</div>
          <div class="price">
            售价：{{ $i18n.locale == "Zh" ? "¥ " : "$ " }}
            {{ detail?.[`price${$i18n.locale == "Zh" ? "Cny" : "Usd"}`] }}
          </div>
          <div class="operate-btn">
            <div class="operate-item">直接购买</div>
            <div class="operate-item add-car">加入购物车</div>
          </div>
        </div>
        <div class="product-attributes">
          <div class="title">文件属性</div>
          <div class="attributes-list">
            <div
              class="attributes-item"
              v-for="item in attributesList"
              :key="item?.id"
            >
              <span>{{ item?.label }}</span>
              <template v-if="item?.tagList">
                <a v-for="tag in detail?.tags" :key="tag?.id">{{ tag?.[`name${$i18n.locale}`] }}</a>
              </template>
              <span v-else class="value" :class="item?.class">{{
                detail?.[`${item?.key}${$i18n.locale}`] ||
                detail?.[item?.uniqueKey] ||
                item?.text
              }}</span>
            </div>
          </div>
          <div class="product-desc">{{ detail?.[`desc${$i18n.locale}`] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getModelDetailById } from "@/api/index.js";

export default {
  data() {
    return {
      index: 0,
      previewList: [
        {
          id: 1,
          imageUrl:
            "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
        {
          id: 2,
          imageUrl:
            "http://gips1.baidu.com/it/u=1647344915,1746921568&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
        {
          id: 3,
          imageUrl:
            "http://gips2.baidu.com/it/u=295419831,2920259701&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
        {
          id: 4,
          imageUrl:
            "http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
      ],
      detail: {},
      attributesList: [
        { id: "1", label: "面片数：", text: "--", uniqueKey: "geometry" },
        { id: "2", label: "布线类型：", text: "--", key: "type" },
        {
          id: "3",
          label: "单位：",
          text: "--",
          key: `unit`,
        },
        { id: "4", label: "文件格式：", text: "--", uniqueKey: "format" },
        { id: "5", label: "贴图大小：", text: "--", uniqueKey: "mapSize" },
        {
          id: "6",
          label: "贴图格式：",
          text: "--",
          uniqueKey: "previewFormat",
        },
        { id: "7", label: "贴图类型：", text: "---", key: "mapType" },
        { id: "8", label: "模型大小：", text: "--", uniqueKey: "modelSize" },
        // { id: "9", label: "UV状态：", text: "--", key: "" },
        {
          id: "10",
          label: "法律信息：",
          text: "点击查看授权信息",
          class: "color-ed6336",
        },
        { id: "11", label: "标签：", text: "", tagList: [], key: 'tags' },
      ],
    };
  },
  methods: {
    changeSlide(val, idx) {
      // console.log("changeSlide>>>>>>", val, idx);
      this.index = val;
    },
    previewClick(item, index) {
      this.index = index;
      this.$refs.previewSwiper.setActiveItem(index);
    },

    // 处理轮播图展示
    handleSwiperData(data = {}) {
      const keyList = ["frontView", "fortyFiveView", "sideView", "grayView"];
      this.previewList = keyList.map((item, idx) => {
        return {
          id: idx,
          imageUrl: data?.[item],
        };
      });
    },
    // 获取模型详情数据
    async getModelDetailByIdData() {
      const params = this.$route.params;
      const res = await getModelDetailById({ id: params?.id });
      console.log("getModelDetailById>>>>>>>>", res);
      this.detail = res || {};
      this.handleSwiperData(res);
    },
  },
  created() {
    this.getModelDetailByIdData();
  },
};
</script>
<style lang="less" scoped>
.prod-detail {
  height: calc(100vh - 100px);
  padding-top: 40px;
  background-color: #f3f3f3;
  overflow: auto;
  .prod-detail-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }
  .preview-module {
    width: 520px;
    .preview-swiper {
      height: 930px;
      background-color: #ddd;
      border-radius: 7px;
      overflow: hidden;
      /deep/ .el-carousel {
        height: 100%;
      }
      /deep/ .el-carousel__container {
        height: 100%;
      }
      .slider-item {
        height: 930px;
        img {
          display: block;
          width: 100%;
        }
      }
      /deep/ .el-carousel__arrow {
        width: 50px;
        height: 50px;
        i {
          font-size: 24px;
        }
      }
    }
  }
  .preview-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    .preview-item {
      flex-shrink: 0;
      width: 160px;
      height: 280px;
      margin: 0 20px 20px 0;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
      border: 2px solid transparent;
      &.active {
        border-color: #ed6336;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .product-info {
    flex: 1;
    margin-left: 30px;
    .product-price {
      padding: 30px 65px 40px;
      background-color: #fff;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      font-weight: 400;
      .name {
        font-size: 24px;
        color: #000;
        line-height: 28px;
      }
      .code {
        margin-top: 10px;
        font-size: 16px;
        color: #ed6336;
        line-height: 19px;
      }
      .price {
        margin-top: 25px;
        font-size: 30px;
        color: #000;
        line-height: 35px;
      }
      .operate-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 25px;
        .operate-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 56px;
          font-size: 20px;
          color: #fff;
          background: #ed6336;
          border-radius: 4px 4px 4px 4px;
          cursor: pointer;
          font-weight: 500;
          &.add-car {
            margin-left: 20px;
          }
        }
      }
    }
    .product-attributes {
      margin-top: 30px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      background-color: #fff;
      .title {
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 65px;
        font-size: 24px;
        color: #ed6336;
        border-bottom: 1px solid #ddd;
      }
      .attributes-list {
        padding: 25px 65px 0;
        .attributes-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 20px;
          color: #666;
          line-height: 28px;
          .value {
            font-size: 16px;
          }
          .color-ed6336 {
            cursor: pointer;
            color: #ed6336;
          }
          a {
            padding: 0 8px;
            margin-right: 10px;
            color: #fff;
            font-size: 12px;
            background: #ed6336;
            border-radius: 4px 4px 4px 4px;
            line-height: 24px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .product-desc {
        margin-top: 40px;
        padding: 0 65px 50px;
        font-size: 16px;
        color: #666;
        line-height: 28px;
        // text-indent: 35px;
      }
    }
  }
}
</style>
