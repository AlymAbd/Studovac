<template>
  <b-alert variant="success" show v-if="isVerified">
    {{ this.$t('user-confirmation.annoying') }}
    <router-link :to="{ name: 'verify-email-resend' }">
      <b>{{ this.$t('link') }}</b>
    </router-link>
  </b-alert>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import BasicComponent from '@v/components/welcome/BasicComponent.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isVerified']),
  },
  components: {
    BasicComponent,
  },
  data() {
    return {
      //
    }
  },
}
</script>
