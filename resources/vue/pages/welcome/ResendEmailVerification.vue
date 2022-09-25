<template>
  <div class="row justify-content-md-center">
    <div class="col-5 mb-3">
      <b-form @submit="onSubmit">
        <b-form-group
          :label="$t('login.email-or-phone.description')"
          label-for="input-phoneemail"
        >
          <b-form-input
            id="input-email"
            v-model="form.email_or_phone"
            :placeholder="$t('login.email-or-phone')"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">
          {{ $t('resend-password.resend') }}
        </b-button>
      </b-form>
    </div>
    <b-alert :variant="result.variant" v-show="result.message !== null" show>
      {{ result.message }}
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseEmailOrPhone } from '@v/config/utils'

export default {
  computed: {
    ...mapGetters('userinfo', ['hasVerifiedEmail']),
  },
  data() {
    return {
      form: {
        email_or_phone: null,
      },
      result: {
        variant: null,
        message: null,
      },
    }
  },
  beforeCreate() {
    if (1) {
      //
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      let form = parseEmailOrPhone(this.form.email_or_phone)
      this.$store
        .dispatch('auth/resendVerificationCode', form)
        .then((response) => {
          this.result.variant = 'success'
          this.result.message = this.$t('user-confirmation.success')
        })
        .catch((error) => {
          switch (error.response.status) {
            case 403:
              this.result.variant = 'warning'
              this.result.message = this.$t('403')
              break
            case 500:
              this.result.variant = 'danger'
              this.result.message = this.$t('server-error')
              break
            case 401:
              this.result.variant = 'warning'
              this.result.message = this.$t('user-confirmation.401')
              break
            case 400:
              this.result.variant = 'warning'
              this.result.message = this.$t('user-confirmation.401')
              break
            case 429:
              this.result.variant = 'warning'
              this.result.message = this.$t('429')
              break
          }
        })
    },
  },
}
</script>
