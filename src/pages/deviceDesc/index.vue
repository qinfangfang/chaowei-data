<template>
  <div class="device-desc">
    <div class="title">{{isZh ? '扫描设备介绍' : 'Introduction to Scanning Equipment'}}</div>
    <div class="first-line desc-line">{{isZh ? 'PGT团队自2013年以来专注于人体及周边数字资产三维重建技术的研究与开发，目前已形成包含人体3D静态、人体4D动态、PBR材质扫描及Relighting重光照、物体扫描、场景扫描等完整的技术设备体系。'
                                             : 'PGT team has been focusing on the research and development of 3D reconstruction technology for the human body and surrounding digital assets since 2013, and has formed a complete system of technology and equipment including 3D static human body, 4D dynamic human body, PBR material scanning and Relighting relighting, object scanning, scene scanning and so on.'}}</div>
    <div class="first-line desc-line">{{isZh ? 'PGT网站的所有模型，都是基于自主研发生产的设备，按照真实人体1:1完成采集。'
                                              : "All models on PGT's website are based on self-developed and manufactured equipment, and are captured 1:1 according to the real human body."}}</div>
    <div class="title-split-wrap">
        <img class="split-image-order" />
        <div class="split-text-wrap">
          <div v-if="isZh">BodyCapture</div>
          <div v-if="isZh">VR3D瞬时三维成像系统</div>
          <div v-if="!isZh">VR3D transient 3D imaging system BodyCapture</div>
        </div>
    </div>
    <div class="text-image-wrap">
      <div class="text-image-first">
        <div class="text-inner">
          <div class="text-item">{{isZh ? 'PGT网站的全身姿态模型、高清全身姿态模型和微动态全身模型都由“BodyCapture”3D成像相机阵列扫描完成。'
                                        : "PGT's full-body pose models, high-definition full-body pose models and microdynamic full-body models are scanned by the “BodyCapture” 3D imaging camera array. "}}
          </div>
          <div class="text-item">{{isZh ? '人体单反相机阵列由两百多台单反相机构成，微秒级别的拍摄同步时间，保证了生成原始模型的细节和完整性。扫描完成后，每个模型都经过建模师精心处理。'
                                        : 'The body DSLR camera array consists of over two hundred DSLR cameras, which are synchronized in microseconds to ensure the detail and integrity of the original models generated. Once scanned, each model is carefully processed by theartist.'}}
          </div>
          
        </div>
        <img class="image-inner" :src="firstLine" alt="">
      </div>
      <div class="all-image-wrap">
        <img :src="firstLine" alt="">
      </div>
    </div>
    <div class="title-split-wrap">
        <img class="split-image-order" />
        <div class="split-text-wrap">
          <div v-if="isZh">SuperCapture</div>
          <div v-if="isZh">VR3D重光照及脸部PBR材质扫描建模设备</div>
          <div v-if="!isZh">VR3D SuperCapture Re-Lighting and Face PBR material scanning modeling equipment</div>
        </div>
    </div>
    <div class="text-image-wrap">
      <div class="text-image-first">
        <div class="text-inner">
          <div class="text-item">{{isZh ? '之后我们还会提供--高清PBR材质模型，来自于自主研发的“SuperCapture 球形光场”--重光照及脸部PBR材质扫描建模设备，可以完成超高精度的3D扫描建模，并通过物理光度法解算得到高分辨率、精致细节的面部PBR材质贴图数据。我们会在之后将数据更新到网站。'
                                        : 'We will also provide - high-definition PBR material models from our self-developed “SuperCapture Spherical Light Field” - heavy lighting and facial PBR material scanning and modeling equipment. The material scanning and modeling equipment can complete ultra-high precision 3D scanning and modeling, and through the physical photometric method of solving to get high-resolution, exquisite details of the facial PBR material mapping data. We will update the data to the website later.'}}
          </div>
        </div>
        <img class="image-inner" :src="firstLine" alt="">
      </div>
      <div class="all-image-wrap">
        <img :src="firstLine" alt="">
      </div>
    </div>
    <div class="title-split-wrap">
        <img class="split-image-order" />
        <div class="split-text-wrap">
          <div v-if="isZh">PerformanceCapture</div>
          <div v-if="isZh">VR3D 4D动态捕捉系统</div>
          <div v-if="!isZh">VR3D 4D facial expression dynamic capture system</div>
        </div>
    </div>
    <div class="text-image-wrap">
      <div class="text-image-first">
        <div class="text-inner">
          <div class="text-item">{{isZh ? '之后我们还将会提供，能够捕捉真实动态的4D动态模型。模型来自“PerformanceCapture”4D动态捕捉系统，系统由高瞬时功率可控光源+高速同步相机搭建完成，可以采集高帧率(60fps)的人脸3D动态或全身型数据，4D动态表现相比传统模型更加真实可信。'
                                        : 'Later on, we will also provide a 4D motion model that can capture the real dynamics. The model comes from the “PerformanceCapture” 4D motion capture system, which is built by a high instantaneous power controllable light source + high-speed synchronized camera, and can capture high frame rate (60fps) 3D motion of the human face or full body data, the 4D motion performance is more realistic and believable compared to traditional models.'}}
          </div>
        </div>
        <img class="image-inner" :src="firstLine" alt="">
      </div>
      <div class="all-image-wrap last-image">
        <img :src="firstLine" alt="">
      </div>
    </div>
    <div class="first-line desc-line">{{isZh ? '我们团队累积采集了超过超过1000个TB的数字资产数据，其中包括:全身扫描数据、Neutral表情数据、包含20或30个表情数据的FACS表情数据、面部4D动态表情数据、以及不同表情状态的人物重光照序列照片，都会逐步更新到我们的网站。'
                                            : 'Our team has accumulated more than 1,000 terabytes of digital asset data, including full body scan data, Neutral expression data, FACS expression data with 20 or 30 expressions, 4D dynamic facial expression data, and re-lighting sequences of characters with different expression states, which will be gradually updated to our website.'}}</div>
    <div class="first-line desc-line">{{isZh ? '如果您需要直接购买，欢迎联系 '
                                            : 'If you would like to purchase directly, please contact '}}
      <span style="color: blue;">service@peoplegroundtruth.com</span>
    </div>
  </div>
</template>

<script>
import {
  customerTicket
} from "@/api/user.js";
import firstLine from '@/assets/imgs/device/firstLine.png'
import secondLine from '@/assets/imgs/device/secondLine.png'
import threeLeftLine from '@/assets/imgs/device/threeLeftLine.png'
import threeRightLine from '@/assets/imgs/device/threeRightLine.png'
export default {
  name: "contactUs",
  data() {
    return {
      device1,
      firstLine,
      secondLine,
      threeLeftLine,
      threeRightLine,
      form: {
        name: "",
        linkWay: "",
        desc: "",
      },
    };
  },
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    submitForm() {
      const params = {
        nickname: this.form.name,
        content: this.form.linkWay,
        email: this.form.desc
      }
      customerTicket(params).then(res => {
        this.$message.success('提交成功~请等待我们工作人员和您联系！')
        this.form.name = ''
        this.form.linkWay = ''
        this.form.desc = ''
      })
    }
  }
};
</script>
<style lang="less" scoped>
.device-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  margin: 20px auto;
  padding-bottom: 100px;
  font-weight: bold;
}
.title {
  font-size: 36px;
  margin: 50px 0;
  font-weight: 700;
}
.desc-line {
  text-indent: 4ch;
  width: 1000px;
  line-height: 30px;
  // margin: 5px 0;
}
.image-wrap {
  width: 1000px;
  display: flex;
  align-items: center;
  img {
    margin: 10px 0;
  }
  .one-image {
    // flex: 1;
    width: 1000px;
  }
  .two-image {
    // flex: 1;
    width: 496px;
  }
  .two-image-big {
    // flex: 1;
    width: 504px;
  }
}
.title-split-wrap {
  border-bottom: 5px solid #164889; 
  font-size: 28px;
  font-weight: bold;
  width: 1000px;
  margin: 50px 0 30px;
  display: flex;
  align-items: center;
  .split-image-order {
    width: 50px;
    height: 50px;
    background-color: red;
    margin-right: 20px;
  }
}
.text-image-wrap {
  .text-image-first {
    display: flex;
    justify-content: space-around;
    .text-inner {
      width: 400px;
      text-indent: 4ch;
      line-height: 30px;
      .text-item  {
        margin-bottom: 10px;
      }
    }
    .image-inner {
      width: 400px;
      height: 200px;
    }
  }
  .all-image-wrap {
    &.last-image {
      margin-bottom: 50px;
    }
    img {
      width: 1000px;
      height: 300px;
    }
  }
}
</style>
