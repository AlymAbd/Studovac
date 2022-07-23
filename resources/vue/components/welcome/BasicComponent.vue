<template>
  <Header></Header>
  <div class="ui divider"></div>
  <div class="ui fluid container">
    <router-view />
  </div>
  <Footer></Footer>
</template>

<style>
.page-container {
  position: relative;
  min-height: 100vh;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
}
</script>
