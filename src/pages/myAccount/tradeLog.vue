<template>
  <div class="trade-log">
    <div class="page-title">交易 清单</div>
    <div class="trade-log-wrap">
      <div class="all-products">
        <div class="prod-operate">
          <div class="selected-all">
            <el-checkbox v-model="selectAll" @change="checkChange"
              >全选</el-checkbox
            >
          </div>
          <div class="delete-selected">
            <el-button size="mini" @click="handleEdit()"
              >下载所选</el-button
            >
            <el-button size="mini" @click="handleEdit()"
              >删除所选</el-button
            >
            <el-button size="mini" @click="handleEdit()"
              >所选开票</el-button
            >
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="prodList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <div class="product-info">
                <div class="prodcut-pic">
                  <img
                    src="http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280"
                    alt=""
                  />
                </div>
                <div class="product-name">
                  <div>{{ scope?.row?.productName }}</div>
                  <div class="name">{{ scope?.row?.productNo }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="300">
            <template slot-scope="scope">
              <div class="product-price">￥ 167.00</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="moveto-favorites">再次下载</div>
              <div class="get-invoice">开具发票</div>
              <div class="delete-btn">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prodList: [
        {
          productCode: "1",
          productName: "超越维度  3D B类写实人物",
          productNo: "SD_A_LiuYS_F_504",
          date: "2016-05-03",
          price: "￥ 167.00",
        },
        {
          productCode: "2",
          productName: "超越维度  3D B类写实人物",
          productNo: "SD_A_LiuYS_F_504",
          date: "2016-05-02",
          price: "￥ 167.00",
        },
        {
          productCode: "3",
          productName: "超越维度  3D B类写实人物",
          productNo: "SD_A_LiuYS_F_504",
          date: "2016-05-04",
          price: "￥ 167.00",
        },
        {
          productCode: "4",
          productName: "超越维度  3D B类写实人物",
          productNo: "SD_A_LiuYS_F_504",
          date: "2016-05-01",
          price: "￥ 167.00",
        },
      ],
      selectAll: false,
      selectedList: [],
    };
  },
  methods: {
    handleEdit() {},
    checkChange(val) {
      console.log("checkChange>>>>>>>>", val);
      if (val) {
        this.$refs.multipleTable.toggleAllSelection();
      }
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.selectedList = val;
      this.selectAll = false;
      if (this.selectedList.length === this.prodList.length) {
        this.selectAll = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.trade-log {
  background-color: #f3f3f3;
  .page-title {
    margin-bottom: 15px;
    font-family: Inter, Inter;
    font-size: 32px;
    color: #000;
    line-height: 47px;
  }
  .trade-log-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .all-products {
      flex: 1;
      background-color: #fff;
      border-radius: 22px 22px 22px 22px;
      overflow: hidden;
      .prod-operate {
        display: flex;
        align-items: center;
        height: 60px;
        padding-left: 30px;
        .selected-all {
          /deep/ .el-checkbox {
            color: #000;
          }
          /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #ed6336;
            border-color: #ed6336;
          }
          /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #ed6336;
          }
          /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #ed6336;
            &:hover,
            &:focus {
              border-color: #ed6336;
            }
          }
          /deep/ .el-checkbox__inner {
            width: 20px;
            height: 20px;
            &::after {
              content: "";
              left: 7px;
              top: 4px;
            }
            &:hover,
            &:focus {
              border-color: #ed6336;
            }
          }
        }
        .delete-selected {
          margin-left: 30px;
          cursor: pointer;
          /deep/ .el-button:hover,
          /deep/ .el-button:focus {
            color: #606266;
            background-color: initial;
            border-color: #dcdfe6;
          }
        }
      }
      /deep/ .el-table thead {
        tr {
          height: 45px;
          background: #ddd;
        }
        th.el-table__cell {
          padding: 0;
          font-family: Inter, Inter;
          font-weight: 400;
          font-size: 18px;
          color: #000;
          text-align: left;
          background: #ddd;
          &:nth-child(1) {
            position: relative;
            z-index: -1;
          }
          &:nth-child(2) {
            padding-left: 145px;
          }
        }
      }
      /deep/ .el-table tbody tr {
        .el-table__cell:nth-child(1) {
          .cell {
            padding-left: 30px;
          }
          .el-checkbox__inner {
            width: 20px;
            height: 20px;
            &::after {
              content: "";
              left: 7px;
              top: 4px;
            }
          }
          .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #ed6336;
            border-color: #ed6336;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #ed6336;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #ed6336;
            &:hover,
            &:focus {
              border-color: #ed6336;
            }
          }
          .el-checkbox__inner {
            &:hover,
            &:focus {
              border-color: #ed6336;
            }
          }
        }
      }
      .product-info {
        display: flex;
        align-items: center;
        .prodcut-pic {
          width: 87px;
          cursor: pointer;
          img {
            display: block;
            width: 100%;
          }
        }
        .product-name {
          margin-left: 55px;
          font-family: Inter, Inter;
          font-weight: 400;
          font-size: 16px;
          color: #000;
          line-height: 28px;
          .name {
            margin-top: 20px;
          }
        }
      }
      .product-price {
        font-weight: 400;
        font-size: 24px;
        color: #ed6336;
        line-height: 35px;
      }
      .moveto-favorites,
      .get-invoice {
        color: #000;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #ed6336;
        }
      }
      // .get-invoice {
      //   color: #666;
      // }
      .delete-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 66px;
        height: 24px;
        margin-top: 15px;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        background-color: #ed6336;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
