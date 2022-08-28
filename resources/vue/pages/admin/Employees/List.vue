<template>
  <CRow>
    <CTable bordered>
      <CTableCaption>List of users</CTableCaption>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Активен</CTableHeaderCell>
          <CTableHeaderCell scope="col">Сотрудник</CTableHeaderCell>
          <CTableHeaderCell scope="col">Админ</CTableHeaderCell>
          <CTableHeaderCell scope="col">Последняя активность</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(row, i) in employees" :key="i">
          <CTableDataCell value="{{ row['id'] }}">{{
            row['id']
          }}</CTableDataCell>
          <CTableDataCell>{{
            row['first_name'] + ' ' + row['last_name']
          }}</CTableDataCell>
          <CTableDataCell>{{ row['email'] }}</CTableDataCell>
          <CTableDataCell>
            <CIcon icon="cil-check-circle" v-if="row.is_active"></CIcon>
          </CTableDataCell>
          <CTableDataCell>
            <CIcon icon="cil-check-circle" v-if="row.is_staff"></CIcon>
          </CTableDataCell>
          <CTableDataCell>
            <CIcon icon="cil-check-circle" v-if="row.is_superuser"></CIcon>
          </CTableDataCell>
          <CTableDataCell>{{
            row['last_login']
              ? new Date(row['last_login']).toLocaleString()
              : ''
          }}</CTableDataCell>
          <CTableDataCell
            class="d-grid gap-1 d-md-flex justify-content-md-start"
          >
            <CButton color="warning" v-c-tooltip="'Редактировать'">
              <CIcon icon="cil-pencil"></CIcon>
            </CButton>
            <CButton color="primary" variant="outline" v-c-tooltip="'Активный'">
              <CIcon icon="cil-x"></CIcon>
            </CButton>
            <CButton
              color="primary"
              variant="outline"
              v-c-tooltip="'Сотрудник'"
            >
              <CIcon icon="cil-mood-bad"></CIcon>
            </CButton>
            <CButton
              color="primary"
              variant="outline"
              v-c-tooltip="'Суперадмин'"
            >
              <CIcon icon="cil-baby"></CIcon>
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </CRow>
  <CRow>
    <CCol xs="3">
      <div class="d-grid gap-1 d-md-flex">
        <CButton color="info">
          <CIcon icon="cil-arrow-thick-left"></CIcon>
        </CButton>
        <CButton color="info">
          <CIcon icon="cil-arrow-thick-right"></CIcon>
        </CButton>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import { session } from '@/api/axios'

export default {
  data() {
    return {
      page: 0,
      employees: [],
    }
  },
  created: function () {
    this.fetchTable()
  },
  methods: {
    fetchTable() {
      session
        .get('/accounts/')
        .then((response) => {
          this.employees = response.data.results.sort((a, b) => {
            return a.id > b.id
          })
        })
        .catch((error) => {
          this.employees = []
          console.log(error)
        })
    },
    swapStaffStatus(row) {
      row
    },
    swapActiveStatus(row) {
      row
    },
    swapSuperAdminStatus(row) {
      row
    },
  },
}
</script>
