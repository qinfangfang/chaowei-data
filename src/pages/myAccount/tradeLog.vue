<template>
  <div class="trade-log">
    <div class="page-title">交易 清单</div>
    <div class="trade-log-wrap" :class="`${pagination.total > pagination.pageSize ? 'pagination' : ''}`">
      <div class="all-products">
        <div class="prod-operate">
          <div class="selected-all">
            <el-checkbox v-model="selectAll" @change="checkChange">全选</el-checkbox>
          </div>
          <div class="delete-selected">
            <el-button size="mini" @click="handleEdit()">下载所选</el-button>
            <!-- <el-button size="mini" @click="handleEdit()">删除所选</el-button> -->
            <el-button size="mini" @click="batchInvoice">所选开票</el-button>
          </div>
        </div>
        <el-table ref="multipleTable" :data="prodList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <div class="product-info">
                <div class="prodcut-pic">
                  <img :src="getProdImageUrl(scope?.row?.model)" alt="" />
                </div>
                <div class="product-name" @click="goDetail(scope?.row?.model)">
                  <div>{{ scope?.row?.model?.[`name${$i18n.locale}`] }}</div>
                  <div class="name">{{ scope?.row?.model?.code }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="100">
            <template slot-scope="scope">
              <div class="product-price">
                {{ $i18n.locale == "Zh" ? "¥ " : "$ " }}{{ scope?.row?.price }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="交易状态" width="100">
            <template slot-scope="scope">
              <div class="trade-status">{{ getOrderStatus(scope?.row) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="交易编号" width="150">
            <template slot-scope="scope">
              <div class="trade-id" @click="copyToClip({ content: `${scope?.row?.orderNo}` })">{{ scope?.row?.orderNo }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="交易时间" width="100">
            <template slot-scope="scope">
              <div class="trade-time">{{ formatDate(scope?.row?.createTime) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <!-- <div
                class="moveto-favorites"
                v-if="scope?.row?.receiptStatus == '3'"
              >
                再次下载
              </div> -->
              <div class="get-invoice" @click="invoiceClick(scope?.row)" v-if="scope?.row?.receiptStatus == '1'">
                开具发票
              </div>
              <div class="delete-btn" @click="downloadClick(scope?.row)">
                下载
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination-wrap" v-if="pagination.total > pagination.pageSize">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background align="right"
        :current-page="pagination.pageNum" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next" :total="pagination.total">
      </el-pagination>
    </div>
    <InvoiceDialog :visible="invoiceVisible" @confirm="invoiceHanlder" @close="invoiceVisible = false" />
  </div>
</template>
<script>
import { orderItemList, orderItemReceipt } from "@/api/order.js";
import { getModelDownloadUrlById } from "@/api/index.js";
import InvoiceDialog from "./components/invoiceDialog.vue";
import dayjs from 'dayjs';

export default {
  data() {
    return {
      prodList: [
        // {
        //   productCode: "1",
        //   productName: "超越维度  3D B类写实人物",
        //   productNo: "SD_A_LiuYS_F_504",
        //   date: "2016-05-03",
        //   price: "￥ 167.00",
        // },
        // {
        //   productCode: "2",
        //   productName: "超越维度  3D B类写实人物",
        //   productNo: "SD_A_LiuYS_F_504",
        //   date: "2016-05-02",
        //   price: "￥ 167.00",
        // },
      ],
      selectAll: false,
      selectedList: [],
      pagination: {
        total: 0,
        pageNum: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20],
      },
      invoiceData: {},
      invoiceVisible: false,
      isBatchInvoice: false,
    };
  },
  components: {
    InvoiceDialog,
  },
  methods: {
    copyToClip({ content }) {
      if (content === undefined || content === null) return;
      const createInput = document.createElement('input');
      createInput.value = content;
      document.body.appendChild(createInput);
      createInput.select();
      document.execCommand('Copy'); // document执行复制操作
      createInput.remove();
      this.$message.success('复制成功');
    },
    // 交易时间格式化
    formatDate(val) {
      if (!val) return '--';
      return dayjs(val).format('YYYY-MM-DD hh:mm:ss');
    },
    // 跳转详情页
    goDetail(data = {}) {
      window.open(`/prodDetail/${data?.id}`, "_blank");
    },
    // 下载模型
    async downloadClick(data = {}) {
      const res = await getModelDownloadUrlById({
        id: data?.model?.id,
      });
      if (!res.code && res?.url) {
        window.open(res?.url, "_blank");
      }
    },
    // 开发票弹窗确认
    async invoiceHanlder(val = {}) {
      const orderItemIds = this.selectedList.map((item) => item?.orderItemId);
      const res = await orderItemReceipt({
        orderItemIds: this.isBatchInvoice
          ? orderItemIds
          : [this.invoiceData?.orderItemId],
        ...val,
      });
      if (!res?.code) {
        this.invoiceVisible = false;
        this.queryOrderItemList();
        this.$message.success("开票成功");
      } else {
        res?.msg && this.$message.error(res?.msg);
      }
    },
    // 开具发票点击
    invoiceClick(data = {}) {
      this.invoiceData = data;
      this.isBatchInvoice = false;
      this.invoiceVisible = true;
    },
    // 批量开票
    async batchInvoice() {
      this.isBatchInvoice = true;
      this.invoiceVisible = true;
    },
    // 获取订单交易状态
    getOrderStatus(item) {
      // 开票状态 1:待开票 2:开票中 3: 开票完成
      const receiptStatus = {
        1: "待开票",
        2: "开票中",
        3: "开票完成",
      };
      return receiptStatus[item?.receiptStatus] || "已购买";
    },
    // 获取图片展示
    getProdImageUrl(item) {
      // console.log("model>>>>>>>>", item);
      return (
        item?.["frontView"] ||
        item?.["fortyFiveView"] ||
        item?.["sideView"] ||
        item?.["grayView"]
      );
    },
    // 修改pageNum
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.queryOrderItemList();
    },
    // 修改pageSize
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.queryOrderItemList();
    },
    handleEdit() { },
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
    // 查询用户订单
    async queryOrderItemList(data = {}) {
      const res = await orderItemList({
        ...this.pagination,
        ...data,
      });
      console.log("订单列表>>>>>>>>", res);
      this.prodList = res?.data || [];
      this.pagination.total = res?.total || 0;
      this.$emit('updateCount', res?.total || 0);
    },
  },
  created() {
    this.queryOrderItemList();
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
    line-height: 40px;
  }

  .trade-log-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    overflow: auto;
    height: calc(100vh - 100px - 30px - 30px - 40px - 15px);

    /**
      100px header
      30px .content-wrap padding-top
      30px .content-wrap padding-bottom
      40px .page-title height
      15px .page-title margin-bottom
      40px .pagination-wrap height
      10px .pagination-wrap margin-top
    */
    &.pagination {
      height: calc(100vh - 100px - 30px - 30px - 40px - 15px - 40px - 10px); // 去除分页
    }

    &::-webkit-scrollbar {
      // 隐藏滚动条
      width: 0;
    }

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

          /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
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

          .el-checkbox__input.is-checked+.el-checkbox__label {
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
          font-size: 13px;
          color: #000;
          line-height: 28px;
          cursor: pointer;

          .name {
            margin-top: 20px;
          }
        }
      }

      .product-price {
        font-weight: 400;
        font-size: 18px;
        color: #ed6336;
        line-height: 35px;
      }

      .trade-status {
        font-size: 14px;
        color: #222;
      }

      .trade-id,
      .trade-time {
        font-size: 13px;
        color: #222;
        cursor: default;

      }

      .trade-id {
        &:hover {
          color: #ed6336;
        }
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

  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 4px;
  }
}</style>
