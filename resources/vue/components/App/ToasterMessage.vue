<template>
  <CToaster placement="top-end">
    <CToast
      :color="color"
      v-for="(msg, i) in message"
      :key="i"
      class="text-white align-items-center"
    >
      <div class="d-flex">
        <CToastBody> {{ i }}: {{ msg }} </CToastBody>
        <CToastClose class="me-2 m-auto" white />
      </div>
    </CToast>
  </CToaster>
</template>

<script>
export default {
  props: {
    message: [Object, Array],
    header: String,
    color: {
      default: 'danger',
    },
  },
}
</script>
