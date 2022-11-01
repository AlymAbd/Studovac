import Component from './Component'
import { Column } from '@r/models'
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
  CImage,
} from '@coreui/react'
import DatePicker from 'react-datepicker'

const t = global.$t

class AbstractColumnGenerators extends Component {
  getForeign = (column) => {
    let cols = column.getOptions()
    let data = null
    cols.then((response) => {
      data = response.data.data.map((row) => {
        return { label: row.title, value: row.unique_value }
      })
    })
    return { cols, data }
  }

  // fields
  generateForeign = (column, options) => {
    if (!this.state.foreign.hasOwnProperty(column.name)) {
      column.requestOptions().then((response) => {
        let data = this.state
        data.foreign[column.name] = []
        response.data.data.forEach((row) => {
          data.foreign[column.name].push({
            label: row.title,
            value: row.unique_title,
          })
        })
        this.setState(data)
      })
    }
    return <CFormSelect value={this.state.model[column.name]} options={this.state.foreign[column.name]} {...options} />
  }

  generateNumber = (column, options) => {
    return this.generateInput(column, options)
  }

  generateText = (column, options) => {
    return this.generateInput(column, options)
  }

  generateSelect = (column, options) => {
    return <CFormSelect options={column.options} value={this.state.model[column.name]} {...options} />
  }

  generateDate = (column, options) => {
    options['className'] = 'form-control'
    options['selected'] = this.state.model[column.name]
    options['onChange'] = (date) => {
      this.handleDate(date, column.name)
    }
    return <DatePicker {...options} />
  }

  generateDatetime = (column, options) => {
    options['showTimeSelect'] = true
    options['dateFormat'] = 'Pp'
    return this.generateDate(column, options)
  }

  generateMultiselect = (column, options) => {
    return <CFormSelect options={column.options} value={this.state.model[column.name]} multiple {...options} />
  }

  generateCheckbox = (column, options) => {
    if (this.state.model[column.name]) {
      options['defaultChecked'] = true
    }
    options['onClick'] = this.handleInput
    delete options['onChange']
    return <CFormSwitch {...options} />
  }

  generateRadio = (column, options) => {
    let col = []
    column.options.forEach((row, i) => {
      let radioOptions = {}
      radioOptions['label'] = row.label
      radioOptions['value'] = row.value

      if (this.state.model[column.name] === row.value) {
        radioOptions['defaultChecked'] = true
      } else {
        radioOptions['defaultChecked'] = false
      }

      if (row.hasOwnProperty('disabled')) {
        radioOptions['disabled'] = true
      }

      col.push(
        <div key={i + 'opt'}>
          <CFormCheck {...options} {...radioOptions} />
        </div>,
      )
    })
    return col
  }

  generateTextarea = (column, options) => {
    return <CFormTextarea rows={column.rows} value={this.state.model[column.name]} {...options} />
  }

  generateInput = (column, options) => {
    return <CFormInput {...options} />
  }

  generateJson = (column, options) => {
    let col = []
    column.scheme.forEach((sch) => {
      col.push(this.generateField(sch))
    })
    col = (
      <CCard>
        <CCardHeader>{column.title}</CCardHeader>
        <CCardBody>{col}</CCardBody>
      </CCard>
    )
    return col
  }

  generateFile = (column, options) => {
    options['accept'] = column.accepts
    options['onChange'] = this.handleFile
    return this.generateInput(column, options)
  }

  generateImage = (column, options) => {
    let col = null
    options['type'] = 'file'
    col = this.generateFile(column, options)
    col = (
      <CCard>
        <CCardHeader>{column.title}</CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol xs={10}>{col}</CCol>
            <CCol xs={2}>
              <CButton onClick={this.uploadFile}>{t('Upload')}</CButton>
            </CCol>
          </CRow>
          <CRow style={{ hidden: this.state.model[column.name] === '' }}>
            <CCol xs={3}>
              <CImage rounded id={'image_' + column.name} src={this.state.preview[column.name]} alt={t('No preview')} width={350} height={350} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
    return col
  }

  generateField = (column) => {
    let col = null
    let options = {
      id: column.name,
      key: column.name,
      type: column.format,
      onChange: this.handleInput,
      invalid: this.state.validation[column.name] !== '',
      value: this.state.model[column.name],
    }

    if (column.required) {
      options['required'] = true
    }

    if (column.disabled) {
      options['disabled'] = true
    }

    switch (column.format) {
      case Column.FORMAT_JSON:
        col = this.generateJson(column, options)
        break
      case Column.FORMAT_CHECKBOX:
        col = this.generateCheckbox(column, options)
        break
      case Column.FORMAT_RADIO:
        col = this.generateRadio(column, options)
        break
      case Column.FORMAT_DATE:
        col = this.generateDate(column, options)
        break
      case Column.FORMAT_DATETIME:
        col = this.generateDatetime(column, options)
        break
      case Column.FORMAT_NUMBER:
        col = this.generateNumber(column, options)
        break
      case Column.FORMAT_TEXT:
        col = this.generateText(column, options)
        break
      case Column.FORMAT_SELECT:
        col = this.generateSelect(column, options)
        break
      case Column.FORMAT_MULTISELECT:
        col = this.generateMultiselect(column, options)
        break
      case Column.FORMAT_TEXTAREA:
        col = this.generateTextarea(column, options)
        break
      case Column.FORMAT_FOREIGN:
        col = this.generateForeign(column, options)
        break
      case Column.FORMAT_FILE:
        delete options['value']
        col = this.generateFile(column, options)
        break
      case Column.FORMAT_IMAGE:
        delete options['value']
        col = this.generateImage(column, options)
        break
      default:
        col = this.generateInput(column, options)
        break
    }

    if ([Column.FORMAT_JSON, Column.FORMAT_IMAGE].includes(column.format)) {
      return (
        <div key={'input' + column.name} className="mb-3">
          {col}
        </div>
      )
    } else {
      return (
        <div key={'input' + column.name} className="mb-4">
          <CFormLabel htmlFor={column.name}>{column.title}</CFormLabel>
          {col}
          <CFormFeedback invalid>{this.state.validation[column.name]}</CFormFeedback>
        </div>
      )
    }
  }
  ///fields
}

class AbstractDetailForm extends AbstractColumnGenerators {
  constructor(props) {
    super(props)
    this.model = new props.model()
    this.title = this.getProp('modelTitle', this.model.title)
    this.description = this.getProp('modelDescription', this.model.description)

    this.state = {
      model: this.model.getColumnValues(),
      validation: this.model.getColumnValues(null, true),
      foreign: {},
      preview: {},
      files: {},
    }

    this.submitForm = this.submitForm.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  // abstract method for generate bar in the top form
  genereateTopBar = () => {
    return <div></div>
  }

  // abstract method for generate bar in the bottom form
  genereateBottomBar = () => {
    return <div></div>
  }

  // button generation
  generateButtons = () => {
    return (
      <CButton color="success" variant="outline" type="submit">
        {t('Save')}
      </CButton>
    )
  }

  handleInput = (e) => {
    let data = this.state
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = !data.model[e.target.id ? e.target.id : e.target.name]
    }
    data.model[e.target.id ? e.target.id : e.target.name] = value
    this.setState(data)
  }

  handleDate = (date, model) => {
    let data = this.state
    data.model[model] = date.getTime()
    this.setState(data)
  }

  handleFile = (e) => {
    this.handleInput(e)
    const fileList = e.target.files
    Object.keys(fileList).forEach((ind) => {
      if (fileList[ind]) {
        let reader = new FileReader()
        reader.onload = function (ev) {
          let images = this.state.preview
          images[e.target.id] = ev.target.result
          this.setState({ preview: images })
        }.bind(this)
        reader.readAsDataURL(fileList[ind])
        let files = this.state.files
        files[e.target.id] = fileList
        this.setState({ files: files })
      }
    })
  }

  uploadFile = (event) => {
    event.preventDefault()

    let formData = new FormData()
    Object.keys(this.state.files).forEach((fileType) => {
      Object.keys(this.state.files[fileType]).forEach((fileName) => {
        formData.append(fileType, this.state.files[fileType][fileName])
      })
    })
    this.model
      .uploadFile(formData, this.id)
      .then((response) => {
        this.onUploadCallback(response)
      })
      .catch((error) => {
        this.onUploadErrorCallback(error)
      })
  }

  submitForm = (event) => {
    event.preventDefault()
    this.model
      .updateRecord(this.getValuesForRequest(), this.id)
      .then((response) => {
        let data = response.data
        this.model.applyValues(data)
        this.setState({ model: this.model.getColumnValues() })
        this.onSubmitCallback(response)
      })
      .catch((error) => {
        this.onSubmitErrorCallback(error)
      })
  }

  onSubmitCallback = (response) => {
    //
  }

  onSubmitErrorCallback = (response) => {
    //
  }

  onUploadCallback = (response) => {
    //
  }

  onUploadErrorCallback = (response) => {
    //
  }

  getValuesForRequest = () => {
    let formData = {}
    Object.keys(this.state.model).forEach((record) => {
      if (record.includes('__')) {
        let [parent, child] = record.split('__')
        if (!formData.hasOwnProperty(parent)) {
          formData[parent] = {}
        }
        formData[parent][child] = this.state.model[record]
      } else {
        formData[record] = this.state.model[record]
      }
    })
    return formData
  }

  render() {
    let form = []

    this.model.getColumns().forEach((col, i) => {
      form.push(this.generateField(col))
    })

    return (
      <div className="mb-4">
        {this.genereateTopBar()}
        <CForm key="form1" className="row g-3 needs-validation" onSubmit={this.submitForm}>
          <h5>{this.title}</h5>
          <p>
            <strong className="text-medium-emphasis">{this.description}</strong>
          </p>
          {form}
          <CRow>
            <CCol xs={4}>
              <CButtonGroup role="group" aria-label="Basic outlined example">
                {this.generateButtons()}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CForm>
        {this.genereateBottomBar()}
      </div>
    )
  }
}

export default AbstractDetailForm
