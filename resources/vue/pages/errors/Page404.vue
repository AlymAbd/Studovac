<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">{{ $t('page-not-found') }}</h4>
            <p class="text-medium-emphasis float-start">
              {{ $t('page-not-found.description') }}
            </p>
          </div>
        </CCol>
      </CRow>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <a href="/">Home</a>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  setup() {
    return {}
  },
}
</script>
