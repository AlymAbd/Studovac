import { Component } from 'react'
import TableGenerator from '../../../components/object_table/TableGenerator'
import { Course } from '@r/models'
import { CRow } from '@coreui/react'

class CourseComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CRow>
        <TableGenerator
          model={Course}
          onUpload={this.onUploadCallback}
          onFailUpload={this.onFailUploadCallback}
          onSubmit={this.onSubmitCallback}
          onFailSubmit={this.onFailSubmitCallback}
          routeToDetail="/#/cabinet/course"
          routeToCreate="/#/cabinet/course/create"
        />
      </CRow>
    )
  }
}

export default CourseComponent
