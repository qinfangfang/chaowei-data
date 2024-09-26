<template>
  <div class="chaowei-home">
    <div class="chaowei-video">
      <video
        src="@/assets/video/home_video.mp4"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      ></video>
      <div class="video-desc">
        <div class="desc-title">PEOPLEGROUNDTRUTH</div>
        <div class="desc-sub">
          {{
            isZh
              ? "多场景 · 多姿态 · 多民族 简单易用的扫描模型库"
              : "Multi-scene - multi-gesture\neasy-to-use scanning model library"
          }}
        </div>
        <div class="right-selected" @click="rightNowSelect">
          {{ isZh ? "立即挑选！" : "MODEL LIBRARY" }}
        </div>
      </div>
    </div>
    <div class="model-list">
      <template v-for="item in modelList">
        <div class="model-item" :key="item.id">
          <div class="model-item-pic">
            <img :src="item?.imgUrl" alt="" />
          </div>
          <div class="model-item-explain">
            <div class="main-tilte" :class="`${lang}`">{{ item?.[`title${lang}`] }}</div>
            <div class="sub-tilte">{{ item?.[`subTitle${lang}`] }}</div>
            <div class="button-list">
              <div
                class="button-item"
                v-for="btnItem in item?.buttonList"
                :key="btnItem?.id"
                :style="{ backgroundColor: btnItem?.bgColor }"
              >
                {{ btnItem?.[`name${lang}`] }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="chaowei-partner">
      <div class="partner-title">{{ isZh ? '主要服务客户 （优质合作伙伴）' : 'Main Clients'}}</div>
      <div class="partner-pic">
        <img src="@/assets/imgs/home/home_6.png" alt="" />
      </div>
    </div>
    <Footer></Footer>
    <!-- <Login :visible="visible" /> -->
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
import { goLogin, getToken } from "@/utils/index.js";

export default {
  name: "homePage",
  data() {
    return {
      visible: true,
      modelList: [
        {
          id: "1",
          imgUrl: Home2,
          height: "754px",
          titleZh: "3D全身姿态模型",
          titleEn: "3D WHOLE BODY POSTURE MODEL",
          subTitleZh:
            "由3D数据扫描团队通过瞬时三维成像系统完成的写实风格模型\n素材数量多、可筛选、姿势丰富， \n包含不同场景、年龄、风格的人物数据。",
          subTitleEn:
            "Realistic style modeling done by 3D data scanning team through\ninstantaneous 3D imaging system\nLarge number of materials, filterable and rich in poses that\nContains character data of different scenes, ages and styles.",
          buttonList: [
            { id: "2.1", nameZh: "立即挑选！",nameEn: "BUY SCANNING MODEL", bgColor: "#ED6336" },
            { id: "2.2", nameZh: "下载免费模型", nameEn: "DOWNLOAD FREE MODEL", bgColor: "#A8A8A8" },
          ],
        },
        {
          id: "2",
          imgUrl: Home5,
          height: "754px",
          titleZh: "模型扫描设备介绍",
          titleEn: "SCANNING EQUIPMENT",
          subTitleZh:
            "模型素材库的所有所有模型\n都是由超维生产的设备 按照真实人体1:1完成采集\n如需对采集设备感兴趣 可以前往设备网站",
            subTitleEn:
            "All the models in the model material library\nAll models in the model library are captured 1:1 according to the real human body.\nIf you are interested in the acquisition equipment, you can go to the equipment website",
          buttonList: [{ id: "5.1", nameZh: "点击跳转",nameEn: 'CLICK TO LINK', bgColor: "#A8A8A8" }],
        },
      ],
    };
  },
  components: {
    Footer,
    Login,
  },
  computed: {
    isZh() {
      return this.$i18n.locale === "Zh";
    },
    lang() {
      return this.$i18n.locale || "En";
    },
  },
  methods: {
    rightNowSelect() {
      this.$router.push("/modelList");
    },
  },
  created() {
    console.log("this.$router", this.$router);
  },
};
</script>
<style lang="less" scoped>
.chaowei-home {
  .chaowei-video {
    position: relative;
    width: 100%;
    margin-bottom: -5px;
    video {
      width: 100%;
    }
    .video-desc {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      width: 50vw;
      top: 50%;
      left: 5%;
      transform: translate(0, -50%);
      color: #fff;
      z-index: 1;
      .desc-title {
        font-family: Kanit, Kanit;
        font-weight: bold;
        font-size: 56px;
        line-height: 75px;
        text-align: center;
      }
      .desc-sub {
        height: 52px;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: 4px;
        white-space: pre-wrap;
        text-align: center;
      }
      .right-selected {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 296px;
        height: 56px;
        margin-top: 100px;
        background-color: #ed6336;
        border-radius: 12px;
        font-weight: bold;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
  .model-list {
    .model-item {
      display: flex;
      justify-content: space-between;
      color: #000;
      background-color: #fff;
      &:nth-child(even) {
        background-color: #f3f3f3;
        flex-direction: row-reverse;
      }
      &:nth-child(1) {
        color: #000;
        background: #fff;
        // background: linear-gradient(180deg, #404040 6%, #000000 100%);
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
          &.En {
            font-size: 38px;
          }
        }
        .sub-tilte {
          margin-top: 16px;
          font-family: Inter, Inter;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
        }
        .button-list {
          display: flex;
          align-items: center;
          margin-top: 75px;
          .button-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 296px;
            height: 56px;
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
      font-weight: bold;
      font-size: 40px;
      color: #000;
      line-height: 56px;
      text-align: center;
    }
    .partner-pic {
      margin-top: 30px;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
