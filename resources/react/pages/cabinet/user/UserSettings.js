import UserSettings from '@r/models/UserSettings'
import ObjectDetail from '@r/components/ObjectDetail'
import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'
import withRouter from '@r/components/WithRouter'
import AuthService from '@r/service/auth'

const auth = AuthService.updateUserInfo

class UserSettingsComponent extends Component {
  constructor(props) {
    super(props)

    let { id } = props.params
    this.state = {
      id: id,
    }
  }

  onSubmitCallback = (response) => {
    response = response.data
    auth('night_mode', response['settings__dark_mode'])
    auth('photo', response['path_to_photo'])
    global.$cookie.set('lang', response['settings__lang'])
    window.location.reload()
  }

  onFailSubmitCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    auth('photo', response.data.data[0])
  }

  onFailUploadCallback = (response) => {
    //
  }

  render() {
    return (
      <CRow>
        <CCol xs={6}>
          <ObjectDetail
            id={this.state.id}
            model={UserSettings}
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

export default withRouter(UserSettingsComponent)
