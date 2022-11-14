import { Component } from 'react'
import { CourseCategories } from '@r/models'
import ObjectTable from '@r/components/ObjectTable'
import { CRow } from '@coreui/react'

class CategoriesComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  onSubmitCallback = (response) => {
    //
  }

  onFailSubmitCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    //
  }

  onFailUploadCallback = (response) => {
    //
  }

  render() {
    return (
      <CRow>
        <ObjectTable
          id={this.state.id}
          model={CourseCategories}
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

export default CategoriesComponent
