<template>
  <topbarvue />
  <div class="ui text container">
    <h1 class="ui inverted header">Imagine-a-Company</h1>
    <h2>Do whatever you want when you want to.</h2>
    <div class="ui huge primary button">
      Get Started <i class="right arrow icon"></i>
    </div>
  </div>
</template>

<script>
import topbarvue from '@v/components/Welcome/TopBar.vue'
export default {
  name: 'Home',
  components: {
    topbarvue,
  },
  data() {
    return {
      //
    }
  },
}
</script>
