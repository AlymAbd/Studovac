import withRouter from '@r/components/WithRouter'
import AbstractDetailForm from './abstract/DetailFormAbs'
import {
  CFormCheck,
  CButton,
  CCol,
  CRow,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CForm,
  CFormSwitch,
  CFormLabel,
  CCard,
  CCardBody,
  CButtonGroup,
  CCardHeader,
  CFormFeedback,
} from '@coreui/react'

class ObjectDetail extends AbstractDetailForm {
  constructor(props) {
    super(props)
    this.id = this.props.id
  }

  submitForm = (event) => {
    event.preventDefault()
    const data = this.getValuesForRequest()
    console.log(data)
    this.model
      .updateRecord(data, this.id)
      .then((response) => {
        this.onSubmitCallback(response)
        console.log(response)
      })
      .catch((error) => {
        this.onSubmitErrorCallback(error)
      })
  }

  generateButtons = () => {
    return (
      <CButton color="danger" variant="outline" type="submit">
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
        console.log(error)
      })
  }
}

export default withRouter(ObjectDetail)
