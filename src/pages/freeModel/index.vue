<template>
  <div class="free-model-page">
    <div class="free-model-banner">
      <div class="banner-pic">
        <img :src="imgUrl" />
      </div>
      <div class="banner-text">
        <div class="banner-title">超写实人物模型商城</div>
        <div class="banner-subtitle">向你推荐次时代<br />超写实扫描人物模型</div>
      </div>
    </div>
    <div class="multi-model-wrap">
      <div class="title">选择最契合的写实人物模型</div>
      <div class="sub-title">网站包含大量3D扫描模特数据素材数量多、姿势丰富， 可根据您的需求进行筛选。<br /> 包含不同场景 年龄 风格的人物数据</div>
      <div class="tab-list">
        <div class="tab-item" v-for="item in tabList" :key="item?.id">{{ item?.name }}</div>
      </div>
      <div class="tab-content"></div>
    </div>
    <div class="free-wrap">
      <div class="free-text">
        <div class="desc-one">现在点击下载<br />免费的样例模型<br />开启你的超写实渲染之路</div>
        <div class="desc-second">矩阵相机生成的超写实三维人物模型，帮您省下寻找<br />高清素材的精力。使画面更真实、更高清、更有冲击力。<br />现在就点击下载，来试试扫描超写实模型。</div>
        <div class="download-btn">点击下载 免费样例</div>
        <div class="free-pic-list"></div>
      </div>
      <div class="free-pic">
        <img :src="imgUrl" />
      </div>
    </div>
    <div class="free-model-materials">
      <div class="materials-detail"></div>
    </div>
    <div class="more-model">
      <div class="title">大量扫描模型持续更新</div>
      <div class="more-desc">拥有超过8000个模型资源， 涵盖不同年龄 不同场景 不同风格的人物数据。根据<br />您的需求正在不断更新中……</div>
      <div class="more-pic">
        <img :src="imgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Img1 from '@/assets/imgs/test/1.jpg';

  export default {
    data() {
      return {
        imgUrl: Img1,
        tabList: [
          {id: 1, name: '多场景人物数据'},
          {id: 2, name: '多姿态 服饰 造型数据'},
          {id: 3, name: '多年龄段分布数据'},
          {id: 4, name: '多地域、 民族、 肤色数据'},
        ]
      }
    },
    methods: {}
  }
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
          text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
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
        }
      }
      .tab-content {
        height: 300px;
        margin-top: 60px;
        border-radius: 15px;
        background-color: #fff;
      }
    }
    .free-wrap {
      display: flex;
      justify-content: space-between;
      background-color: #242424;
      color: #fff;
      .free-text, .free-pic {
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
          background: #ED6336;
          border-radius: 12px;
          cursor: pointer;
          font-weight: bold;
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
      padding: 40px 150px 0;
      background-color: #242424;
      .materials-detail {
        height: 200px;
        background-color: #fff;
        border-radius: 12px;
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