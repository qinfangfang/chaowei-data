<template>
  <div class="model-list-wrapper">
    <div class="model-sidebar">
      <div class="reset-btn">复位选项</div>
      <div class="model-type-list">
        <div class="model-type-title">模型种类</div>
        <div
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
        </div>
      </div>
      <div class="style-wrap">
        <div class="style-title">{{ styleInfo?.title }}</div>
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
            :class="`style-item ${idx === 1 ? 'active' : ''}`"
          >
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :title="item?.name" :name="item?.value">
                <el-checkbox-group v-model="form.sex">
                  <el-checkbox
                    v-for="child in item?.filters"
                    :key="child?.id"
                    :label="child?.name"
                  ></el-checkbox>
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
    <div class="model-product">
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
              <img :src="item?.prodPicUrl" alt="模型图片" />
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
              <div class="product-code">{{ item?.productName }}</div>
              <div class="product-price">{{ item?.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelList: [
        {
          id: 1,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["折", "新"],
        },
        {
          id: 2,
          prodPicUrl:
            "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["折", "新"],
        },
        {
          id: 3,
          prodPicUrl:
            "http://gips2.baidu.com/it/u=295419831,2920259701&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["折", "新"],
        },
        {
          id: 4,
          prodPicUrl:
            "http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["折", "新"],
        },
        {
          id: 5,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["折", "新"],
        },
        {
          id: 6,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["新"],
        },
        {
          id: 7,
          prodPicUrl:
            "http://gips3.baidu.com/it/u=1537137094,335954266&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          productName: "全身姿态模型",
          price: "¥ 200",
          // : ["新"],
        },
        {
          id: 8,
          prodPicUrl:
            "http://gips2.baidu.com/it/u=295419831,2920259701&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
          // : ["新"],
        },
        {
          id: 9,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=1647344915,1746921568&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
        },
        {
          id: 10,
          prodPicUrl:
            "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
        },
        {
          id: 11,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
        },
        {
          id: 12,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=1647344915,1746921568&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
        },
        {
          id: 13,
          prodPicUrl:
            "http://gips1.baidu.com/it/u=3874647369,3220417986&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
          prodCode: "Pose d1234",
          price: "¥ 200",
          productName: "全身姿态模型",
        },
      ],
      modelTypeList: [
        { categoryId: "1", name: "全身姿态 模型", count: 200 },
        { categoryId: "2", name: "全身姿态 高精度模型", count: 400 },
        { categoryId: "3", name: "全身 A-pose模型", count: 100 },
        { categoryId: "4", name: "全身 微动态模型", count: 100 },
      ],
      styleInfo: {
        title: "风格筛选",
        list: [
          { id: "1", value: "1", name: "群组", filters: [] },
          {
            id: "2",
            value: "2",
            name: "性别",
            type: "checkbox",
            filters: [
              { id: "2-1", value: "1", name: "男性", count: 808 },
              { id: "2-2", value: "2", name: "女性", count: 909 },
            ],
          },
          { id: "3", value: "3", name: "年龄", filters: [] },
          { id: "4", value: "4", name: "场景", filters: [] },
          { id: "5", value: "5", name: "姿态", filters: [] },
          { id: "6", value: "6", name: "风格", filters: [] },
        ],
      },
      form: {
        searchVal: "",
        filterSearch: "",
        modelType: "",
        sex: [],
      },
      activeNames: ["2"],
    };
  },
  watch: {
    $route(to) {
      console.log("to>>>>>>", to);
      this.form.modelType = to.query?.modelType || "";
      console.log("this.form>>>>", this.form.modelType);
    },
  },
  methods: {
    // 去商品详情
    goDetail(item) {
      this.$router.push(`/prodDetail/${item?.id}`);
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
    handleChange(val) {
      console.log("val>>>>>>>>>>", val);
    },
    initPageQuery() {
      const query = this.$route.query;
      this.form.modelType = query?.modelType || "";
      console.log("this.form>>>>", this.form.modelType);
    },
  },
  created() {
    this.initPageQuery();
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
      .style-list {
        margin-top: 10px;
        .style-item {
          margin-bottom: 10px;
          background: #e5e5e5;
          border-radius: 4px 4px 4px 4px;
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
            padding: 15px 15px;
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
            img {
              transform: scale(1.3);
            }
          }
          img {
            transition: transform 0.3s linear;
            display: block;
            width: 100%;
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
          padding: 20px 0 20px 12px;
          background-color: #e8e8e8;
          font-weight: 500;
          .product-code {
            font-size: 16px;
            color: #222;
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
