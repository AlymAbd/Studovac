<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
      <ToasterMessage
        :message="systemErrorMessage"
        color="danger"
        header="error"
      />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@v/components/App/AppFooter.vue'
import AppHeader from '@v/components/App/AppHeader.vue'
import AppSidebar from '@v/components/App/AppSidebar.vue'
import ToasterMessage from '@v/components/App/ToasterMessage.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AdminPageLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
    ToasterMessage,
  },
  computed: {
    ...mapGetters('axiosMessages', ['systemErrorMessage']),
  },
}
</script>
