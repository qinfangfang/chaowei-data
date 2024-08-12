<template>
  <div class="prod-detail">
    <div class="prod-detail-wrap">
      <div class="preview-module">
        <div class="preview-swiper">
          <el-carousel
            ref="previewSwiper"
            :interval='5000'
            :autoplay="true"
            indicator-position="none"
            arrow="always"
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
            v-for="(item, index) in previewList"
            :key="item?.imageUrl"
            @click="previewClick(item, index)"
          >
            <img :src="item?.imageUrl" alt="" />
          </div>
        </div>
      </div>
      <div class="product-info">
        <div class="product-price">
          <div class="name">超越维度 3D A类写实人物</div>
          <div class="code">SD_A_LiuYS_F_504</div>
          <div class="price">售价：￥ 200.00</div>
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
                <a v-for="tag in item?.tagList" :key="tag">{{ tag }}</a>
              </template>
              <span v-else class="value" :class="item?.class">{{
                item?.text
              }}</span>
            </div>
          </div>
          <div class="product-desc">
            此3D人物模型是由专业的“人体成像3D扫描阵列”在扫描真实模特后由专业人士处理完成。模型完整，造型生动、写实。配置了三万和十万面的两种模型，以应对不同的需求。文件包含的纹理贴图，法线贴图精度高、细节丰富，为了更方便的对贴图选区进行修改，我们还配置了遮罩贴图。
            您可以专注于你的建筑渲染、视觉特效或是游戏项目，释放你的想象力，不必为找不到合适的素材烦恼。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 2,
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
      attributesList: [
        { id: "1", label: "面片数：", text: "十万面 和 三万面" },
        { id: "2", label: "布线类型：", text: "三角面" },
        { id: "3", label: "单位：", text: "厘米" },
        { id: "4", label: "文件格式：", text: "OBJ FBX" },
        { id: "5", label: "贴图大小：", text: "2048 × 2048" },
        { id: "6", label: "贴图格式：", text: "JPG PNG" },
        { id: "7", label: "贴图类型：", text: "颜色贴图 法线贴图 遮罩贴图" },
        { id: "8", label: "模型大小：", text: "100M_200M" },
        { id: "9", label: "UV状态：", text: "已展开 不重叠" },
        {
          id: "10",
          label: "法律信息：",
          text: "点击查看授权信息",
          class: "color-ed6336",
        },
        { id: "11", label: "标签：", text: "", tagList: ["tag1", "tag2"] },
      ],
    };
  },
  methods: {
    previewClick(item, index) {
      this.$refs.previewSwiper.setActiveItem(index);
    },
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
      height: 600px;
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
        img {
          display: block;
          width: 100%;
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
        text-indent: 35px;
      }
    }
  }
}
</style>
