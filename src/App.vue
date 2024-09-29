<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
document.oncontextmenu=new Function("event.returnValue=false");
document.onselectstart=new Function("event.returnValue=false");
export default {
  name: "App",
  components: {
    Layout
  },
};
</script>

<style></style>
