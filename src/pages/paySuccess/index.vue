<template>
  <div class="success-page">
    <div>
      <img v-if="status == '1'" src="@/assets/imgs/buyCar/paySuccess.png" />
      <img v-if="status != '1'" src="@/assets/imgs/buyCar/payFail.png" />
    </div>
    <div class="pay-success">{{ payText }}</div>
    <div v-if="status == '2'" class="fail-text">
      {{ isZh ? "订单超时未支付" : "Order Timeout Unpaid" }}
    </div>
    <div v-if="errText && status == '3'" class="fail-text">{{ errText }}</div>
    <div class="btn-list">
      <div class="back-myaccount" @click="continueToBuy">{{ isZh ? '继续购买' : 'Continue to buy' }}</div>
      <div class="trade-list"  v-if="status === '1'" @click="tradeList">{{ isZh ? '交易列表' : 'Trade List' }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "1",
    };
  },
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
    lang() {
      return this.$i18n.locale;
    },
    payText() {
      return this.isZh
        ? this.status == "1"
          ? "支付成功"
          : "支付失败"
        : this.status == "1"
        ? "Payment Successful"
        : "Payment Failed";
    },
    errText() {
      return this.$route?.query?.errMsg
        ? decodeURIComponent(this.$route?.query?.errMsg)
        : "";
    },
  },
  methods: {
    // 继续购买
    continueToBuy() {
      this.$router.push('/modelList');
    },
    // 交易列表
    tradeList() {
      this.$router.push('/myAccount');
    }
  },
  created() {
    this.status = this.$route?.query?.status || "1"; // 1-支付成功 2 - 超时未支付
  },
};
</script>
<style lang="less" scoped>
.success-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  height: calc(100vh - 100px);
  padding-top: 150px;
  margin: 0 auto;
  .pay-success {
    padding-top: 50px;
    color: #222;
    font-size: 26px;
    /deep/ .el-icon-success {
      color: #ed6336;
      margin-right: 5px;
    }
  }
  .fail-text {
    margin-top: 15px;
    color: #f00;
    font-size: 14px;
  }
  .btn-list {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .back-myaccount, .trade-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: #ed6336;
    border-radius: 18px;
    color: #fff;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 50px;
    cursor: pointer;
  }
  .trade-list {
    margin-left: 20px;
    color: #222;
    background: transparent;
    border: 1px solid #aaa;
  }
}
</style>
