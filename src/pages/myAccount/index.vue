<template>
  <div class="my-account">
    <div class="menu-wrap">
      <div class="title">{{isZh ? '我的账户' : 'My Account'}}</div>
      <div class="menu-list">
        <div
          class="menu-item"
          :class="`${type === '1' ? 'active' : ''}`"
          @click="tabClick('1')"
        >
          <span>{{isZh ? '交易记录' : 'Transaction records'}}</span><span v-if="tradeCount">{{ tradeCount }}</span>
        </div>
        <!-- <div
          class="menu-item"
          :class="`${type === '2' ? 'active' : ''}`"
          @click="tabClick('2')"
        >
          <span>收藏夹</span><span>3</span>
        </div>
        <div
          class="menu-item"
          :class="`${type === '3' ? 'active' : ''}`"
          @click="tabClick('3')"
        >
          足迹
        </div> -->
        <!-- <div
          class="menu-item"
          :class="`${type === '4' ? 'active' : ''}`"
          @click="tabClick('4')"
        >
          开票信息
        </div> -->
        <!-- <div
          class="menu-item"
          :class="`${type === '5' ? 'active' : ''}`"
          @click="tabClick('5')"
        >
          <span>优惠券</span><span>2</span>
        </div> -->
      </div>
    </div>
    <div class="content-wrap">
      <TradeLog v-if="type === '1'" @updateCount="updateCount" />
      <Favorites v-if="type === '2'" />
      <FootPrint v-if="type === '3'" />
      <Invocie v-if="type === '4'" />
      <Coupon v-if="type === '5'" />
    </div>
  </div>
</template>
<script>
import TradeLog from "./tradeLog.vue";
import Favorites from "./favorites.vue";
import FootPrint from "./footPrint.vue";
import Invocie from "./invoice.vue";
import Coupon from "./coupon.vue";

export default {
  data() {
    return {
      type: "1", // 1 交易记录 2 收藏夹 3 足迹 4 开票信息 5 优惠券
      tradeCount: 0,
    };
  },
  components: {
    TradeLog,
    Favorites,
    FootPrint,
    Invocie,
    Coupon
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
    tabClick(key) {
      this.type = key;
    },
    updateCount(val) {
      this.tradeCount = val || 0;
    }
  },
  created() {
    this.type = this.$route.query?.type || '1';
  }
};
</script>
<style lang="less" scoped>
.my-account {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 100px);
  padding: 0 15px 0 30px;
  background-color: #f3f3f3;
  overflow: hidden;
  .menu-wrap {
    width: 280px;
    margin-right: 100px;
    flex-shrink: 0;
    padding: 0 15px;
    background-color: #fff;
    .title {
      padding: 45px 0 45px 45px;
      font-weight: bold;
      font-size: 24px;
      color: #000;
      line-height: 28px;
    }
    .menu-list {
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
        margin-bottom: 30px;
        padding: 0 30px 0 45px;
        color: #000;
        background: #e5e5e5;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 7px 7px 7px 7px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        &.active {
          color: #ed6336;
        }
      }
    }
  }
  .content-wrap {
    flex: 1;
    padding: 30px 45px 30px 0;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
