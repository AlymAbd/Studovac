<template>
  <div class="row justify-content-md-center">
    <div class="col-5">
      <b-form @submit="onSubmit">
        <b-form-group
          :label="$t('register.email.description')"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            :placeholder="$t('register.email')"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validations.email">
            {{ validations.email }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="$t('register.phone.description')"
          label-for="input-phone"
        >
          <b-form-input
            id="input-phone"
            v-model="form.phone"
            type="number"
            :placeholder="$t('register.phone')"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validations.phone">
            {{ validations.phone }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="$t('register.title.description')"
          label-for="input-title"
        >
          <b-form-input
            id="input-title"
            v-model="form.title"
            :placeholder="$t('register.title')"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validations.title">
            {{ validations.title }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="$t('register.password.description')"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            :placeholder="$t('register.password')"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validations.password">
            {{ validations.password }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="$t('register.password-confirmation.description')"
          label-for="input-password-confirm"
        >
          <b-form-input
            id="input-password-confirm"
            v-model="form.password_confirmation"
            type="password"
            :placeholder="$t('register.password-confirmation')"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validations.password_confirmation">
            {{ validations.password_confirmation }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="$t('register.im-teacher')"
          label-for="input-checkbox"
        >
          <b-form-checkbox
            id="input-checkbox"
            v-model="form.as_teacher"
          ></b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary">
          <b-spinner small type="grow" v-if="show"></b-spinner>
          {{ show ? $('wait') : $t('register.submit') }}
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null,
        as_teacher: false,
      },
      validations: {
        title: this.$t('register.is-required'),
        phone: null,
        email: this.$t('register.is-required'),
        password: this.$t('register.is-required'),
        password_confirmation: this.$t('register.is-required'),
        as_teacher: false,
      },
      show: false,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.show = true
      this.$store
        .dispatch('auth/createUser', this.form)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          if (error.response.status) {
            let errors = error.response.data
            Object.keys(errors).forEach((err) => {
              let messages = ''
              errors[err].map((row) => {
                console.log(row)
                messages += this.capitalize(row) + '. '
              })
              this.validations[err] = messages
            })
          }
        })
      this.inProcessing = false
    },
    capitalize(s) {
      return s && s[0].toUpperCase() + s.slice(1)
    },
    // onReset(event) {
    //   event.preventDefault()
    //   // Reset our form values
    //   this.form.
    //   this.form.email = null
    //   this.form.title = null
    //   this.form.password = null
    //   this.form.password_confirmation = null
    //   this.form.checked = []
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false
    //   this.$nextTick(() => {
    //     this.show = true
    //   })
    // },
  },
}
</script>
