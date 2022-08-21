<template>
  <h1>Login</h1>
</template>

<script>
export default {
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      password: null,
      password_confirmation: null,
      is_agree: false,
      validation: {},
    }
  },
  methods: {
    async login() {
      console.log(this.email)
    },
  },
}
</script>
