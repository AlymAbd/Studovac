import { Component } from 'react'
import TableGenerator from '../../../components/object_table/TableGenerator'
import { CoursePrices } from '@r/models'
import { CRow } from '@coreui/react'

class PricesComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CRow>
        <TableGenerator
          id={this.state.id}
          model={CoursePrices}
          onUpload={this.onUploadCallback}
          onFailUpload={this.onFailUploadCallback}
          onSubmit={this.onSubmitCallback}
          onFailSubmit={this.onFailSubmitCallback}
          routeToDetail="/#/cabinet/course/category"
          routeToCreate="/#/cabinet/course/category/create"
        />
      </CRow>
    )
  }
}

export default PricesComponent
