<template>
  <div class="question-list">
    <div class="question-wrap">
      <div class="title">常见问题</div>
      <div class="question-tabs">
        <el-tabs v-model="tabActive" @tab-click="handleClick">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabActive: "1",
      activeNames: "1-1",
      questionList: [
        {
          id: "1",
          name: "总览",
          list: [
            { id: "1-1", title: "选择 Peoplegroundtruth 的优势是什么?", content: "1.Peoplegroundtruth的产品，基于真实的的人体、人脸，由专业的人体3D成像设备，1:1扫描后由专业的3D艺术家处理完成，模型细节生动，贴图色彩还原，提供给您真实的人体模型。您可以将它们放置在3D环境中的任何位置，而无需担心比例和视角。\n2.模型库拥有素材数量多、可筛选、姿势丰富，包含不同场景、年龄、风格的人物数据。您可以根据您需求，的在模型库中选择不同的标签进行筛选。\n3.Peoplegroundtruth的产品，由统一的标准制作完成。相比于在市面上收集不同的模型，我们的产品拥有更高的一致性。我们的团队自2013年以来专注于人体及周边数字资产三维重建技术的研究与开发，基于自建并持有的各型设备，可以提供成熟、稳定、高品质的人体、周边数字资产。" },
            { id: "1-2", title: "Peoplegroundtruth 可以提供定制的3D人物数据服务么?", content: "是的，当然可以。您可以定制特定人物、服饰、不同处理程度的3D数据。\n具体请联系 service@peoplegroundtruth.com 根据你的具体需求来获得定制报价。" },
            { id: "1-3", title: "Peoplegroundtruth 的产品可以用在什么途径？", content: "我们Peoplegroundtruth 产品的许可证，允许客户将数据用于商业或私人用途的静态图像和动画渲染，例如：建筑场景效果图的渲染、影视后期特效、时尚广告、游戏制作、插画或演示以及你能想到的任何3D渲染环境。\n不允许客户将数据提供第三方下载、提取、分发或以单个文件形式将数据提供给第三方。有关许可的详细信息，可以点击查看我们的想要了解更多资产授权信息，请点击<a>这里</a>。" },
          ],
        },
        {
          id: "2",
          name: "购买",
          list: [
            { id: "2-1", title: "你们接受哪些付款方式?", content: "我们目前支持以下付款方式：\n微信支付\n支付宝\nPaypal\n当然，客户的购物体验对我们来说是非常重要的，如果需要，我们将尝试更多付款方式。请随时与我们联系。" },
            { id: "2-2", title: "我如何下载已购买的产品?", content: "请访问您的客户帐户并登录。点击左侧的交易目录。在那里，您将找到您购买的所有产品的下载链接。" },
            { id: "2-3", title: "我的免费模型下载链接不起作用，怎么办？", content: "清确保您已登录到您的帐户。如果下载仍然不能正常工作，您可能已经超过了免费模型的最大下载数量。" },
            { id: "2-4", title: "我在哪里可以查到发票?", content: "待确认的问题TODO" },
          ],
        },
        {
          id: "3",
          name: "全身姿态模型",
          list: [
            { id: "3-1", title: "什么是全身姿态模型?", content: "全身姿态模型是指：有着固定姿势的逼真人体3D模型，可以很容易地加入3D场景中。您可以将它们放置在3D环境中的任何位置，而无需担心比例和视角。想要了解更多关于全身姿态模型的信息，请点击<a>这里</a>。" },
            { id: "3-2", title: "全身姿态模型包含哪些文件?", content: "目前我们的全身姿态模型有两种标准：\n全身姿态模型：\n面片数:30K\n布线类型:三角面\n单位:厘米\n文件格式:\n贴图大小:4096x4096\n贴图格式:JPG\n贴图类型:颜色贴图,法线贴图\n<br />高精度全身姿态模型：\n面片数:30K,100K\n布线类型:三角面\n单位:厘米\n文件格式:OBJ,FBX\n贴图大小:2048x2048，8192x8192\n贴图格式:JPG\n贴图类型:三种不同颜色服装的颜色贴图,法线贴图,遮罩贴图\n<br />如果您对如何使用遮罩贴图有疑问，可以点击这里，查看教程。" },
            { id: "3-3", title: "Peoplegroundtruth是如何制作全身姿态模型的？", content: "Peoplegroundtruth的全身姿态模型，基于真实的的人体，由专业的人体3D成像设备，1:1扫描后由专业的3D艺术家处理完成，模型细节生动，贴图色彩还原，提供给您真实的人体模型。您可以将它们放置在3D环境中的任何位置，而无需担心比例和视角。" },
            { id: "3-4", title: "如何导入我下载的模型到3D环境?", content: "我们提供的OBJ、FBX格式是通用的多边形模型格式。要将pose People导入到现有的3D场景中，请使用以下功能:\n<br />3ds Max:主菜单->导入->合并或直接将文件拖入\nMAYA：文件->导入\nCinema 4D:文件->合并\nSketchUp:文件->导入或拖放\nArtlantis:打开->合并\nBlender:文件->导入->FBX\n< br/>如果您需要教程，可以点击<a>这里</a>。" },
            { id: "3-5", title: "为什么贴图在我的3D软件中没有加载?", content: "当你将我们的一个模型FBX导入到你的3D软件中时，通常FBX已经附带了贴图可以正确加载。但是，根据您使用软件的不同，可能会出现许多不同的问题。您可以在软件材质菜单中，重新赋予，如果需要帮助可以点击<a>这里</a>获取教程，或与我们联系。" },
          ],
        },
        {
          id: "4",
          name: "全身微动模型",
          list: [
            { id: "4-1", title: "什么是全身微动模型?", content: "全身微动模型是指：将3D人体模型通过骨骼绑定后，可以实现微动态的人体3D模型。相比于全身姿态模型，微动模型有着自然的动作，可以更生动的融入动画场景中。想要了解更多关于全身微动态模型的信息，请点击<a>这里</a>。" },
            { id: "4-2", title: "如何导入我下载的模型到3D环境?", content: "我们提供的OBJ、FBX格式是通用的多边形模型格式。要将pose People导入到现有的3D场景中，请使用以下功能:\n<br />3ds Max:主菜单->导入->合并或直接将文件拖入\nMAYA：文件->导入\nCinema 4D:文件->合并\nBlender:文件->导入->FBX\n<br />如果您需要教程，可以点击<a>这里</a>。" },
            { id: "4-3", title: "为什么贴图在我的3D软件中没有加载?", content: "当你将我们的一个模型FBX导入到你的3D软件中时，通常FBX已经附带了贴图可以正确加载。但是，根据您使用软件的不同，可能会出现许多不同的问题。您可以在软件材质菜单中，重新赋予，如果需要帮助可以点击<a>这里</a>获取教程，或与我们联系。" },
          ],
        },
        {
          id: "5",
          name: "数据定制",
          list: [
            { id: "5-1", title: "定制数据的的流程是怎么样的?", content: "需求确认—拍摄准备—模型拍摄—模型处理—意见反馈。" },
            { id: "5-2", title: "哪里可以提供服务?可以上门扫描吗?", content: "目前，我们在浙江嘉兴（距离上海、杭州约30分钟高铁行程或1小时左右的自驾车程）；一般情况下，我们建议您到我们固定的场地来完成扫描，这将大大节约扫描的成本费用。同时，在特别需求场景下，我们也可以提供设备上门安装扫描服务。" },
            { id: "5-3", title: "哪些内容是可以定制的?", content: "可以定制采集对象、采集服装、采集姿势、模型处理程度、模型制作方式、是否拓扑、是否绑定。" },
            { id: "5-4", title: "除了扫描服务以外，是否可以提供其他制作服务?", content: "除了提供数字资产的扫描及数据处理服务外，我们也可以提供完整数字人的打造服务（包含扫描、修复处理、拓扑、全身及面部绑定，以及全身及面部捕捉驱动和内容生成）。同时，我们也可以提供 VR、AR应用环境展示、交互系统的开发服务。" },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log("tab>>>>>>", tab, tab?.name);
    },
  },
};
</script>
<style lang="less" scoped>
.question-list {
  height: calc(100vh - 100px);
  padding: 30px 50px 50px;
  background-color: #f3f3f3;
  overflow: auto;
  .question-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
  .title {
    color: #000;
    font-size: 40px;
  }
  .question-tabs {
    margin-top: 30px;
    /deep/ .el-collapse {
      border-radius: 12px;
      overflow: hidden;
    }
    /deep/ .el-tabs__item {
      color: #666;
      font-size: 16px;
    }
    /deep/ .el-tabs__item.is-active {
      color: #ed6336;
    }
    /deep/ .el-tabs__active-bar {
      background-color: #ed6336;
    }
    /deep/ .el-tabs__item:hover {
      color: #ed6336;
    }
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
}
</style>
