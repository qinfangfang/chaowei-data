<template>
  <div>
    <div v-if="showHeader" class="page-header">
      <Header></Header>
    </div>
    <div
      class="page-content"
      :style="{ paddingTop: showHeader ? '100px' : 0 }"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./NavHeader.vue";
export default {
  name: "Layout",
  data() {
    return {
      showHeader: false,
    };
  },
  components: {
    Header,
  },
  watch: {
    '$route'(val, oldVal) {
      // console.log(8888, val, oldVal);
      this.showHeader = !val.meta.hideNavBar;
    }
  }
};
</script>
<style lang="less" scoped>
.page-content {
  padding-top: 100px;
}
</style>
