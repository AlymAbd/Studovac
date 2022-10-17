<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ this.$t('Categories') }}</strong>
        </CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell v-for="head in headers" scope="col">{{
                  head
                }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colspan="2">Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { session } from '@v/api/axios'

export default {
  data() {
    return {
      grid: [
        'title',
        'description',
        'icon',
        'parent_id',
        'created_at',
        'updated_at',
      ],
      model: {
        fields: {
          title: {
            title: this.$t('Title'),
          },
          description: {
            title: this.$t('Description'),
            type: this.$model.TYPE_TEXT,
          },
          icon: {
            title: this.$t('Icon'),
            format: this.$model.FORMAT_SELECT,
            source: [],
          },
          parent_id: {
            title: this.$t('Parent category'),
            format: this.$model.FORMAT_FOREIGN,
            source: 'course/category',
          },
          created_at: {
            title: this.$t('Created at'),
            type: this.$model.TYPE_DATETIME,
            hidden: true,
          },
          updated_at: {
            title: this.$t('Updated at'),
            type: this.$model.TYPE_DATETIME,
            hidden: true,
          },
        },
        url: '/v1/course/category',
      },
    }
  },
  methods: {
    fillGrid() {
      session.get(this.model.url).then((response) => {
        this.grid = response.data
      })
    },
  },
  computed: {
    headers() {
      let head = []
      this.grid.forEach((header) => {
        head.push({
          header: header,
          title: this.model.fields[header].title,
        })
      })
      return head
    },
  },
}
</script>
