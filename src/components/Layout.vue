<template>
  <div>
    <div class="page-header">
      <Header></Header>
    </div>
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./NavHeader.vue";
export default {
  name: 'Layout',
  data() {
    return {};
  },
  components: {
    Header,
  },
};
</script>
<style lang="less" scoped>
  .page-content {
    padding-top: 100px;
  }
</style>
