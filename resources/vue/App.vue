<template>
  <div class="page-container">
    <router-view />
  </div>
</template>

<script>
import EventBus from '@v/plugins/EventBus'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
  mounted() {
    EventBus.on('logout', () => {
      this.logOut()
    })
  },
  beforeUnmount() {
    EventBus.remove('logout')
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
