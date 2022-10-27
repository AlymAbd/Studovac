import UserSettings from '@r/models/user_settings'
import ObjectDetail from '@r/components/ObjectDetail'
import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'
import withRouter from '@r/components/WithRouter'

class UserSettingsComponent extends Component {
  constructor(props) {
    super(props)

    let { id } = props.params
    this.state = {
      id: id,
    }
  }

  render() {
    return (
      <CRow>
        <CCol xs={6}>
          <ObjectDetail id={this.state.id} model={UserSettings}></ObjectDetail>
        </CCol>
      </CRow>
    )
  }
}

export default withRouter(UserSettingsComponent)
