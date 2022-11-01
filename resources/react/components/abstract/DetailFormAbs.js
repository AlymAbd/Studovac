import Component from './Component'
import { Column } from '../../models'
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
import DatePicker from 'react-datepicker'

const t = global.$t

class AbstractDetailForm extends Component {
  constructor(props) {
    super(props)
    this.model = new props.model()
    this.title = this.getProp('modelTitle', this.model.title)
    this.description = this.getProp('modelDescription', this.model.description)

    this.state = {
      model: this.model.getColumnValues(),
      validation: this.model.getColumnValues(null, true),
      foreign: {},
    }

    this.submitForm = this.submitForm.bind(this)
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
    console.log(value)
    data.model[e.target.id ? e.target.id : e.target.name] = value
    this.setState(data)
  }

  handleDate = (date, model) => {
    let data = this.state
    data.model[model] = date.getTime()
    this.setState(data)
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

  submitForm = (event) => {
    event.preventDefault()
  }

  onSubmitCallback = (response) => {
    console.log(response)
  }

  onSubmitErrorCallback = (response) => {
    console.log(response)
  }

  generateForeign = (column) => {
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
  }

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

  generateField = (column) => {
    let col = null
    let options = {
      id: column.name,
      key: column.name,
      type: column.format,
      onChange: this.handleInput,
      invalid: this.state.validation[column.name] !== '',
    }

    if (column.required) {
      options['required'] = true
    }

    if (column.disabled) {
      options['disabled'] = true
    }

    switch (column.format) {
      //JSON
      case Column.FORMAT_JSON:
        col = []
        column.scheme.forEach((sch) => {
          col.push(this.generateField(sch))
        })
        col = (
          <CCard>
            <CCardHeader>{column.title}</CCardHeader>
            <CCardBody>{col}</CCardBody>
          </CCard>
        )
        break
      //-JSON
      case Column.FORMAT_CHECKBOX:
        if (this.state.model[column.name]) {
          options['defaultChecked'] = true
        }
        col = <CFormSwitch {...options} />
        break
      case Column.FORMAT_RADIO:
        col = []
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
        break
      case Column.FORMAT_DATE:
        options['className'] = 'form-control'
        options['selected'] = this.state.model[column.name]
        options['onChange'] = (date) => {
          this.handleDate(date, column.name)
        }
        col = <DatePicker {...options} />
        break
      case Column.FORMAT_DATETIME:
        options['className'] = 'form-control'
        options['selected'] = this.state.model[column.name]
        options['onChange'] = (date) => {
          this.handleDate(date, column.name)
        }
        col = <DatePicker showTimeSelect dateFormat="Pp" {...options} />
        break
      case Column.FORMAT_NUMBER:
        col = <CFormInput value={this.state.model[column.name]} {...options} />
        break
      case Column.FORMAT_TEXT:
        col = <CFormInput value={this.state.model[column.name]} {...options} />
        break
      case Column.FORMAT_SELECT:
        col = <CFormSelect options={column.options} value={this.state.model[column.name]} {...options} />
        break
      case Column.FORMAT_MULTISELECT:
        col = <CFormSelect options={column.options} value={this.state.model[column.name]} multiple {...options} />
        break
      case Column.FORMAT_TEXTAREA:
        col = <CFormTextarea rows={column.rows} value={this.state.model[column.name]} {...options} />
        break
      case Column.FORMAT_PASSWORD:
        col = <CFormInput value={this.state.model[column.name]} {...options} />
        break
      case Column.FORMAT_FOREIGN:
        this.generateForeign(column)

        col = <CFormSelect value={this.state.model[column.name]} options={this.state.foreign[column.name]} {...options} />
        break
      default:
        col = <CFormInput value={this.state.model[column.name]} {...options} />
        break
    }

    if (column.format == Column.FORMAT_JSON) {
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

  render() {
    let form = []

    this.model.getColumns().forEach((col, i) => {
      form.push(this.generateField(col))
    })

    return (
      <div>
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
