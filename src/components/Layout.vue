<template>
  <div>
    <div v-if="!$route.meta.hideNavBar" class="page-header">
      <Header></Header>
    </div>
    <div
      class="page-content"
      :style="{ paddingTop: !$route.meta.hideNavBar ? '100px' : 0 }"
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
    return {};
  },
  components: {
    Header,
  },
  created() {
    console.log(333, this.$route);
  },
};
</script>
<style lang="less" scoped>
.page-content {
  padding-top: 100px;
}
</style>
