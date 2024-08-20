<template>
  <div class="chaowei-home">
    <div class="model-list">
      <template v-for="item in modelList">
        <div class="model-item" :key="item.id">
          <div class="model-item-pic">
            <img :src="item?.imgUrl" alt="" />
          </div>
          <div class="model-item-explain">
            <div class="main-tilte">{{ item?.title }}</div>
            <div class="sub-tilte">{{ item.subTitle }}</div>
            <div class="button-list">
              <div
                class="button-item"
                v-for="btnItem in item?.buttonList"
                :key="btnItem?.id"
                :style="{ backgroundColor: btnItem?.bgColor }"
              >
                {{ btnItem?.name }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="chaowei-partner">
      <div class="partner-title">主要服务客户 （优质合作伙伴）</div>
      <div class="partner-pic">
        <img src="@/assets/imgs/home/home_6.png" alt="" />
      </div>
    </div>
    <Footer></Footer>
    <Login :visible="visible" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Home1 from "@/assets/imgs/home/home_1.png";
import Home2 from "@/assets/imgs/home/home_2.png";
import Home3 from "@/assets/imgs/home/home_3.png";
import Home4 from "@/assets/imgs/home/home_4.png";
import Home5 from "@/assets/imgs/home/home_5.png";
import Login from "@/components/Login.vue";

export default {
  name: "homePage",
  data() {
    return {
      visible: true,
      modelList: [
        {
          id: "1",
          imgUrl: Home1,
          height: "856px",
          title: "适合中国创作者的\n3D扫描人物超市",
          subTitle: "多场景 · 多姿态 · 多民族 简单易用的亚洲扫描模型库",
          buttonList: [
            { id: "1.1", name: "立即挑选！", bgColor: "#ED6336" },
            { id: "1.2", name: "下载模板", bgColor: "#A8A8A8" },
          ],
        },
        {
          id: "2",
          imgUrl: Home2,
          height: "754px",
          title: "全身 A-POSE 模型",
          subTitle: "基于动画流程制作的APose动画模型\n已重新拓扑并附带骨骼绑定",
          buttonList: [
            { id: "2.1", name: "立即挑选！", bgColor: "#ED6336" },
            { id: "2.2", name: "下载模板", bgColor: "#A8A8A8" },
          ],
        },
        {
          id: "3",
          imgUrl: Home3,
          height: "754px",
          title: "PBR人物头脸部模型",
          subTitle:
            "带有8K PBR贴图的高精度人物头面部模型\n已重新拓扑并附带骨骼绑定",
          buttonList: [{ id: "3.1", name: "即将上线", bgColor: "#A8A8A8" }],
        },
        {
          id: "4",
          imgUrl: Home4,
          height: "754px",
          title: "4D 人物模型序列",
          subTitle:
            "4D人是由不同角度的\n高帧率镜头和红外相机捕捉的动态模型序列\n每个模型都包含一个高分辨率的网格和贴图序列\n无需人工拓扑和制作动画 更真实、流畅",
          buttonList: [{ id: "4.1", name: "即将上线", bgColor: "#A8A8A8" }],
        },
        {
          id: "5",
          imgUrl: Home5,
          height: "754px",
          title: "模型扫描设备介绍",
          subTitle:
            "模型素材库的所有所有模型\n都是由超维生产的设备 按照真实人体1:1完成采集\n如需对采集设备感兴趣 可以前往设备网站",
          buttonList: [{ id: "5.1", name: "点击跳转", bgColor: "#A8A8A8" }],
        },
      ],
    };
  },
  components: {
    Footer,
    Login,
  },
  methods: {},
  created() {
    console.log("this.$router", this.$router);
  },
};
</script>
<style lang="less" scoped>
.chaowei-home {
  .model-list {
    .model-item {
      display: flex;
      justify-content: space-between;
      color: #000;
      background-color: #fff;
      &:nth-child(odd) {
        background-color: #f3f3f3;
        flex-direction: row-reverse;
      }
      &:nth-child(1) {
        color: #fff;
        background: linear-gradient(180deg, #404040 6%, #000000 100%);
      }
      .model-item-pic {
        flex: 1;
        img {
          display: block;
          width: 100%;
        }
      }
      .model-item-explain {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        .main-tilte,
        .sub-tilte {
          white-space: pre;
        }
        .main-tilte {
          font-family: Inter, Inter;
          font-weight: bold;
          font-size: 48px;
          line-height: 56px;
        }
        .sub-tilte {
          margin-top: 16px;
          font-family: Inter, Inter;
          font-size: 20px;
          line-height: 23px;
          letter-spacing: 4px;
        }
        .button-list {
          display: flex;
          align-items: center;
          margin-top: 75px;
          .button-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 38px;
            border-radius: 12px 12px 12px 12px;
            color: #fff;
            font-family: Inter, Inter;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            &:nth-child(2) {
              margin-left: 68px;
            }
          }
        }
      }
    }
  }
  .chaowei-partner {
    padding: 80px 75px 45px;
    background-color: #fff;
    .partner-title {
      font-family: Inter, Inter;
      font-weight: bold;
      font-size: 48px;
      color: #000;
      line-height: 56px;
      text-align: center;
    }
    .partner-pic {
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
