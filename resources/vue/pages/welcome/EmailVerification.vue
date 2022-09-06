<template>
  <div>{{ token }}</div>
  <div>{{ hasVerifiedEmail }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['token'],
  computed: {
    ...mapGetters('userinfo', ['hasVerifiedEmail']),
  },
  beforeCreate() {
    if (1) {
      //
    }
  },
}
</script>
