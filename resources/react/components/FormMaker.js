// import { Model, Column } from '@r/models'
import React, { useEffect } from 'react'
import { Column } from '../models'
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
import { session } from '@r/service/axios'

class FormMaker extends React.Component {
  constructor(props) {
    super(props)
    this.model = new props.model()

    this.state = {
      model: this.model.getColumnsForState(),
      validation: this.model.getColumnsForValidation(),
      foreign: {},
    }

    this.handleForm = this.handleForm.bind(this)
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

  handleForm = (event) => {
    event.preventDefault()
    let axios
    if (!this.props.hasOwnProperty('axios')) {
      axios = session
    }

    axios
      .post(this.model.getRoute(), this.state.model)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
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

  generateField = (column) => {
    let col = null
    switch (column.format) {
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
      case Column.FORMAT_CHECKBOX:
        col = (
          <CFormSwitch
            key={column.name}
            id={column.name}
            type={column.format}
            defaultChecked={this.state.model[column.name]}
            required={column.required}
            disabled={column.disabled}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_RADIO:
        col = []
        column.options.forEach((row, i) => {
          col.push(
            <div key={i + 'opt'}>
              <CFormCheck
                type={column.format}
                name={column.name}
                label={row.label}
                value={row.value}
                defaultChecked={this.state.model[column.name]}
                disabled={column.disabled}
                onChange={this.handleInput}
                invalid={this.state.validation[column.name] !== ''}
              />
            </div>,
          )
        })
        break
      case Column.FORMAT_DATE:
        col = (
          <DatePicker
            key={column.name}
            id={column.name}
            className="form-control"
            required={column.required}
            disabled={column.disabled}
            selected={this.state.model[column.name]}
            onChange={(date) => {
              this.handleDate(date, column.name)
            }}
          />
        )
        break
      case Column.FORMAT_DATETIME:
        col = (
          <DatePicker
            key={column.name}
            id={column.name}
            className="form-control"
            required={column.required}
            disabled={column.disabled}
            selected={this.state.model[column.name]}
            showTimeSelect
            dateFormat="Pp"
            onChange={(date) => {
              this.handleDate(date, column.name)
            }}
          />
        )
        break
      case Column.FORMAT_NUMBER:
        col = (
          <CFormInput
            key={column.name}
            id={column.name}
            type={column.format}
            required={column.required}
            disabled={column.disabled}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_TEXT:
        col = (
          <CFormInput
            key={column.name}
            id={column.name}
            type={column.format}
            required={column.required}
            disabled={column.disabled}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_SELECT:
        col = (
          <CFormSelect
            id={column.name}
            key={column.name}
            options={column.options}
            value={this.state.model[column.name]}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_MULTISELECT:
        col = (
          <CFormSelect
            id={column.name}
            key={column.name}
            options={column.options}
            multiple
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_TEXTAREA:
        col = (
          <CFormTextarea
            id={column.name}
            key={column.name}
            rows={column.rows}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_PASSWORD:
        col = (
          <CFormInput
            key={column.name}
            id={column.name}
            type={column.format}
            required={column.required}
            disabled={column.disabled}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
        break
      case Column.FORMAT_FOREIGN:
        this.generateForeign(column)
        col = <CFormSelect id={column.name} key={column.name} options={this.state.foreign[column.name]} onChange={this.handleInput} />
        break
      default:
        col = (
          <CFormInput
            key={column.name}
            id={column.name}
            type={column.format}
            required={column.required}
            disabled={column.disabled}
            onChange={this.handleInput}
            invalid={this.state.validation[column.name] !== ''}
          />
        )
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

  render() {
    const t = global.$t
    let form = []

    this.model.getColumns().forEach((col, i) => {
      form.push(this.generateField(col))
    })

    return (
      <div>
        <CForm key="form1" className="row g-3 needs-validation" onSubmit={this.handleForm}>
          <p>
            <strong className="text-medium-emphasis">{this.model.getDescription()}</strong>
          </p>
          {form}
          <CRow>
            <CCol xs={4}>
              <CButtonGroup role="group" aria-label="Basic outlined example">
                <CButton color="success" variant="outline" type="submit">
                  {t('Save')}
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CForm>
      </div>
    )
  }
}

export default FormMaker
