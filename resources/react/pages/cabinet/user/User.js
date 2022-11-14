import User from '@r/models/Users'
import ObjectTable from '@r/components/ObjectTable'
import { Component } from 'react'
import { CRow } from '@coreui/react'

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
        <ObjectTable
          id={this.state.id}
          model={User}
          onUpload={this.onUploadCallback}
          onFailUpload={this.onFailUploadCallback}
          onSubmit={this.onSubmitCallback}
          onFailSubmit={this.onFailSubmitCallback}
          routeToDetail="/#/cabinet/users/"
        />
      </CRow>
    )
  }
}

export default UserSettingsComponent
