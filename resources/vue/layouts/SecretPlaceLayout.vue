<template>
  <div>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <Header />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
    </div>
  </div>
  <ToasterMessage :message="systemErrorMessage" color="danger" header="error" />
</template>

<script>
import { CContainer } from '@coreui/vue'
import Header from '@/components/Home/Header.vue'
import ToasterMessage from '@/components/App/ToasterMessage.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SecretPlaceLayout',
  components: {
    Header,
    CContainer,
    ToasterMessage,
  },
  computed: {
    ...mapGetters('axiosMessages', ['systemErrorMessage']),
  },
}
</script>
