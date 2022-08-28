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
import AppFooter from '@/components/App/AppFooter.vue'
import AppHeader from '@/components/App/AppHeader.vue'
import AppSidebar from '@/components/App/AppSidebar.vue'
import ToasterMessage from '@/components/App/ToasterMessage.vue'
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
