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

        <b-form-group
          :label="$t('login.password.description')"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            :placeholder="$t('login.password')"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">
          {{ $t('login.submit') }}
        </b-button>
      </b-form>
    </div>
    <b-alert :variant="result.variant" v-show="result.message !== null" show>
      {{ result.message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email_or_phone: null,
        password: null,
      },
      result: {
        variant: null,
        message: null,
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      let form = this.parseEmailOrPhone(this.form.email_or_phone)
      form.password = this.form.password
      this.clearState()

      this.$store
        .dispatch('auth/authorizeUser', form)
        .then((response) => {
          this.$router.go()
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.result.variant = 'danger'
            this.result.message = this.$t('login.failed')
          } else if (error.response.status === 200) {
            this.result.variant = 'warning'
            this.result.message = this.$t('login.email-confirm')
          }
        })
    },
    clearState() {
      this.result = {
        variant: null,
        message: null,
      }
    },
    parseEmailOrPhone(emailOrPhone) {
      let result = {
        email: null,
        phone: null,
      }
      let parsed = String(emailOrPhone)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      if (parsed === null) {
        result.phone = emailOrPhone
      } else {
        result.email = emailOrPhone
      }
      return result
    },
  },
}
</script>
