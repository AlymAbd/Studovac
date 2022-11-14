import withRouter from '@r/components/WithRouter'
import AbstractDetailForm from './abstract/DetailFormAbs'
import { CButton } from '@coreui/react'
import { Column } from '../models/_model'

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
    if (this.props.id) {
      return (
        <CButton color="warning" type="submit">
          {global.$t('Update')}
        </CButton>
      )
    } else {
      return (
        <CButton color="success" type="submit">
          {global.$t('Create')}
        </CButton>
      )
    }
  }

  componentDidMount = () => {
    let relations = []
    this.model.getColumns().map((col) => {
      if (col.format == Column.FORMAT_FOREIGN) {
        if (col.requestName) {
          relations.push(col.requestName)
        }
      }
    })
    if (this.id) {
      this.model
        .getDetailRecord(this.id, relations)
        .then((response) => {
          let data = response.data.data
          this.model.applyValues(data)
          this.setState({ model: this.model.getColumnValues() })
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      this.prepareForm()
    }
  }
}

export default withRouter(ObjectDetail)
