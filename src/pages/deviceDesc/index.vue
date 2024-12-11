<template>
  <div class="device-desc">
    <div class="title">{{isZh ? '扫描设备介绍' : 'Introduction to Scanning Equipment'}}</div>
    <div class="first-line desc-line">{{isZh ? 'PGT团队自2013年以来专注于人体及周边数字资产三维重建技术的研究与开发，目前已形成包含人体3D静态、人体4D动态、PBR材质扫描及Relighting重光照、物体扫描、场景扫描等完整的技术设备体系。'
                                             : 'PGT team has been focusing on the research and development of 3D reconstruction technology for the human body and surrounding digital assets since 2013, and has formed a complete system of technology and equipment including 3D static human body, 4D dynamic human body, PBR material scanning and Relighting relighting, object scanning, scene scanning and so on.'}}</div>
    <div class="image-wrap">
      <img class="one-image" :src="firstLine" alt="">
    </div>
    <div class="first-line desc-line">{{isZh ? 'PGT网站的所有模型，都是基于自主研发生产的设备，按照真实人体1:1完成采集。'
                                              : "All models on PGT's website are based on self-developed and manufactured equipment, and are captured 1:1 according to the real human body."}}</div>
    <div class="first-line desc-line">{{isZh ? '全身姿态模型，由“BodyCapture"3D成像相机阵列扫描完成。阵列由256台2400万像素的单反相机构成，保证了生成原始模型的细节和完整性。扫描完成后，每个模型都经过建师精心处理。'
                                              : 'The full body pose model is scanned by “BodyCapture”， an array of Full Body 3D Scanning Array. The array consists of 256 24-megapixel DSLR cameras, which ensures the detail and integrity of the original models generated. After scanning, each model is carefully processed by the  artist.'}}</div>
    <div class="image-wrap">
      <img class="one-image" :src="secondLine" alt="">
    </div>
    <div class="first-line desc-line">{{isZh ? '高清PBR材质模型，来自于自主研发的“SuperCapture 球形光场”--重光照及脸部PBR材质扫描建模设备，可以完成超高精度的3D扫描建模，并通过物理光度法解算得到高分辨率、精致细节的面部PBR材质贴图数据。我们会在之后将数据更新到网站。'
                                              : 'HD PBR material models from the independent research and development of the “SuperCapture” - Re-Lighting and face PBR material scanning  modeling equipment, can complete ultra-high precision 3D scanning and modeling, and through the physical photometric method of solving to get a high-resolution, exquisite details of the Face PBR material mapping data. We will update the data to the website later.'}}</div>
    <div class="image-wrap">
      <img class="two-image" :src="threeLeftLine" alt="">
      <video class="two-image-big" src="@/assets/video/device.mp4" autoplay="autoplay" muted="muted" loop="loop"></video>
      <!-- <img class="two-image-big" :src="threeRightLine" alt=""> -->
    </div>
    <div class="first-line desc-line">{{isZh ? '之后我们还将会提供，能够捕捉真实动态的4D动态模型。模型来自“PerformanceCapture”4D动态捕捉系统，系统由155组11通道彩色光源+高速同步相机搭建完成，可以采集高帧率(60fps)的人脸3D动态或全身型数据，4D动态表现相比传统模型更加真实可信。'
                                            : 'Later on, we will also provide a 4D motion model that can capture the real dynamics. The model scanned from the “PerformanceCapture” 4D motion capture system, which is built by 155 sets of 11-channel color light sources + high-speed synchronized cameras, and can capture high frame rate (60fps) 3D motion of the human face or full body data, 4D motion performance is more realistic and reliable compared to traditional models. The 4D dynamic performance is more realistic and credible than the traditional model.'}}</div>
    <div class="first-line desc-line">{{isZh ? '我们团队累积采集了超过4500个姿势的全身扫描数据集、超过320个Neutral表情、75组以上包含20或30个表情数据的FACS表情数据集、280分钟，100万帧面部4D动态表情数据、以及超过320组每组8个不同表情状态的人物重光照序列照片，都会逐步更新到我们的网站。'
                                            : 'Our team has more than 4,500 full-body scan datasets of poses, more than 320 Neutral expressions, more than 75 sets of FACS expression datasets with 20 or 30 expressions, 280 minutes and 1 million frames of 4D facial expression data, and more than 320 sets of relighting sequences of people with 8 different expression states in each set of photos, all of which are progressively being updated to our website.'}}</div>
    <div class="first-line desc-line">{{isZh ? '如果您需要直接购买，欢迎联系 service@peoplegroundtruth.com'
                                            : 'If you would like to purchase directly, please contact ： service@peoplegroundtruth.com'}}</div>
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
}
.title {
  font-size: 30px;
  margin: 20px 0;
  font-weight: 700;
}
.desc-line {
  text-indent: 4ch;
  width: 1000px;
  margin: 5px 0;
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
</style>
