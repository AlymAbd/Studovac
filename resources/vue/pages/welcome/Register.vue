<template>
  <div>
    {{ $t('description') }}
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Email address:" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validations.email">
          {{ validations.email }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Phone number:" label-for="input-phone">
        <b-form-input
          id="input-phone"
          v-model="form.phone"
          type="number"
          placeholder="Phone"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validations.phone">
          {{ validations.phone }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Your Name:" label-for="input-title">
        <b-form-input
          id="input-title"
          v-model="form.title"
          placeholder="Enter name"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validations.title">
          {{ validations.title }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validations.password">
          {{ validations.password }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label="Password confirmation:"
        label-for="input-password-confirm"
      >
        <b-form-input
          id="input-password-confirm"
          v-model="form.password_confirmation"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validations.password_confirmation">
          {{ validations.password_confirmation }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="I want to be a teacher" label-for="input-checkbox">
        <b-form-checkbox
          id="input-checkbox"
          v-model="form.as_teacher"
        ></b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ validations }}</pre>
    </b-card>
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
        title: 'is required',
        phone: null,
        email: 'is required',
        password: 'is required',
        password_confirmation: 'is required',
        as_teacher: false,
      },
      show: true,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
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
