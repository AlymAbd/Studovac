import Component from '../../../components/abstract/Component'
import { Course } from '@r/models'
import ObjectDetail from '@r/components/ObjectDetail'
import { CRow, CCol } from '@coreui/react'
import withRouter from '@r/components/WithRouter'

class CategoryDetailComponent extends Component {
  constructor(props) {
    super(props)
    let id = null
    if (props.params.hasOwnProperty('id')) {
      id = props.params.id
    }
    this.state = {
      id: id,
    }
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
          <ObjectDetail
            id={this.state.id}
            model={Course}
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

export default withRouter(CategoryDetailComponent)
