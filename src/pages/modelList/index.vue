<template>
  <div class="model-list-wrapper">
    <div class="model-sidebar">
      <div class="reset-btn" @click="resetSelect">
        {{ isZh ? "复位选项" : "Reset Options" }}
      </div>
      <div class="model-type-list">
        <div class="model-type-title">
          {{ isZh ? "模型种类" : "Model Categories" }}
        </div>
        <!-- <div
          v-for="(item, idx) in modelTypeList"
          :class="`model-type-item ${
            `${idx + 1}` === form?.modelType ? 'active' : ''
          }`"
          :key="item?.categoryId"
          @click="modelClick(item)"
        >
          <div class="model-type-text">
            {{ `${item?.name} （${item?.count}）` }}
          </div>
        </div> -->
        <div class="style-list">
          <div
            v-for="(item, idx) in modelTypeList"
            :key="item?.id"
            :class="`style-item ${
              activeModelNames.includes(`${idx + 1}`) &&
              modelForm?.[item?.id]?.length
                ? 'active'
                : ''
            }`"
          >
            <div class="model-size" v-if="item?.modelSize">
              （{{ item?.modelSize }}）
            </div>
            <el-collapse v-model="activeModelNames" @change="handleModelChange">
              <el-collapse-item
                :title="item?.[`name${$i18n.locale}`]"
                :name="`${item?.id}`"
                :key="item?.id"
                v-if="item?.modelSize"
              >
                <!-- <span>（{{ item?.modelSize }}）</span> -->
                <el-radio-group
                  v-model="modelForm[item?.id]"
                  @input="(val) => radioChange(val, item?.id)"
                >
                  <el-radio
                    v-for="child in item?.childCategories"
                    :key="child?.id"
                    :label="`${child?.id}`"
                    >{{ child?.[`name${$i18n.locale}`] }}</el-radio
                  >
                </el-radio-group>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="style-wrap">
        <div class="style-title">
          {{ styleInfo?.[`title${isZh ? "Zh" : "En"}`] }}
        </div>
        <div class="style-search">
          <el-input
            placeholder="输入关键词进行搜索"
            suffix-icon="el-icon-search"
            v-model="form.filterSearch"
          >
          </el-input>
        </div>
        <div class="style-list">
          <div
            v-for="(item, idx) in styleInfo?.list"
            :key="item?.id"
            :class="`style-item ${
              activeTagsNames.includes(`${idx + 1}`) &&
              form?.[item.uniqueKey]?.length
                ? 'active'
                : ''
            }`"
          >
            <el-collapse v-model="activeTagsNames" @change="handleChange">
              <el-collapse-item
                :title="item?.[`name${$i18n.locale}`]"
                :name="`${item?.id}`"
                :key="item?.id"
              >
              <!-- {{  item?.uniqueKey }} -->
                <el-checkbox-group v-model="form[item?.uniqueKey]">
                  <el-checkbox
                    v-for="child in item?.tags"
                    :key="child?.id"
                    :label="`${child?.id}`"
                    >{{ child?.[`name${$i18n.locale}`] }}</el-checkbox
                  >
                </el-checkbox-group>
                <!-- <div v-for="child in item?.filters" :key="child?.id">
                  {{ child?.name }}
                </div> -->
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
    <div
      class="model-product-wrap"
      :class="`${pagination.show ? 'pad-bot-45' : ''}`"
    >
      <!-- <div class="model-search">
        <el-input
          id="search-input"
          placeholder="输入关键词进行搜索"
          v-model="form.searchVal"
        >
          <template slot="append"
            ><span @click="searchClick">搜索</span></template
          >
        </el-input>
      </div> -->
      <div class="model-list">
        <div class="list-item-wrap" v-for="item in modelList" :key="item?.id">
          <div class="list-item" @click="goDetail(item)">
            <div class="model-pic">
              <img class="front-img" :src="getFrontviewUrl(item)" alt="" />
              <img class="fortyfive-img" :src="getFortyFiveviewUrl(item)" alt="" />
              <div class="tag-list">
                <div
                  class="tag-item"
                  v-for="tag in item?.tags"
                  :class="`${tag === '折' ? 'discount' : ''}`"
                >
                  {{ tag }}
                </div>
              </div>
            </div>
            <div class="model-product">
              <div class="product-code">
                {{ item?.[`name${$i18n.locale}`] }}
              </div>
              <div class="product-price">
                {{ $i18n.locale == "Zh" ? "¥ " : "$ " }}
                {{ item?.[`price${$i18n.locale == "Zh" ? "Cny" : "Usd"}`] }}
              </div>
            </div>
          </div>
        </div>
        <el-empty v-if="!modelList?.length" :image-size="200"></el-empty>
      </div>
      <div class="pagination-wrap" v-if="pagination.show">
        <el-pagination
          background
          :current-page="pagination.pageNum"
          layout="prev, pager, next"
          :total="pagination.total"
          @current-change="curPageChange"
        >
          <!-- layout="prev, pager, next, jumper" -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getModelCategory,
  getModelTagGroup,
  getModelList,
  getModelFreeList,
} from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      modelList: [
        // {
        //   id: 1,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["折", "新"],
        // },
        // {
        //   id: 2,
        //   prodPicUrl:
        //     "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["折", "新"],
        // },
        // {
        //   id: 3,
        //   prodPicUrl:
        //     "http://gips2.baidu.com/it/u=295419831,2920259701&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["折", "新"],
        // },
        // {
        //   id: 4,
        //   prodPicUrl:
        //     "http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["折", "新"],
        // },
        // {
        //   id: 5,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["折", "新"],
        // },
        // {
        //   id: 6,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["新"],
        // },
        // {
        //   id: 7,
        //   prodPicUrl:
        //     "http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   productName: "全身姿态模型",
        //   price: "¥ 200",
        //   // : ["新"],
        // },
        // {
        //   id: 8,
        //   prodPicUrl:
        //     "http://gips2.baidu.com/it/u=295419831,2920259701&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        //   // : ["新"],
        // },
        // {
        //   id: 9,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=1647344915,1746921568&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        // },
        // {
        //   id: 10,
        //   prodPicUrl:
        //     "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        // },
        // {
        //   id: 11,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        // },
        // {
        //   id: 12,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=1647344915,1746921568&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        // },
        // {
        //   id: 13,
        //   prodPicUrl:
        //     "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        //   prodCode: "Pose d1234",
        //   price: "¥ 200",
        //   productName: "全身姿态模型",
        // },
      ],
      modelTypeList: [
        { categoryId: "1", name: "全身姿态 模型", count: 200 },
        { categoryId: "2", name: "全身姿态 高精度模型", count: 400 },
        { categoryId: "3", name: "全身 A-pose模型", count: 100 },
        { categoryId: "4", name: "全身 微动态模型", count: 100 },
      ],
      styleInfo: {
        titleZh: "风格筛选",
        titleEn: "Style filtering",
        list: [
          { id: "1", value: "1", name: "群组", filters: [] },
          { id: "2", value: "2", name: "性别", filters: [] },
          { id: "3", value: "3", name: "年龄", filters: [] },
          { id: "4", value: "4", name: "场景", filters: [] },
          { id: "5", value: "5", name: "姿态", filters: [] },
          { id: "6", value: "6", name: "风格", filters: [] },
        ],
      },
      modelForm: {
        1: [],
        2: [],
        3: [],
        4: [],
      },
      form: {
        // searchVal: "",
        filterSearch: "",
        modelType: "",
        categoryId: "",
        tpye: [],
        gender: [],
        age: [],
        activity: [],
        clothing: [],
        accessorise: [],
        area: [],
      },
      activeModelNames: [],
      activeTagsNames: [],
      tagKeys: [],
      pagination: {
        show: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  watch: {
    $route(to) {
      console.log("to>>>>>>", to);
      this.form.modelType = to.query?.modelType || "";
      this.getModelListData(true);
    },
    form: {
      handler(val) {
        console.log("this.form>>>>", val);
        this.getModelListData(1);
      },
      deep: true,
    },
    modelForm: {
      handler(val) {
        this.getModelListData(1);
        console.log("this.modelForm>>>>", val);
      },
      deep: true,
    },
  },
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
  },
  methods: {
    // 模型种类单选切换
    radioChange(val, id) {
      console.log(111, val, this.activeModelNames, id);
      Object.entries(this.modelForm).forEach(([key, values]) => {
        this.$set(this.modelForm, `${key}`, []);
      });
      this.$set(this.modelForm, id, val);
      this.form.categoryId = val;
    },
    // 重置筛选项
    resetSelect() {
      this.form = {
        filterSearch: "",
        modelType: "",
        categoryId: "",
        tpye: [],
        gender: [],
        age: [],
        activity: [],
        clothing: [],
        accessorise: [],
        area: [],
      };
      this.modelForm = {
        1: [],
        2: [],
        3: [],
        4: [],
      };
      this.activeModelNames = [];
      this.activeTagsNames = [];
      this.getModelListData(1);
    },
    // 获取图片展示
    getFrontviewUrl(item) {
      const splitTar = item.frontView && item.frontView.split(',')
      if (splitTar && splitTar.length > 0) {
        return splitTar[0]
      } else {
        return ''
      }
    },
    getFortyFiveviewUrl(item) {
      const splitTar = item.fortyFiveView && item.fortyFiveView.split(',')
      if (splitTar && splitTar.length > 0) {
        return splitTar[0]
      } else {
        return ''
      }
    },
    // 去商品详情
    goDetail(item) {
      window.open(`/prodDetail/${item?.id}`, "_blank");
      // this.$router.push(`/prodDetail/${item?.id}`);
    },
    // 模型点击
    modelClick(item) {
      if (item?.categoryId == this.form.modelType) return;
      this.form.modelType = item?.categoryId;
      console.log("curModelType", item, item?.name);
    },
    searchClick() {
      console.log("搜索点击");
    },
    handleModelChange(val) {
      console.log("val>>>>>>>>>>", val);
      this.activeModelNames = val;
    },
    handleChange(val) {
      console.log("val>>>>>>>>>>", val);
      this.activeTagsNames = val;
    },
    initPageQuery() {
      const query = this.$route.query;
      this.form.modelType = query?.modelType || "";
    },
    // 处理筛选条件
    initFilter(res = []) {
      this.tagKeys = [];
      res.forEach((item) => {
        let _key = item?.nameEn?.toLocaleLowerCase();
        item.uniqueKey = _key;
        this.tagKeys.push(_key);
        this.$set(this.form, _key, []);
      });
    },
    // 获取标签列表
    async getModelTagGroupData() {
      const res = await getModelTagGroup();
      this.styleInfo.list = [...res];
      this.initFilter(res);
      console.log("getModelTagGroup>>>>>>>", res);
    },
    // 重置pageNum
    resetPageConfig() {
      this.pagination.pageNum = 1;
    },
    // 页码变化触发
    curPageChange(pageNum) {
      this.pagination.pageNum = pageNum;
      this.getModelListData();
    },
    // 获取所有tags筛选集合
    getAllTagsFilter() {
      let tagIds = [];
      this.tagKeys.forEach((item) => {
        if (this.form[item]) {
          tagIds = tagIds.concat(this.form[item]);
        }
      });
      return tagIds;
    },
    // 获取模型列表(收费or免费)
    async getModelListData(flag, config = {}) {
      if (flag) {
        this.resetPageConfig();
      }
      const query = this.$route.query;
      let res = [];
      if (query?.isFree === "1") {
        // 免费模型
        res = await getModelFreeList({
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
          categoryId: this.form.categoryId,
          tagIds: this.getAllTagsFilter(),
          ...config,
        });
      } else {
        // 收费模型
        res = await getModelList({
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
          categoryId: this.form.categoryId,
          tagIds: this.getAllTagsFilter(),
          ...config,
        });
      }
      this.pagination.show =
        res?.total != 0 && res?.total / this.pagination.pageSize > 1;
      this.pagination.total = res?.total || 0;
      this.modelList = res?.data || [];
      console.log("getModelListData>>>>>>>", res);
    },
    // 模型分类
    modelTypeHandler() {
      const modelCategory_data = localStorage.getItem("modelCategory_data");
      if (modelCategory_data) {
        this.modelTypeList = JSON.parse(modelCategory_data);
        this.modelTypeList.forEach((item) => {
          this.$set(this.modelForm, item?.id, []);
        });
        console.log("this.modelForm>>>>>>", this.modelForm);
      }
    },
  },
  created() {
    this.initPageQuery();
    this.getModelTagGroupData();
    this.getModelListData();
  },
  mounted() {
    this.modelTypeHandler();
  },
};
</script>
<style lang="less" scoped>
.model-list-wrapper {
  display: flex;
  height: calc(100vh - 100px);
  .model-sidebar {
    width: 350px;
    padding: 30px 17px;
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: #f3f3f3;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    .reset-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-family: Inter, Inter;
      font-size: 15px;
      color: #000;
      background: #e5e5e5;
      border-radius: 9px 9px 9px 9px;
      cursor: pointer;
      &:hover {
        color: #ed6336;
      }
    }
    .model-type-list {
      margin: 30px 0 13px 0;
      .model-type-title {
        height: 24px;
        margin-bottom: 13px;
        font-family: Inter, Inter;
        font-size: 20px;
        color: #000;
        text-align: center;
        font-weight: 400;
      }
      .model-type-item {
        height: 40px;
        margin-bottom: 14px;
        border-radius: 4px 4px 4px 4px;
        overflow: hidden;
        background-color: #d9d9d9;
        cursor: pointer;
        &.active {
          background: linear-gradient(
            #ed8337 100%,
            #f3a46b 10%,
            rgba(255, 255, 255, 0) 11%
          );
        }
        .model-type-text {
          display: flex;
          align-items: center;
          padding: 0 26px 0 21px;
          height: 36px;
          background-color: #d9d9d9;
          &:hover {
            color: #ed6336;
          }
        }
      }
      /deep/ .el-radio {
        display: flex;
        margin-right: 0;
        height: 28px;
        .el-radio__input {
          width: 0;
          overflow: hidden;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #ed6336;
        }
        .el-radio__label {
          padding-left: 5px;
        }
      }
    }
    .style-wrap {
      margin-top: 50px;
      .style-title {
        height: 24px;
        font-family: Inter, Inter;
        font-weight: 400;
        font-size: 20px;
        color: #000;
        text-align: center;
      }
      .style-search {
        margin-top: 16px;
        /deep/ .el-input__inner {
          text-align: center;
          color: #000;
        }
      }
    }
    .style-list {
      margin-top: 10px;
      .style-item {
        position: relative;
        margin-bottom: 10px;
        background: #e5e5e5;
        border-radius: 4px 4px 4px 4px;
        .model-size {
          position: absolute;
          right: 12px;
          top: 12px;
        }
        /deep/ .el-collapse {
          border-top: none;
          border-bottom: none;
        }
        /deep/ .el-collapse-item__header {
          padding: 0 26px 0 21px;
          color: #000;
          font-size: 15px;
          font-weight: 400;
          background-color: transparent;
        }
        /deep/ .el-collapse-item__arrow {
          display: none;
        }
        /deep/ .el-collapse-item__content {
          margin-top: 10px;
          padding: 15px 15px 10px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #000000;
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #ed6336;
          border-color: #ed6336;
        }
        /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
          border-color: #ed6336;
          &:hover,
          &:focus {
            border-color: #ed6336;
          }
        }
        /deep/ .el-checkbox__inner {
          &:hover,
          &:focus {
            border-color: #ed6336;
          }
        }
        /deep/ .el-checkbox__label {
          color: #000;
          font-weight: 400;
          font-size: 15px;
        }
        /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #000;
        }
        &.active {
          /deep/ .el-collapse-item__header {
            color: #ed6336;
          }
        }
      }
    }
  }
  .model-product-wrap {
    position: relative;
    flex: 1;
    &.pad-bot-45 {
      padding-bottom: 45px;
    }
    .pagination-wrap {
      display: flex;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 45px;
      padding-top: 15px;
      left: 0;
      bottom: 15px;
      z-index: 2;
      background-color: #fff;
      /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ed6336;
      }
      /deep/ .el-pager li:hover {
        color: #ed6336;
      }
    }
  }
  .model-search {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 60px 0 30px;
    background-color: #d9d9d9;
    /deep/ #search-input {
      text-align: center;
      &:focus {
        outline: none;
        border-color: #dcdfe6;
      }
    }
    /deep/ .el-input-group__append {
      color: #fff;
      font-weight: bold;
      background-color: #ed6336;
      cursor: pointer;
    }
  }
  .model-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    padding: 0 0px 20px 10px;
    flex: 1;
    height: calc(100% - 10px); // 搜索暂时不做
    // height: calc(100% - 70px); // 60(搜索框高度60) + 10(margin)
    overflow-x: hidden;
    overflow-y: auto;
    /deep/ .el-empty {
      margin: 0 auto;
    }
    &::-webkit-scrollbar {
      width: 0;
    }
    .list-item-wrap {
      flex: 0 0 20%;
      padding: 0 10px 10px 0;
      background-color: #ffffff;
      border-radius: 22px 22px 22px 22px;
      cursor: pointer;
      .list-item {
        position: relative;
        background-color: #d9d9d9;
        border-radius: 15px;
        overflow: hidden;
        .model-pic {
          position: relative;
          overflow: hidden;
          &:hover {
            img.front-img {
              display: none;
            }
            img.fortyfive-img {
              display: block;
            }
            // img {
            //   transform: scale(1.3);
            // }
          }
          img {
            transition: transform 0.3s linear;
            display: block;
            width: 100%;
          }
          img.front-img {
            display: block;
          }
          img.fortyfive-img {
            display: none;
          }
          .new-tag {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 120px;
            padding: 3px 0;
            z-index: 1;
            color: #fff;
            font-size: 14px;
            border-radius: 0 5px 0 0;
            background-color: #a4b76e;
            font-weight: bold;
            span {
              margin-left: 10px;
              padding: 0 5px;
              font-size: 10px;
              color: #b0bd99;
              border-radius: 3px;
              background-color: #fff;
            }
          }
        }
        .tag-list {
          position: absolute;
          display: flex;
          align-items: center;
          top: 10px;
          right: 10px;
          .tag-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            background-color: #ababaa;
            border-radius: 28px;
            &.discount {
              margin-right: 6px;
              background-color: #ed8337;
            }
          }
        }
        .model-product {
          padding: 20px 12px;
          background-color: #e8e8e8;
          font-weight: 500;
          .product-code {
            font-size: 14px;
            color: #222;
            // text-overflow: ellipsis;
            // overflow: hidden;
            // white-space: nowrap;
          }
          .product-price {
            margin-top: 15px;
            color: #000;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
