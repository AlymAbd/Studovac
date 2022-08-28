<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Что-то пошло не так :(</h4>
            <p class="text-medium-emphasis float-start">
              Страница не была найдена или уже не активна
            </p>
          </div>
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
