import User from '@r/models/Users'
import ObjectTable from '@r/components/ObjectTable'
import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'

class UserSettingsComponent extends Component {
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
        <CCol xs={6}>
          <ObjectTable
            id={this.state.id}
            model={User}
            onUpload={this.onUploadCallback}
            onFailUpload={this.onFailUploadCallback}
            onSubmit={this.onSubmitCallback}
            onFailSubmit={this.onFailSubmitCallback}
          />
        </CCol>
      </CRow>
    )
  }
}

export default UserSettingsComponent
