<template>
  <div class="prod-detail">
    <div class="prod-detail-wrap" v-if="isExist">
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
            <el-carousel-item v-for="item in previewList" :key="item?.id">
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
            :key="item?.id"
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
            {{ $i18n.locale == "Zh" ? "售价" : "Price" }}：{{
              $i18n.locale == "Zh" ? "¥ " : "$ "
            }}
            {{ detail?.[`price${$i18n.locale == "Zh" ? "Cny" : "Usd"}`] }}
          </div>
          <div class="operate-btn">
            <div
              v-if="showDownload"
              class="operate-item"
              @click="downloadClick"
            >
              {{ isZh ? '下载模型' : 'Download Model'}}
            </div>
            <div
              v-if="!showDownload"
              class="operate-item"
              @click="directPurchase"
            >
              {{ isZh ? '直接购买' : 'Outright purchase'}}
            </div>
            <div v-if="!showDownload" class="operate-item add-car" @click="addBuyCar">
              {{ isZh ? '加入购物车' : 'Add to cart' }}
            </div>
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
              <span>{{ item?.[`label${$i18n.locale}`] }}：</span>
              <template v-if="item?.tagList">
                <a v-for="tag in detail?.tags" :key="tag?.id">{{
                  tag?.[`name${$i18n.locale}`]
                }}</a>
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
    <div class="empty-wrap" v-else>
      <el-empty :image-size="200" :description="description"></el-empty>
    </div>
    <PayDialog :visible="visible" :prodData="detail" @close="visible = false" />
  </div>
</template>
<script>
import { getModelDetailById, getModelDownloadUrlById } from "@/api/index.js";
import { addModelToCarById } from "@/api/buyCar.js";
import PayDialog from "@/components/payDialog.vue";

export default {
  data() {
    return {
      index: 0,
      isExist: true,
      description: "产品已下架或者不存在",
      previewList: [],
      detail: {},
      attributesList: [
        {
          id: "1",
          labelZh: "面片数",
          labelEn: "Geometry",
          text: "--",
          uniqueKey: "geometry",
        },
        {
          id: "2",
          labelZh: "布线类型",
          labelEn: "Type",
          text: "--",
          key: "type",
        },
        {
          id: "3",
          labelZh: "单位",
          labelEn: "Unit",
          text: "--",
          key: `unit`,
        },
        {
          id: "4",
          labelZh: "文件格式",
          labelEn: "File Format",
          text: "--",
          uniqueKey: "format",
        },
        {
          id: "5",
          labelZh: "贴图大小",
          labelEn: "Map Size",
          text: "--",
          uniqueKey: "mapSize",
        },
        {
          id: "6",
          labelZh: "贴图格式",
          labelEn: "Preview Format",
          text: "--",
          uniqueKey: "previewFormat",
        },
        {
          id: "7",
          labelZh: "贴图类型",
          labelEn: "Map Type",
          text: "---",
          key: "mapType",
        },
        {
          id: "8",
          labelZh: "模型大小",
          labelEn: "Model Size",
          text: "--",
          uniqueKey: "modelSize",
        },
        // { id: "9", label: "UV状态：", text: "--", key: "" },
        {
          id: "10",
          labelZh: "法律信息",
          labelEn: "法律信息",
          text: "点击查看授权信息",
          class: "color-ed6336",
        },
        {
          id: "11",
          labelZh: "标签",
          labelEn: "Tags",
          text: "",
          tagList: [],
          key: "tags",
        },
      ],
      downloadUrl: "",
      visible: false,
    };
  },
  components: {
    PayDialog,
  },
  computed: {
    isZh() {
      return this.$i18n.locale == 'Zh';
    },
    showDownload() {
      return this.detail?.free === true
        ? true
        : this.detail?.owned === true
        ? true
        : false;
    },
  },
  watch: {
    async showDownload(val) {
      // 显示下载按钮
      console.log("1111");
      if (val) {
        const res = await getModelDownloadUrlById({
          id: this.$route.params?.id,
        });
        if (!res.code && res?.url) {
          this.downloadUrl = res?.url;
        }
      }
    },
  },
  methods: {
    // 直接购买 TODO
    async directPurchase() {
      await this.addBuyCar();
      this.$router.push(`/buyCar?modelId=${this.detail?.id}`);
      // this.visible = true;
    },
    // 下载
    downloadClick() {
      window.open(this.downloadUrl, "_blank");
    },
    // 添加购物车
    async addBuyCar() {
      const params = this.$route.params;
      const res = await addModelToCarById({ id: params?.id });
      if (!res?.code) {
        this.$message.success("添加成功");
      } else {
        res?.msg && this.$message.error(res?.msg);
      }
      console.log("添加购物车>>>>>>>>>>", res);
    },
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
      const keyList = [
        "frontView",
        "fortyFiveView",
        "sideView",
        "fullView",
        "grayView",
      ];
      const arr = [];
      this.previewList = keyList.forEach((item, idx) => {
        const imgArr = data?.[item]?.split(",") || [];
        if (imgArr.length == 1) {
          arr.push({
            id: idx,
            imageUrl: imgArr[0],
          });
        } else if (imgArr.length > 1) {
          imgArr.forEach((imgItm, index) => {
            arr.push({
            id: `${idx}_${index}`,
            imageUrl: imgItm,
          });
          });
        }
      });
      this.previewList = arr;
      // return arr;
    },
    // 获取模型详情数据
    async getModelDetailByIdData() {
      const params = this.$route.params;
      const res = await getModelDetailById({ id: params?.id });
      console.log("getModelDetailById>>>>>>>>", res);
      if (res?.code == "3000") {
        this.isExist = false;
        this.description = res?.msg || this.isZh ? "产品已下架或者不存在" : 'The product has been removed or does not exist';
        return;
      }
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
  .empty-wrap {
    padding-top: 100px;
  }
  .prod-detail-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }
  .preview-module {
    width: 540px;
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
      width: 120px;
      height: 210px;
      margin: 0 20px 20px 0;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
      border: 2px solid transparent;
      &.active {
        border-color: #ed6336;
      }
      &:nth-child(4n) {
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
