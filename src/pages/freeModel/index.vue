<template>
  <div class="free-model-page">
    <div class="free-model-banner">
      <div class="banner-pic">
        <img :src="headerImg" />
      </div>
      <div class="banner-text">
        <div class="banner-title">超写实人物模型商城</div>
        <div class="banner-subtitle">
          向你推荐次时代<br />超写实扫描人物模型
        </div>
      </div>
    </div>
    <div class="multi-model-wrap">
      <div class="title">选择最契合的写实人物模型</div>
      <div class="sub-title">
        网站包含大量3D扫描模特数据素材数量多、姿势丰富，
        可根据您的需求进行筛选。<br />
        包含不同场景 年龄 风格的人物数据
      </div>
      <div class="tab-list">
        <div
          class="tab-item"
          v-for="(item, idx) in tabList"
          :class="`${idx == activeTab ? 'active' : ''}`"
          :key="item?.id"
          @click="tabChange(item, idx)"
        >
          {{ item?.name }}
        </div>
      </div>
      <div class="tab-content">
        <div
          class="tab-content-item"
          v-for="tabItem in activeList"
          :key="tabItem?.id"
        >
          <div class="item-pic">
            <img
              :src="`${require(`@/assets/imgs/freeModel/style-${tabItem?.id}.png`)}`"
              alt=""
            />
            <!-- <img
              src="../../assets/imgs/freeModel/style-1-1.png"
              alt=""
            /> -->
          </div>
          <div class="item-name">{{ tabItem?.name }}</div>
        </div>
      </div>
    </div>
    <div class="free-wrap">
      <div class="free-text">
        <div class="desc-one">
          现在点击下载<br />免费的样例模型<br />开启你的超写实渲染之路
        </div>
        <div class="desc-second">
          矩阵相机生成的超写实三维人物模型，帮您省下寻找<br />高清素材的精力。使画面更真实、更高清、更有冲击力。<br />现在就点击下载，来试试扫描超写实模型。
        </div>
        <div class="download-btn">点击下载 免费样例</div>
        <div class="free-pic-list1">
          <div class="list1-item" v-for="item in list1">
            <div class="title">{{ item?.title }}</div>
            <div class="text">{{ item?.text }}</div>
          </div>
        </div>
      </div>
      <div class="free-pic">
        <img :src="imgUrl" />
      </div>
    </div>
    <div class="free-model-materials">
      <div class="materials-detail">
        <div class="detail-item" v-for="item in list2" :key="item?.id">
          <div v-for="listItem in item?.[`${$i18n.locale}List`]">
            {{ listItem }}
          </div>
        </div>
      </div>
    </div>
    <div class="more-model">
      <div class="title">大量扫描模型持续更新</div>
      <div class="more-desc">
        拥有超过8000个模型资源， 涵盖不同年龄 不同场景
        不同风格的人物数据。根据<br />您的需求正在不断更新中……
      </div>
      <div class="more-pic">
        <img :src="imgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Img1 from "@/assets/imgs/test/1.jpg";
import Img2 from "@/assets/imgs/freeModel/free_01.png";

export default {
  data() {
    return {
      imgUrl: Img1,
      headerImg: Img2,
      activeTab: 0,
      tabList: [
        {
          id: 1,
          name: "多场景人物数据",
          list: [
            { id: "1-1", name: "校园" },
            { id: "1-2", name: "运动" },
            { id: "1-3", name: "生活" },
            { id: "1-4", name: "商务" },
            { id: "1-5", name: "艺术" },
          ],
        },
        {
          id: 2,
          name: "多姿态 服饰 造型数据",
          list: [
            { id: "2-1", name: "姿态" },
            { id: "2-2", name: "APOSE" },
          ],
        },
        {
          id: 3,
          name: "多年龄段分布数据",
          list: [
            { id: "3-1", name: "儿童" },
            { id: "3-2", name: "成年人" },
          ],
        },
        {
          id: 4,
          name: "多地域、 民族、 肤色数据",
          list: [
            { id: "4-1", name: "中国" },
            { id: "4-2", name: "外国" },
          ],
        },
      ],
      activeList: [],
      list1: [
        {
          id: 1,
          title: "4K和8K纹理贴图",
          text: "贴图经过专业校色，还原真实的\n纹理细节，提供3套服装颜色选择",
        },
        {
          id: 1,
          title: "三万面、十万面模型",
          text: "由300万面模型优化得到的模\n型，可根据算力情况选用。",
        },
        {
          id: 1,
          title: "细节法线贴图",
          text: "保留原始模型上最真实的细\n节，让模型渲染更逼真",
        },
        {
          id: 1,
          title: "划分材质Mask贴图",
          text: "通过遮罩贴图，轻松控制模\n型不同位置的材质效果。",
        },
      ],
      list2: [
        {
          id: 1,
          ZhList: [
            "全身姿态模型\n¥129",
            "三万面 模型",
            "4K贴图",
            "颜色贴图  、法线贴图",
            "--",
          ],
          EnList: [
            "全身姿态模型\n¥129",
            "三万面 模型",
            "4K贴图",
            "颜色贴图  、法线贴图",
            "--",
          ],
        },
        {
          id: 2,
          ZhList: [
            "全身高精度姿态模型\n¥199",
            "三万面和十万面的模型",
            "4K 8K贴图",
            "三张颜色贴图  、法线贴图",
            "Mask 遮罩贴图",
          ],
          EnList: [
            "全身高精度姿态模型\n¥199",
            "三万面和十万面的模型",
            "4K 8K贴图",
            "三张颜色贴图  、法线贴图",
            "Mask 遮罩贴图",
          ],
        },
      ],
    };
  },
  methods: {
    tabChange(item, idx) {
      this.activeTab = idx;
      this.activeList = [...item?.list];
    },
  },
  created() {
    this.activeList = [...this.tabList?.[0].list];
  },
};
</script>
<style lang="less" scoped>
.free-model-page {
  .free-model-banner {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 600px;
    background-color: #242424;
    .banner-pic {
      height: 100%;
      img {
        display: block;
        height: 100%;
      }
    }
    .banner-text {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      color: #fff;
      .banner-title {
        font-weight: bold;
        font-size: 70px;
        line-height: 129px;
        letter-spacing: 50px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        text-align: center;
        white-space: nowrap;
      }
      .banner-subtitle {
        font-size: 25px;
        line-height: 40px;
        letter-spacing: 4px;
      }
    }
  }
  .multi-model-wrap {
    padding: 70px 140px 120px;
    background-color: #242424;
    color: #fff;
    .title {
      font-weight: bold;
      font-size: 40px;
      line-height: 60px;
      letter-spacing: 3px;
    }
    .sub-title {
      margin-top: 20px;
      font-size: 20px;
      letter-spacing: 1px;
      line-height: 30px;
    }
    .tab-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 60px;
      .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        padding: 0 30px;
        color: #000;
        background-color: #fff;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        &.active {
          color: #fff;
          background-color: #ed6336;
        }
      }
    }
    .tab-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 300px;
      margin: 60px auto 0;
      border-radius: 15px;
      background-color: #fff;
      min-width: 500px;
      .tab-content-item {
        color: #222;
        .item-pic {
          height: 170px;
          img {
            height: 100%;
          }
        }
        .item-name {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
  .free-wrap {
    display: flex;
    justify-content: space-between;
    background-color: #242424;
    color: #fff;
    .free-text,
    .free-pic {
      flex: 1;
      flex-shrink: 0;
    }
    .free-text {
      padding-left: 160px;
      color: #fff;
      .desc-one {
        font-weight: bold;
        font-size: 40px;
        line-height: 60px;
        letter-spacing: 3px;
      }
      .desc-second {
        margin-top: 80px;
        font-size: 20px;
        line-height: 30px;
      }
      .download-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 60px;
        margin-top: 60px;
        background: #ed6336;
        border-radius: 12px;
        cursor: pointer;
        font-weight: bold;
      }
      .free-pic-list1 {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        margin-top: 50px;
        width: 112%;
        z-index: 1;
        .list1-item {
          width: 45%;
          padding: 25px;
          margin: 0 15px 50px 0;
          border-radius: 12px;
          color: #000;
          background-color: #fff;
          .title {
            font-size: 28px;
            font-weight: bold;
          }
          .text {
            margin-top: 10px;
            font-size: 18px;
            white-space: pre;
          }
        }
      }
    }
    .free-pic {
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .free-model-materials {
    padding: 0 150px 40px;
    background-color: #242424;
    .materials-detail {
      height: 200px;
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      .detail-item {
        display: flex;
        height: 50%;
        justify-content: space-between;
        border-bottom: 1px solid #6b6b6b;
        &:last-child {
          border-bottom: none;
        }
        & > div {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          color: #000;
          font-size: 16px;
          font-weight: 500;
          &:nth-child(odd) {
            background-color: #f5f5f5;
          }
          &:nth-child(1) {
            background-color: #d9d9d9;
          }
        }
        &:nth-child(2) {
          & > div {
            &:nth-child(1) {
              color: #fff;
              background-color: #ed6336;
            }
          }
        }
      }
    }
  }
  .more-model {
    padding-top: 50px;
    color: #000;
    background-color: #ddd;
    .title {
      padding-left: 150px;
      font-weight: bold;
      font-size: 50px;
      line-height: 60px;
      letter-spacing: 3px;
    }
    .more-desc {
      padding-left: 150px;
      margin-top: 20px;
      font-size: 16px;
      line-height: 28px;
    }
    .more-pic {
      display: flex;
      justify-content: center;
      height: 300px;
      margin-top: 20px;
      img {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
