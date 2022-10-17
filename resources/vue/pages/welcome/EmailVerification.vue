<template>
  <div class="row justify-content-md-center">
    <div class="col-6 mb-3">
      <b-form @submit="onSubmit">
        <b-form-group :label="$t('vtoken')" label-for="input-vtoken">
          <b-form-input
            id="input-token"
            v-model="vtoken"
            :placeholder="$t('vtoken')"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">
          {{ $t('link') }}
        </b-button>
      </b-form>
    </div>
    <div class="col-7 mb-3">
      <b-alert :variant="result.variant" v-show="result.message !== null" show>
        {{ result.message }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['token'],
  computed: {
    ...mapGetters('userinfo', ['hasVerifiedEmail']),
  },
  data() {
    return {
      vtoken: this.token,
      result: {
        variant: 'primary',
        message: this.$t('user-confirmation.click'),
      },
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/verifyEmailToken', this.token)
        .then((response) => {
          this.$store.commit('userinfo/setAccountVerified')
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          this.result.message = this.$t('user-confirmation.confirm-failed')
          this.result.variant = 'danger'
        })
    },
  },
}
</script>
