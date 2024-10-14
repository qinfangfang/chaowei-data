<template>
  <div class="buy-car">
    <div class="page-title">{{ isZh ? "项目 清单" : "Item List" }}</div>
    <div class="buy-car-wrap">
      <div class="all-products-wrap">
        <div class="all-products" :class="`${pagination.total > pagination.pageSize ? 'pagination' : ''}`">
          <div class="prod-operate">
            <div class="selected-all">
              <el-checkbox v-model="selectAll" @change="checkChange">{{
                isZh ? "全选" : "Select All"
              }}</el-checkbox>
            </div>
            <div class="delete-selected">
              <el-button size="mini" @click="patchDeleteClick">{{
                isZh ? "删除所选" : "Delete selected"
              }}</el-button>
            </div>
          </div>
          <el-table
            ref="multipleTable"
            :data="prodList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="100"></el-table-column>
            <el-table-column label="" width="130">
              <template slot-scope="scope">
                <div class="product-info">
                  <div class="prodcut-pic">
                    <img :src="scope?.row?.fortyFiveView" alt="" />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="`${isZh ? '项目名称' : 'Project name'}`">
              <template slot-scope="scope">
                <div class="product-info">
                  <div class="product-name" @click="goDetail(scope?.row)">
                    <div>{{ scope?.row?.[`name${$i18n.locale}`] }}</div>
                    <div class="name">{{ scope?.row?.code }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="`${isZh ? '价格' : 'Price'}`" width="100">
              <template slot-scope="scope">
                <div class="product-price">
                  {{ unit }}
                  {{
                    scope?.row?.[`price${$i18n.locale == "Zh" ? "Cny" : "Usd"}`]
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="`${isZh ? '操作' : 'Operation'}`"
              width="200"
            >
              <template slot-scope="scope">
                <!-- <div class="moveto-favorites">移入收藏夹</div> -->
                <div
                  class="delete-btn"
                  @click="deleteClick(scope.$index, scope.row)"
                >
                  {{ isZh ? "删除" : "Delete" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          class="pagination-wrap"
          v-if="pagination.total > pagination.pageSize"
        >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            align="right"
            :current-page="pagination.pageNum"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="pagination.total"
          >
          </el-pagination>
        </div>
      </div>
      <div class="buy-cost">
        <div class="title" :class="`${$i18n?.locale}`">
          {{ $i18n?.locale == "Zh" ? "结算清单" : "Settlement List" }}
          <span
            >{{ $i18n?.locale == "Zh" ? "已选" : "Selected" }} {{ totalCount }}
            {{ $i18n?.locale == "Zh" ? "项" : "term" }}</span
          >
        </div>
        <div class="coupon-discount">
          <div class="discount-item total-money">
            <span class="label">{{
              $i18n?.locale == "Zh" ? "商品总价" : "Total price of the product"
            }}</span>
            <span class="value" :class="`${lang}`"
              >{{ unit }} {{ productTotalMoney }}</span
            >
          </div>
          <!-- <div class="discount-item total-jian">
            <span class="label">共减</span>
            <span class="value">减 {{ unit }} 17.00</span>
          </div>
          <div class="discount-item man-jian">
            <span class="label">满减</span>
            <span class="value">减 {{ unit }} 10.00</span>
          </div>
          <div class="discount-item zhe-kou">
            <span class="label">购物节折扣</span>
            <span class="value">减 {{ unit }} 7.00</span>
          </div> -->
          <div class="pay-wrap" v-if="$i18n?.locale == 'Zh'">
            <div class="pay-text">
              {{ $i18n?.locale == "Zh" ? "支付方式" : "Payment Methods" }}
            </div>
            <div class="pay-list">
              <div class="pay-item" @click="tabChangePayType('1')">
                <i
                  :class="`${
                    payType == '1' ? 'el-icon-success' : 'el-icon-circle-check'
                  }`"
                ></i>
                <div class="pay-icon">
                  <img src="@/assets/imgs/buyCar/weChat_icon.jpg" alt="" />
                </div>
                <div class="pat-text">
                  {{ $i18n?.locale == "Zh" ? "微信支付" : "Wechat Pay" }}
                </div>
              </div>
              <div class="pay-item" @click="tabChangePayType('2')">
                <i
                  :class="`${
                    payType == '2' ? 'el-icon-success' : 'el-icon-circle-check'
                  }`"
                ></i>
                <div class="pay-icon">
                  <img src="@/assets/imgs/buyCar/aliPay_icon.jpg" alt="" />
                </div>
                <div class="pat-text">
                  {{ $i18n?.locale == "Zh" ? "支付宝" : "Alipay" }}
                </div>
              </div>
              <!-- <paypal-buttons
                :on-approve="onApprove"
                :create-order="createOrder"
                :on-shipping-address-change="onShippingAddressChange"
                :on-shipping-options-change="onShippingOptionsChange"
                :on-error="onError"
                :style-object="style"
              /> -->
            </div>
            <div class="qr-code-wrap" v-show="showQrCode">
              <!-- 微信支付 -->
              <canvas v-if="payType == '1'" id="qr-code"></canvas>
              <iframe
                v-if="aliPayFormHtml"
                :srcdoc="aliPayFormHtml"
                frameborder="no"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                width="200"
                height="200"
                style="overflow: hidden"
              ></iframe>
            </div>
            <div class="count-down" v-if="count">
              支付剩余时间：<span>{{ countDown.minutes }} </span>分 :
              <span>{{ countDown.seconds }} </span>秒
            </div>
          </div>
        </div>
        <div class="total-info">
          <div class="pay-info">
            <div class="pay-money">
              <span :class="`${lang}`"
                >{{ $i18n?.locale == "Zh" ? "合计" : "Total" }}:&nbsp;</span
              >
              {{ unit }}{{ totalMoney }}
            </div>
            <!-- <div class="discount-money">共减 {{ unit }} 17.00</div> -->
          </div>
          <div
            v-if="$i18n?.locale == 'Zh'"
            class="submit-btn"
            :class="`${
              orderId || !selectedList.length ? 'disabled' : ''
            } ${lang}`"
            @click="submitBuyCar"
          >
            {{ $i18n?.locale == "Zh" ? "结算" : "Settle Accounts" }}
          </div>
        </div>
        <div
          class="paypal-btn-wrap"
          v-if="$i18n?.locale == 'En'"
        >
          <paypal-buttons
              :on-approve="onApprove"
              :create-order="createOrder"
              :on-shipping-address-change="onShippingAddressChange"
              :on-shipping-options-change="onShippingOptionsChange"
              :on-error="onError"
              :style-object="style"
            />
        </div>
        
        <div class="no-pay-type-tip">
          {{ $i18n?.locale == "Zh" ? 
          "如果没有你期望的支付方式，请联系：service@peoplegroundtruth.com" : 
          "If there's no proper listed payment option for you,please feel free to contact us: service@peoplegroundtruth.com" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { orderCartList, orderCartDeleteById } from "@/api/buyCar.js";
import {
  orderCreate,
  queryOrderStatus,
  orderpaypalCapture,
} from "@/api/order.js";
import QRCode from "qrcode";
import Cookies from "js-cookie";
console.log(paypal.Buttons, "PayPalButton---------");
console.log(Vue, "window.Vue---------");
const PayPalButton = paypal.Buttons.driver("vue", Vue);
export default {
  data() {
    return {
      prodList: [],
      selectAll: false,
      selectedList: [],
      payType: "1", // 1-微信、2-支付宝
      showQrCode: false,
      aliPayFormHtml: "",
      timer: null,
      orderId: null,
      duration: 1000,
      count: 0,
      pagination: {
        total: 0,
        pageNum: 1,
        pageSize: 20,
        pageSizes: [5, 10, 20],
      },
    };
  },
  components: {
    "paypal-buttons": PayPalButton,
  },
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
    lang() {
      return this.$i18n.locale;
    },
    unit() {
      return this.$i18n.locale == "Zh" ? "¥ " : "$ ";
    },
    totalCount() {
      return this.selectedList.length;
    },
    productTotalMoney() {
      const price = this.selectedList.reduce((pre, cur) => {
        return pre + cur?.[`price${this.$i18n.locale == "Zh" ? "Cny" : "Usd"}`];
      }, 0);
      // console.log('1111>>>>>>>>>>>', this.$globalState);
      this.$globalState.productTotalMoney = price;
      return price;
    },
    totalMoney() {
      const price = this.selectedList.reduce((pre, cur) => {
        return pre + cur?.[`price${this.$i18n.locale == "Zh" ? "Cny" : "Usd"}`];
      }, 0);
      return price;
    },
    countDown() {
      let minutes = parseInt(this.count / 60);
      let seconds = this.count - minutes * 60;
      minutes =
        minutes == 0 ? "00" : minutes > 10 ? `${minutes}` : `0${minutes}`;
      seconds =
        seconds == 0 ? "00" : seconds > 10 ? `${seconds}` : `0${seconds}`;
      return { minutes, seconds };
    },
    createOrder() {
      const that = this;
      return (data) => {
        const modelIds = that.selectedList.map((item) => item?.modelId);

        return orderCreate({
          payType: "3",
          modelIds,
        }).then((order) => order.payInfo);
      };
    },
    onApprove() {
      return (data) => {
        // Order is captured on the server
        return orderpaypalCapture({
          paypalOrderId: data.orderID,
        }).then((response) => response.json());
      };
    },
    onShippingAddressChange(data, actions) {
      if (data.shippingAddress && data.shippingAddress.countryCode !== "US") {
        return actions.reject(data.errors.COUNTRY_ERROR);
      }
    },
    onShippingOptionsChange(data, actions) {
      if (
        data.selectedShippingOption &&
        data.selectedShippingOption.type === "PICKUP"
      ) {
        return actions.reject(data.errors.STORE_UNAVAILABLE);
      }
    },
    onError: function () {
      return (err) => {
        console.error(err);
        window.location.href = "/buyCar";
      };
    },
    style: function () {
      return {
        shape: "pill",
        color: "gold",
        layout: "horizontal",
        label: "paypal",
        tagline: false,
      };
    },
  },
  methods: {
    // 修改pageNum
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.getOrderList();
    },
    // 修改pageSize
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getOrderList();
    },
    // 跳转详情页
    goDetail(data = {}) {
      window.open(`/prodDetail/${data?.modelId}`, "_blank");
    },
    // 切换支付方式
    tabChangePayType(key) {
      this.showQrCode = false;
      this.payType = key;
    },
    // 创建支付二维码
    createQrCode(payInfo = "") {
      const qrCodeEle = document.getElementById("qr-code");
      console.log("QRCode>>>>>>>>>>>>>", QRCode);
      payInfo && QRCode.toCanvas(qrCodeEle, payInfo);
      this.showQrCode = true;
    },
    // 提交购物车
    async submitBuyCar() {
      console.log("提交购物车");
      if (this.orderId || !this.selectedList.length) return;
      const modelIds = this.selectedList.map((item) => item?.modelId);
      Cookies.set("payInfo", "");
      localStorage.setItem(
        `payProductList_${modelIds.join("&")}`,
        JSON.stringify(this.selectedList)
      );
      // window.open(`/payPage?payType=${this.payType}&modelIds=${JSON.stringify(modelIds)}`);
      this.$router.replace(
        `/payPage?payType=${this.payType}&modelIds=${JSON.stringify(modelIds)}`
      );
      return;
      const res = await orderCreate({
        payType: this.payType,
        modelIds,
      });
      console.log("创建订单>>>>>>>>>>>>", res);
      const payInfo = res?.payInfo;
      if (!res.code && res?.payInfo) {
        this.orderId = res?.orderId;
        this.count = res?.payInfoExpirySeconds || 6000; // 默认剩余时间6000s
        this.getOrderList();
        if (this.payType == "1") {
          // 微信支付
          this.createQrCode(payInfo);
        } else {
          this.showQrCode = true;
          this.aliPayFormHtml = payInfo;
        }
        this.payCallBack();
      } else {
        res?.msg && this.$message.error(res?.msg);
      }
    },
    // 批量删除
    patchDeleteClick() {
      if (this.selectedList.length == 0) return;
      this.$confirm(
        this.isZh
          ? `确认要删除选择的${this.selectedList.length}个模型吗?`
          : `Are you sure you want to delete the ${this.selectedList.length} selected models?`,
        this.isZh ? "提示" : "Tips",
        {
          confirmButtonText: this.isZh ? "确定" : "Confirm",
          cancelButtonText: this.isZh ? "取消" : "Cancel",
          type: "warning",
          customClass: "global-messag0eBox",
        }
      )
        .then(async () => {
          const cartIds = this.selectedList.map((item) => item?.cartId);
          const res = await orderCartDeleteById({ cartIds });
          if (!res?.code) {
            this.$message.success(
              this.isZh ? "删除成功" : "Successfully deleted"
            );
            this.getOrderList();
          } else {
            res?.msg && this.$message.error(res?.msg);
          }
        })
        .catch(() => {});
    },
    // 删除确认
    deleteClick(idx, item) {
      this.$confirm(
        this.isZh
          ? "确认要删除此模型吗?"
          : "Are you sure you want to delete this model?",
        this.isZh ? "提示" : "Tips",
        {
          confirmButtonText: this.isZh ? "确定" : "Confirm",
          cancelButtonText: this.isZh ? "取消" : "Cancel",
          type: "warning",
          customClass: "global-messag0eBox",
        }
      )
        .then(async () => {
          const res = await orderCartDeleteById({ cartIds: [item?.cartId] });
          if (!res?.code) {
            this.$message.success(
              this.isZh ? "删除成功" : "Successfully deleted"
            );
            this.getOrderList();
          } else {
            res?.msg && this.$message.error(res?.msg);
          }
        })
        .catch(() => {});
    },
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
    // 获取购物车数据
    async getOrderList(data = {}) {
      const res = await orderCartList({ ...this.pagination, ...data });
      console.log("购物车数据>>>>>", res);
      this.prodList = res?.data || [];
      this.pagination.total = res?.total || 0;
      this.prodList.forEach((item) => {
        if (this.$route?.query?.modelId == item?.modelId) {
          this.selectedList = [item];
          setTimeout(() => {
            this.$refs.multipleTable.toggleRowSelection(item);
          }, 100);
        }
      });
    },
    // 关闭定时器
    closeTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 订单状态查询
    payCallBack() {
      this.timer = setInterval(async () => {
        this.count--;
        if (this.count < 0) {
          this.closeTimer();
          // 2- 超时未支付
          this.$router.push(`/paySuccess?status=1`);
          return;
        }
        if (this.count % 5 == 0) {
          // 5s查询一次
          const res = await queryOrderStatus({ orderId: this.orderId }).catch(
            (err) => {
              this.closeTimer();
              this.$router.push(
                `/paySuccess?status=3&errMsg=${encodeURIComponent(err?.msg)}`
              );
            }
          );
          if (!res?.code && res?.status && res?.status != "0") {
            this.closeTimer();
            // 0- 待支付 1-支付成功 2- 超时未支付
            this.$router.push(`/paySuccess?status=${res?.status}`);
          }
        }
      }, this.duration); // 5s查询一次
    },
  },
  created() {
    this.getOrderList();
  },
  beforeDestroy() {
    this.closeTimer();
  },
};
</script>
<style lang="less" scoped>
.buy-car {
  height: calc(100vh - 100px);
  padding: 30px 45px;
  background-color: #f3f3f3;
  overflow: auto;

  .page-title {
    margin-bottom: 15px;
    font-family: Inter, Inter;
    font-size: 32px;
    color: #000;
    line-height: 40px;
  }

  .buy-car-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .all-products-wrap {
      flex: 1;
    }
    .all-products {
      border-radius: 22px 22px 22px 22px;
      overflow: auto;
      height: calc(100vh - 100px - 30px - 30px - 40px - 15px);
      background-color: #fff;
      &::-webkit-scrollbar {
        // 隐藏滚动条
        width: 0;
      }
      &.pagination {
        height: calc(100vh - 100px - 30px - 30px - 40px - 15px - 40px - 10px); // 去除分页
      }
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
            color: #ed6336;
            background-color: initial;
            border-color: initial;
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
            // padding-left: 145px;
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
          font-family: Inter, Inter;
          font-weight: 400;
          font-size: 13px;
          color: #000;
          line-height: 28px;
          cursor: pointer;

          &:hover {
            color: #ed6336;
          }

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

      .moveto-favorites {
        color: #000;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          color: #ed6336;
        }
      }

      .delete-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 32px;
        margin-top: 15px;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        background-color: #ed6336;
        border-radius: 4px;
        cursor: pointer;
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

    .buy-cost {
      width: 450px;
      margin-left: 50px;
      background: #fff;
      border-radius: 22px 22px 22px 22px;

      .title {
        padding: 30px 35px;
        font-weight: bold;
        font-size: 30px;
        color: #000;
        line-height: 42px;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;

        span {
          margin-left: 50px;
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
        }

        &.En {
          font-size: 24px;

          span {
            font-size: 20px;
          }
        }
      }

      .coupon-discount {
        padding: 30px 35px 20px;

        .discount-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 400;
        }

        .total-money,
        .total-jian {
          font-size: 24px;
          color: #000;
          line-height: 28px;

          .value {
            font-size: 30px;
            line-height: 35px;
            &.En {
              font-size: 22px;
            }
          }
        }

        .total-jian {
          margin-top: 40px;

          .value {
            color: #ed6336;
            font-size: 24px;
          }
        }

        .man-jian,
        .zhe-kou {
          font-size: 15px;
          color: #787878;
          line-height: 18px;

          .value {
            color: #ed6336;
          }
        }

        .man-jian {
          margin-top: 15px;
        }

        .zhe-kou {
          margin-top: 5px;
        }

        .pay-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-top: 20px;

          .pay-text {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            position: relative;
            font-size: 24px;
            color: #000;

            span {
              margin-left: 10px;
              color: #999;
              font-size: 12px;
            }

            &::before {
              position: relative;
              top: 5px;
              content: "*";
              padding-right: 5px;
              color: #ed6336;
            }
          }

          .pay-list {
            padding-left: 15px;
          }

          .pay-item {
            display: flex;
            align-items: center;
            height: 32px;
            width: 50%;
            font-weight: 500;
            font-size: 16px;
            margin-bottom: 10px;

            &:last-child {
              margin-bottom: 0;
            }

            i {
              margin-right: 5px;
              color: #666;
              font-size: 20px;

              &.el-icon-success {
                color: #ed6336;
              }
            }

            .pay-icon {
              width: 28px;
              height: 28px;
              margin-right: 5px;

              img {
                display: block;
                width: 100%;
              }
            }
          }

          .qr-code-wrap {
            width: 200px;
            height: 200px;
            margin: 10px auto 0;
            overflow: hidden;
            border-radius: 4px;
            border: 1px solid #f1f1f1;

            #qr-code {
              width: 100% !important;
              height: 100% !important;
            }
          }

          .count-down {
            color: #222;
            margin-top: 20px;
            text-align: center;
            font-size: 14px;

            span {
              color: #ed6336;
              font-weight: 500;
            }
          }
        }
      }

      .total-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 35px;
        border-top: 1px solid #ddd;
        font-weight: 400;

        .pay-money {
          display: flex;
          align-items: center;
          font-size: 24px;
          color: #ed6336;
          line-height: 28px;
          white-space: nowrap;

          span {
            font-weight: bold;
            font-size: 30px;
            color: #000;
            line-height: 35px;
            &.En {
              font-size: 22px;
            }
          }
        }

        .discount-money {
          margin-top: 5px;
          font-size: 15px;
          color: #ed6336;
          line-height: 18px;
        }
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          padding: 0 35px;
          font-weight: bold;
          font-size: 20px;
          color: #fff;
          text-align: center;
          background: #ed6336;
          border-radius: 4px 4px 4px 4px;
          white-space: nowrap;
          cursor: pointer;
          &.En {
            font-size: 18px;
          }

          &.disabled {
            cursor: not-allowed;
            background-color: #ddd;
          }
        }
      }
      
      .paypal-btn-wrap {
        width: 300px;
        margin: 10px auto;
      } 
      .no-pay-type-tip {
        text-align: center;
        padding: 10px 0 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
