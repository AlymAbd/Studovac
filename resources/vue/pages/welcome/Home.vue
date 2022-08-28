<template>
  <h1>Home</h1>
  {{ isAuthenticated }}
</template>

<script>
import BasicComponent from '@v/components/welcome/BasicComponent.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
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
