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
                    <div>{{ child?.content }}</div>
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
          name: "Tab1",
          list: [
            { id: "1-1", title: "常见问题title1", content: "常见问题content1" },
            { id: "1-2", title: "常见问题title2", content: "常见问题content2" },
            { id: "1-3", title: "常见问题title3", content: "常见问题content3" },
            { id: "1-4", title: "常见问题title4", content: "常见问题content4" },
            { id: "1-5", title: "常见问题title5", content: "常见问题content5" },
            { id: "1-6", title: "常见问题title6", content: "常见问题content6" },
          ],
        },
        {
          id: "2",
          name: "Tab2",
          list: [
            { id: "2-1", title: "常见问题title1", content: "常见问题content1" },
            { id: "2-2", title: "常见问题title2", content: "常见问题content2" },
            { id: "2-3", title: "常见问题title3", content: "常见问题content3" },
            { id: "2-4", title: "常见问题title4", content: "常见问题content4" },
            { id: "2-5", title: "常见问题title5", content: "常见问题content5" },
            { id: "2-6", title: "常见问题title6", content: "常见问题content6" },
          ],
        },
        {
          id: "3",
          name: "Tab3",
          list: [
            { id: "3-1", title: "常见问题title1", content: "常见问题content1" },
            { id: "3-2", title: "常见问题title2", content: "常见问题content2" },
            { id: "3-3", title: "常见问题title3", content: "常见问题content3" },
            { id: "3-4", title: "常见问题title4", content: "常见问题content4" },
            { id: "3-5", title: "常见问题title5", content: "常见问题content5" },
            { id: "3-6", title: "常见问题title6", content: "常见问题content6" },
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
      padding: 10px 0 10px 30px;
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
