import withRouter from '@r/components/WithRouter'
import AbstractDetailForm from './abstract/DetailFormAbs'
import { CButton } from '@coreui/react'

class ObjectDetail extends AbstractDetailForm {
  constructor(props) {
    super(props)
    this.id = this.props.id

    if (props.hasOwnProperty('onUpload')) {
      this.onUploadCallback = props.onUpload
    }

    if (props.hasOwnProperty('onFailUpload')) {
      this.onUploadErrorCallback = props.onFailUpload
    }

    if (props.hasOwnProperty('onSubmit')) {
      this.onSubmitCallback = props.onSubmit
    }

    if (props.hasOwnProperty('onFailSubmit')) {
      this.onSubmitErrorCallback = props.onFailSubmit
    }
  }

  generateButtons = () => {
    return (
      <CButton color="warning" type="submit">
        {global.$t('Update')}
      </CButton>
    )
  }

  componentDidMount() {
    this.model
      .getDetailRecord(this.id)
      .then((response) => {
        let data = response.data.data
        this.model.applyValues(data)
        this.setState({ model: this.model.getColumnValues() })
      })
      .catch((error) => {
        //
      })
  }
}

export default withRouter(ObjectDetail)
