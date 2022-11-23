import { Component } from 'react'
import { CourseCategories } from '@r/models'
import { CRow } from '@coreui/react'
import TableGenerator from '../../../components/object_table/TableGenerator'
import CIcon from '@coreui/icons-react'

class NewTableGenerator extends TableGenerator {
  templateText = (column, value) => {
    if (column.name === 'icon') {
      const cicon = column.options.find((row) => {
        return row.value === value
      }).icon
      if (cicon) {
        return <CIcon size="xl" icon={cicon} />
      }
    }
    return value
  }
}

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
        <NewTableGenerator
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
