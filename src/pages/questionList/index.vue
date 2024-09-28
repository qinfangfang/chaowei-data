<template>
  <div class="question-list">
    <div class="question-wrap">
      <div class="title">{{ isZh ? '常见问题' : 'F&A'}}</div>
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
import { questionZh, questionEn } from './constant';

export default {
  data() {
    return {
      tabActive: "1",
      activeNames: "1-1",
      questionList: questionZh,
    };
  },
  watch: {
    '$i18n.locale'(val) {
      this.questionList = val == 'Zh' ? questionZh : questionEn; 
    }
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
    handleClick(tab, event) {
      // this.activeNames = this.questionList?.[tab?.name - 1]?.list?.[0]?.id;
      console.log("tab>>>>>>", tab, tab?.name);
    },
  },
  created() {
    this.questionList = this.$i18n.locale == 'Zh' ? questionZh : questionEn; 
  }
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
