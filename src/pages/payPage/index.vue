<template>
  <div class="pay-wrap-module">
    <div class="buy-product-info">
      <div class="product-item">
        <span class="pay-label">{{isZh ? '购买商品' : 'Purchase goods'}}：</span>
        <span class="product-namelist">{{ productName }}</span>
      </div>
      <div class="product-item product-price">
        <span class="pay-label">{{isZh ? '商品总价' : 'Total price of the product'}}：</span>
        <span class="price-num">{{ unit }}{{ totalMoney }}</span>
      </div>
    </div>
    <div class="qr-code-wrap" v-show="showQrCode">
      <!-- 微信支付 | 支付宝支付 -->
      <canvas id="qr-code"></canvas>
      <iframe v-if="false && aliPayFormHtml" :srcdoc="aliPayFormHtml" frameborder="no" border="0" marginwidth="0"
        marginheight="0" scrolling="no" width="200" height="200" style="overflow: hidden"></iframe>
    </div>
    <div class="count-down" v-if="count">
      {{ isZh ? '支付剩余时间' : 'Remaining time paid'}}：<span>{{ countDown.minutes }} </span>{{ isZh? '分' : 'mm'}} :
      <span>{{ countDown.seconds }} </span>{{ isZh ? '秒' : 'ss' }}
    </div>
    <div class="count-down" v-if="count">
      {{  isZh ? '请尽快完成支付, 否则会影响您的购物体验~' : 'Please complete the payment as soon as possible, otherwise it will affect your shopping experience' }}
    </div>
  </div>
</template>
<script>
import { orderCreate, queryOrderStatus } from "@/api/order.js";
import { orderCartList } from "@/api/buyCar.js";
import QRCode from "qrcode";
import Cookies from "js-cookie";

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
      prodList: [],
      modelIds: [],
    };
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
    productName() {
      const nameArr = [];
      this.prodList.forEach(item => {
        nameArr.push(item?.[`name${this.$i18n.locale}`]);
      });
      return nameArr.join('、');
    },
    totalMoney() {
      const price = this.prodList.reduce((pre, cur) => {
        return pre + cur?.[`price${this.$i18n.locale == "Zh" ? "Cny" : "Usd"}`];
      }, 0);
      return price;
    },
    countDown() {
      let minutes = parseInt(this.count / 60);
      let seconds = this.count - minutes * 60;
      minutes =
        minutes == 0 ? "00" : minutes >= 10 ? `${minutes}` : `0${minutes}`;
      seconds =
        seconds == 0 ? "00" : seconds >= 10 ? `${seconds}` : `0${seconds}`;
      return { minutes, seconds };
    },
  },
  methods: {
    // 创建支付二维码
    createQrCode(payInfo = "") {
      const qrCodeEle = document.getElementById("qr-code");
      console.log("QRCode>>>>>>>>>>>>>", QRCode);
      payInfo && QRCode.toCanvas(qrCodeEle, payInfo);
      this.showQrCode = true;
    },
    // 提交购物车
    async submitBuyCar() {
      console.log("结算");
      if (this.orderId) return;
      if (Cookies.get("payInfo")) { // cookies有值
        const payInfo = Cookies.get("payInfo");
        // if (this.payType == "1") {
        // 微信支付
        setTimeout(() => {
          this.createQrCode(payInfo);
        }, 100)
        this.payCallBack();
        // } else {
        //   this.showQrCode = true;
        //   this.aliPayFormHtml = payInfo;
        // }
        return;
      }
      const modelIds = this.modelIds;
      if (!modelIds.length) return;
      const res = await orderCreate({
        payType: this.payType,
        modelIds,
      });
      console.log("创建订单>>>>>>>>>>>>", res);
      const payInfo = res?.payInfo;
      if (!res.code && res?.payInfo) {
        this.orderId = res?.orderId;
        this.count = res?.payInfoExpirySeconds || 6000; // 默认剩余时间6000s

        const seconds = 600; // 600s
        const expires = new Date(new Date() * 1 + seconds * 1000);

        payInfo  && Cookies.set("payInfo", payInfo, { expires });
        res?.orderId && Cookies.set("payOrderId", res?.orderId, { expires });
        Cookies.set("payEndTime", expires, { expires });

        this.createQrCode(payInfo);
        // if (this.payType == "1") {
        //   // 微信支付
        //   this.createQrCode(payInfo);
        // } else {
        //   this.showQrCode = true;
        //   this.aliPayFormHtml = payInfo;
        // }
        this.payCallBack();
      } else {
        res?.msg && this.$message.error(res?.msg);
      }
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
          this.$router.push(`/paySuccess?status=2`);
          return;
        }
        if (this.count % 5 == 0) {
          // 5s查询一次
          const res = await queryOrderStatus({ orderId: this.orderId || Cookies.get('payOrderId') }).catch(
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
    // 获取购物车数据
    async getOrderList() {
      const res = JSON.parse(localStorage.getItem(`payProductList_${this.modelIds.join('&')}`) || []);
      console.log("购物车所选商品>>>>>", res);
      this.prodList = res;
      this.prodList = this.prodList.filter((item) => {
        return this.modelIds.includes(item?.modelId);
      });
    },
  },
  created() {
    this.payType = this.$route?.query?.payType;
    this.modelIds = JSON.parse(this.$route?.query?.modelIds || "[]");
    const payEndTime = Cookies.get('payEndTime') || 0;
    if (payEndTime && payEndTime != 0) {
      this.count = Math.round((new Date(payEndTime).getTime() - new Date().getTime()) / 1000);
    }
    this.getOrderList();
    // setTimeout(() => {
      this.submitBuyCar();
    // }, 10000)
  },
  beforeDestroy() {
    this.closeTimer();
  }
};
</script>
<style lang="less" scoped>
.pay-wrap-module {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px auto;
  padding-top: 100px;
  max-width: 1200px;
  .buy-product-info {
    // width: 200px;
    // height: 200px;
    margin: 0 auto;
    max-width: 600px;
    .product-item {
      display: flex;
      &.product-price {
        margin-top: 15px;
      }
      .product-namelist {
        margin-top: -6px;
        color: #333;
        font-size: 14px;
        line-height: 36px;
      }
      .pay-label {
        white-space: nowrap;
      }
      .price-num {
        color: #ed6336;
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
</style>
