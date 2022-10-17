<template>
  <div>
    <CTable borderless small>
      <CTableBody>
        <CTableRow v-for="(row, index) in userInformation" :key="index">
          <CTableHeaderCell scope="row">{{
            handleString(index)
          }}</CTableHeaderCell>
          <CTableDataCell>{{ row }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters('auth', ['userInformation']),
  },
  methods: {
    handleString(str) {
      const arr = str.replace('_', ' ').split(' ')

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      }
      return arr.join(' ')
    },
    updateUserInfo() {
      // this.$store.dispatch('auth/fillUserInfo')
    },
  },
  beforeMount() {
    this.updateUserInfo()
  },
}
</script>
