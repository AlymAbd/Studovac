// import { Model, Column } from '@r/models'
import React, { Component } from 'react'
import { Model, Column } from '../../../models'
import { CFormCheck, CFormInput, CFormSelect, CFormTextarea, CForm } from '@coreui/react'

class FormMaker extends Component {
  constructor(props) {
    super(props)
    this.model = props.model

    this.state = this.model.getColumnsForState()
  }

  generateField = (column) => {
    let col = null
    switch (column.format) {
      case Column.FORMAT_CHECKBOX:
        col = (
          <CFormCheck
            key={column.name}
            type="checkbox"
            label={column.title}
            defaultChecked={column.default}
            required={column.required}
            disabled={column.disabled}
          />
        )
        break
      case Column.FORMAT_RADIO:
        col = []
        column.options.forEach((row, i) => {
          col.push(
            <CFormCheck type={column.format} label={row.label} defaultChecked={column.default || false} key={i + 'opt'} disabled={column.disabled} />,
          )
        })
        break
      case Column.FORMAT_DATE:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      case Column.FORMAT_DATETIME:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      case Column.FORMAT_NUMBER:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      case Column.FORMAT_TEXT:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      case Column.FORMAT_RADIO:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      case Column.FORMAT_SELECT:
        col = <CFormSelect key={column.name} floatingLabel={column.title} options={column.options} />
        break
      case Column.FORMAT_MULTISELECT:
        col = <CFormSelect key={column.name} floatingLabel={column.title} options={column.options} multiple />
        break
      case Column.FORMAT_TEXTAREA:
        col = <CFormTextarea key={column.name} floatingLabel={column.title} rows="3" />
        break
      case Column.FORMAT_PASSWORD:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
      default:
        col = <CFormInput key={column.name} type={column.format} floatingLabel={column.title} required={column.required} disabled={column.disabled} />
        break
    }
    return col
  }

  render() {
    let form = []
    this.model.getColumns().forEach((col) => {
      console.log(col)
      form.push(this.generateField(col))
    })
    return <CForm key="form1">{form}</CForm>
  }
}

export default FormMaker
