<template>
  <b-alert variant="success" show v-if="!isVerified && isAuthenticated">
    {{ this.$t('user-confirmation.annoying') }}
    <router-link :to="{ name: 'Verify Email Resend' }">
      <b>{{ this.$t('link') }}</b>
    </router-link>
  </b-alert>
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
}
</script>
