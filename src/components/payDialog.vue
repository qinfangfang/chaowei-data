<template>
  <el-dialog
    width="480px"
    center
    :visible="visible"
    :show-close="true"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    class="pay-type-dialog"
    @close="close"
  >
    <div class="pay-wrap">
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
      <div
        class="submit-btn"
        :class="`${orderId ? 'disabled' : ''}`"
        @click="submitBuyCar"
      >
        确认
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { orderCreate, queryOrderStatus } from "@/api/order.js";
import QRCode from "qrcode";

export default {
  data() {
    return {
      payType: "1", // 1-微信、2-支付宝
      showQrCode: false,
      aliPayFormHtml: "",
      timer: null,
      orderId: null,
      duration: 1000,
      count: 0,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    prodData: {
      type: Object,
      default: {},
    },
  },
  computed: {
    countDown() {
      let minutes = parseInt(this.count / 60);
      let seconds = this.count - minutes * 60;
      minutes =
        minutes == 0 ? "00" : minutes > 10 ? `${minutes}` : `0${minutes}`;
      seconds =
        seconds == 0 ? "00" : seconds > 10 ? `${seconds}` : `0${seconds}`;
      return { minutes, seconds };
    },
  },
  methods: {
    // 关闭定时器
    closeTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 切换支付方式
    tabChangePayType(key) {
      this.showQrCode = false;
      this.payType = key;
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
      }, 1000); // 5s查询一次
    },
    // 创建支付二维码
    createQrCode(payInfo = "") {
      const qrCodeEle = document.getElementById("qr-code");
      console.log("QRCode>>>>>>>>>>>>>", QRCode);
      payInfo && QRCode.toCanvas(qrCodeEle, payInfo);
      this.showQrCode = true;
    },
    // 直接购买
    async submitBuyCar() {
      console.log("直接购买");
      if (this.orderId) return;
      const res = await orderCreate({
        payType: this.payType,
        modelIds: [this.prodData?.id],
      });
      console.log("创建订单>>>>>>>>>>>>", res);
      const payInfo = res?.payInfo;
      if (!res.code && res?.payInfo) {
        this.orderId = res?.orderId;
        this.count = res?.payInfoExpirySeconds || 6000; // 默认剩余时间6000s
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
    close() {
      this.closeTimer();
      this.$emit("close");
    },
  },
  beforeDestroy() {
    this.closeTimer();
  },
};
</script>

<style lang="less" scoped>
.pay-type-dialog {
  /dedp/ .el-dialog {
    border-radius: 10px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close:hover {
    color: #ed6336;
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
      margin-top: 15px;
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
    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 60%;
      margin: 50px auto 0;
      color: #fff;
      font-weight: 18px;
      font-weight: 500;
      border-radius: 40px;
      border-color: #ed6336;
      background-color: #ed6336;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
        background-color: #ddd;
      }
    }
  }
}
</style>
