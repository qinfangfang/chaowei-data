<template>
  <div class="chaowei-home">
    <div class="chaowei-video" :style="{height: firstScreenHeight}">
      <video src="https://chaowei-public-prd-1328304824.cos.ap-hongkong.myqcloud.com/static/intro.mp4" autoplay="autoplay" muted="muted" loop="loop"></video>
      <!-- <video src="@/assets/video/home_video.mp4" autoplay="autoplay" muted="muted" loop="loop"></video> -->
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
          <div class="model-item-pic" :class="`img_par_${item.id}`" >
            <img :class="`img_${item.id}`" :src="item?.imgUrl" alt="" />
          </div>
          <div class="model-item-explain">
            <div class="main-tilte" :class="`${lang}`">{{ item?.[`title${lang}`] }}</div>
            <div class="sub-tilte">{{ item?.[`subTitle${lang}`] }}</div>
            <div class="sub-sub-tilte">{{ item?.[`subSubTitle${lang}`] }}</div>
            <div class="sub-sub-sub-tilte">{{ item?.[`subSubSubTitle${lang}`] }}</div>
            <div class="button-list">
              <div class="button-item" v-for="btnItem in item?.buttonList" :key="btnItem?.id"
                :style="{ backgroundColor: btnItem?.bgColor }" @click="subClick(btnItem)">
                {{ btnItem?.[`name${lang}`] }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="chaowei-partner">
      <div class="partner-title">{{ isZh ? '主要服务客户 （优质合作伙伴）' : 'Main Clients' }}</div>
      <div class="partner-pic">
        <!-- <img src="@/assets/imgs/home/home_6.png" alt="" /> -->
        <div class="img-inner-wrap" v-for="item in partnerList" :key="item">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <div class="chaowei-partner ques-part">
      <div class="partner-title">{{ isZh ? '常见问题' : 'FAQ' }}</div>
      <div class="partner-faq">
        <el-tabs v-model="tabActive">
          <template v-for="item in questionList">
            <el-tab-pane :key="item?.id" :label="item?.name" :name="item?.id">
              <el-collapse v-model="activeNames">
                <template v-for="child in item?.list">
                  <el-collapse-item
                    :key="child?.id"
                    :title="child?.title"
                    :name="child?.id"
                  >
                    <div v-html="child?.content"></div>
                  </el-collapse-item>
                </template>
              </el-collapse>
            </el-tab-pane>
          </template>
        </el-tabs>
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
import partner1 from "@/assets/imgs/partner/partner1.png";
import partner2 from "@/assets/imgs/partner/partner2.png";
import partner3 from "@/assets/imgs/partner/partner3.png";
import partner4 from "@/assets/imgs/partner/partner4.png";
import partner5 from "@/assets/imgs/partner/partner5.png";
import partner6 from "@/assets/imgs/partner/partner6.png";
import partner7 from "@/assets/imgs/partner/partner7.png";
import partner8 from "@/assets/imgs/partner/partner8.png";
import partner9 from "@/assets/imgs/partner/partner9.png";
import partner10 from "@/assets/imgs/partner/partner10.png";
import partner11 from "@/assets/imgs/partner/partner11.png";
import partner12 from "@/assets/imgs/partner/partner12.png";
import partner13 from "@/assets/imgs/partner/partner13.png";
import partner14 from "@/assets/imgs/partner/partner14.png";
import partner15 from "@/assets/imgs/partner/partner15.png";
import { questionZh, questionEn } from '../questionList/constant';

export default {
  name: "homePage",
  data() {
    return {
      visible: true,
      firstScreenHeight: '600px',
      tabActive: "1",
      activeNames: "1-1",
      questionList: questionZh,
      modelList: [
        {
          id: "1",
          imgUrl: Home2,
          height: "754px",
          titleZh: "3D全身姿态模型",
          titleEn: "3D FULL BODY POSTURE MODEL",
          subTitleZh:
            "由3D数据扫描团队通过瞬时三维成像系统完成的写实风格模型\n素材数量多、可筛选、姿势丰富， \n包含不同场景、年龄、风格的人物数据。",
          subTitleEn:
            "Realistic style modeling done by 3D data scanning team through\ninstantaneous 3D imaging system\nLarge number of materials, filterable and rich in poses that\nContains character data of different scenes, ages and styles.",
          buttonList: [
            { id: "2.1", nameZh: "立即挑选！", nameEn: "BUY SCANNING MODEL", bgColor: "#ED6336", path: '/modelList' },
            { id: "2.2", nameZh: "下载免费模型", nameEn: "DOWNLOAD FREE MODEL", bgColor: "#A8A8A8", path: '/freeModel?scrollBtn=true' },
          ],
        },
        {
          id: "2",
          imgUrl: Home5,
          height: "754px",
          titleZh: "采集设备介绍",
          titleEn: "Scanning Equipment",
          subSubTitleZh:
            "PGT团队自2013年以来专注于人体及周边数字资产三\n维重建技术的研究与开发。网站所有模型资产都基于自主研发的\n扫描设备，按照真实人体1:1采集。",
          subSubTitleEn:
            "Since 2013,the PGT team has focused on developing 3D \n reconstruction technology for human bodies and digital assets using \n proprietary scanning equipment, All models on the website are \n captured with the company's own equipment, achieving 1:1 real \n human body accuracy.",
          subSubSubTitleZh: "",
          subSubSubTitleEn: "",
          buttonList: [{ id: "5.1", nameZh: "了解更多", nameEn: 'Learn more', bgColor: "#A8A8A8", path: '/deviceDesc' }],
        },
        // {
        //   id: "2",
        //   imgUrl: Home5,
        //   height: "754px",
        //   titleZh: "模型扫描设备介绍",
        //   titleEn: "SCANNING EQUIPMENT",
        //   subTitleZh:
        //     "模型素材库的所有所有模型\n都是由超维生产的设备 按照真实人体1:1完成采集\n如需对采集设备感兴趣 可以前往设备网站",
        //   subTitleEn:
        //     "All the models in the model material library\nAll models in the model library are captured 1:1 according to the real human body.\nIf you are interested in the acquisition equipment, you can go to the equipment website",
        //   buttonList: [{ id: "5.1", nameZh: "点击跳转", nameEn: 'CLICK TO LINK', bgColor: "#A8A8A8", redirectUrl: 'https://www.superdimension.cn/' }],
        // },
      ],
      partnerList: [partner1,partner2,partner3,partner4,partner5,partner6,partner7,partner8,partner9,partner10,partner11,partner12,partner13,partner14,partner15]
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
  watch: {
    '$i18n.locale'(val) {
      this.questionList = this.$i18n.locale == 'Zh' ? questionZh : questionEn;
    }
  },
  methods: {
    //
    subClick(item) {
      if(item?.redirectUrl) {
        window.open(item?.redirectUrl, '_blank');
      }
      if (item?.path) {
        this.$router.push(item?.path);
      }
    },
    // header 立即挑选
    rightNowSelect() {
      this.$router.push("/modelList");
    },
  },
  created() {
    console.log("this.$router", this.$router);
    this.firstScreenHeight = (window.innerHeight - 56) + 'px'
    this.questionList = this.$i18n.locale == 'Zh' ? questionZh : questionEn;
  },
  // mounted
};
</script>
<style lang="less" scoped>
.chaowei-home {
  .chaowei-video {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: -5px;
    background: linear-gradient(to bottom, #2d2d2d, #040404);
    outline: none;
    video {
      // height: 500px;
      height: 100%;
    }

    .video-desc {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      width: 50vw;
      top: 50%;
      left: 8%;
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
        display: flex;
        align-items: center;
        justify-content: center;
        height: 600px;
        &.img_par_1 {
          height: 800px;
          .img_1 {
            height: 800px;
          }
        }
        img {
          // display: block;
          height: 450px;
        }
      }

      .model-item-explain {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;

        .main-tilte,
        .sub-tilte,
        .sub-sub-tilte,
        .sub-sub-sub-tilte, {
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
          width: 600px;
          text-indent: 4ch;
          // word-wrap:break-word;
        }
        .sub-sub-tilte, .sub-sub-sub-tilte {
          font-family: Inter, Inter;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
          width: 450px;
          text-indent: 4ch;
          text-align: left;
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
    padding: 10px 75px 45px;
    background-color: #fff;

    .partner-title {
      font-weight: bold;
      font-size: 40px;
      color: #000;
      line-height: 56px;
      margin: 20px 0;
      text-align: center;
    }

    .partner-pic {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .img-inner-wrap {
        width: 20%;
        margin-top: 10px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        display: block;
        width: 150px;
      }
    }
    .partner-faq {
      width: 100%;
      /deep/ .el-collapse-item__header {
        padding-left: 15px;
        color: #000;
        font-size: 16px;
        font-weight: 500;
      }
      /deep/ .el-collapse-item__content {
        padding: 10px 30px;
        color: #666;
        font-size: 14px;
        white-space: pre-wrap;
        a {
          color: #ed6336;
          cursor: pointer;
        }
      }
    }
    &.ques-part {
        background-color: #f3f3f3;
    }
  }
}</style>
