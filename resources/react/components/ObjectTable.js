import { CButton, CButtonToolbar, CRow, CCol, CTable, CButtonGroup } from '@coreui/react'
import { cilMinus, cilCheckAlt, cilArrowCircleBottom, cilArrowCircleTop, cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import { Column } from '../models/_model'
import Component from './abstract/Component'

const t = global.$t

class ObjectTable extends Component {
  constructor(props) {
    super(props)
    this.model = new props.model()
    this.title = this.getProp('modelTitle', this.model.title)
    this.description = this.getProp('modelDescription', this.model.description)
    this.getAllColumns = this.getProp('getAllColumns', false)
    this.routeToDetail = this.getProp('routeToDetail', '/')
    this.routeToCreate = this.getProp('routeToCreate', null)

    this.state = {
      _queryParams: '',
      _filters: {
        limit: 10,
        page: 1,
        other: '',
        previous: false,
        next: false,
        from: 1,
        last_page: 1,
        total: 0,
        displayed: 0,
      },
      sortBy: '',
      sortDest: '',
      sortIcon: '',
      pagination: [],
      initialized: false,
      columns: [],
      items: [],
    }
  }

  componentDidMount = () => {
    this.renderTable()
  }

  sortByColumn = (e) => {
    let colName = e.target.id.split('__')[1]
    let orderDest = 'asc'
    if (this.state.sortBy == colName) {
      switch (this.state.sortDest) {
        case 'desc':
          orderDest = null
          colName = null
          break
        case 'asc':
          orderDest = 'desc'
          break
        default:
          orderDest = 'asc'
          break
      }
    }

    this.setState({ sortBy: colName, sortDest: orderDest }, () => {
      this.renderTable()
    })
  }

  getOtherFilters = () => {
    return ''
  }

  modelRenderColumns = () => {
    return this.model.getColumns()
  }

  cellTemplate = (column, value) => {
    switch (column.format) {
      case Column.FORMAT_CHECKBOX:
        value = <CIcon icon={column.serialize(value) ? cilCheckAlt : cilMinus} size="xl" />
        break
      case Column.FORMAT_DATE:
        if (value) {
          value = column.toNormalDate(value)
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_DATETIME:
        if (value) {
          value = column.toNormalDate(value)
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_EMAIL:
        if (value) {
          value = <a href={'mailto:' + value}>{value}</a>
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_FILE:
        if (value) {
          value = <a href={value}>{value}</a>
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_ID:
        if (value) {
          value = (
            <a href={this.routeToDetail.replace(/\/$/, '') + '/' + value} target="blank">
              {value.slice(0, 5) + '...'}
            </a>
          )
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_FOREIGN:
        if (value) {
          value = <a href={value}>{value}</a>
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_IMAGE:
        if (value) {
          value = <a href={value}>{value}</a>
        } else {
          value = String(' ')
        }
        break
      case Column.FORMAT_JSON:
        // value = column.serialize(value)
        break
      case Column.FORMAT_NUMBER:
        // value = column.serialize(value)
        break
      case Column.FORMAT_PASSWORD:
        value = '**************'
        break
      case Column.FORMAT_RADIO:
      case Column.FORMAT_SELECT:
        value = column.getOption(value).label
        break
      case Column.FORMAT_MULTISELECT:
      case Column.FORMAT_ENUM:
        // value = column.serialize(value)
        break
      case Column.FORMAT_TEXTAREA:
      case Column.FORMAT_TEXT:
      default:
        if (value) {
          value = String(value)
        } else {
          value = String(' ')
        }
        break
    }
    return value
  }

  //table handling
  rowBodyTemplate = (row) => {
    Object.keys(row).forEach((col) => {
      const column = this.model.getColumn(col)
      row[col] = this.cellTemplate(column, row[col])
    })
    return row
  }

  rowHeaderTemplate = (row) => {
    let sortIcon = ''
    if (this.state.sortBy == row.name) {
      if (this.state.sortDest === 'asc') {
        sortIcon = <CIcon icon={cilArrowCircleBottom} />
      } else {
        sortIcon = <CIcon icon={cilArrowCircleTop} />
      }
    }
    let rawRow = {
      key: row.name,
      label: (
        <div>
          <CRow>
            <div id={'headercell__' + row.name} className="align-text-top" onClick={this.sortByColumn}>
              {row.title}
            </div>
          </CRow>
          <CRow>
            <span className="float-end me-1">{sortIcon}</span>
          </CRow>
        </div>
      ),
      _props: { scope: 'col', color: 'dark', style: { cursor: 'pointer' } },
    }
    return rawRow
  }

  prepareHeader = (data, modelColumns) => {
    if (!this.state.initialized) {
      let columns = []
      modelColumns.forEach((col) => {
        columns.push(this.rowHeaderTemplate(col))
      })
      this.setState({ columns: columns })
    }
  }

  prepareBody = (data) => {
    let rows = []
    data.forEach((row) => {
      rows.push(this.rowBodyTemplate(row))
    })
    this.setState({ items: rows })
  }

  requestTable = () => {
    return this.model.getAllRecords(
      this.state._filters.limit,
      this.state._filters.page,
      this.state.sortBy,
      this.state.sortDest,
      this.getOtherFilters(),
    )
  }

  renderTable = () => {
    this.requestTable()
      .then((response) => {
        this.prepareHeader(response.data, this.modelRenderColumns())
        this.prepareBody(response.data.data)
        this.preparePagination(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  //

  // pagination
  paginate = (e) => {
    let page = this.state._filters.page
    switch (e.target.value) {
      case 'prev':
        page--
        break
      case 'next':
        page++
        break
      default:
        page = e.target.value
        break
    }
    if (this.state._filters.page != page) {
      let filters = this.state._filters
      filters.page = page
      this.setState({ _filters: filters }, () => {
        this.renderTable()
      })
    }
  }

  preparePagination = (data) => {
    this.state._filters.next = data.next_page_url !== null
    this.state._filters.previous = data.prev_page_url !== null
    this.state._filters.page = data.current_page
    this.state._filters.from = data.from
    this.state._filters.last_page = data.last_page
    this.state._filters.total = data.total
    this.state._filters.displayed = data.to
    this.setState({ _filters: this.state._filters })

    this.state.pagination = []
    for (let ind = 0; ind < (this.state._filters.last_page > 10 ? 10 : this.state._filters.last_page); ind++) {
      this.state.pagination.push(
        <CButton value={ind + 1} key={'pagination_' + ind} onClick={this.paginate} disabled={ind + 1 == this.state._filters.page}>
          {ind + 1}
        </CButton>,
      )
    }
    this.setState({ pagination: this.state.pagination })
  }
  //

  render() {
    return (
      <CCol>
        <CRow className="mb-1">
          <CCol xs={1}>
            <CButton href={this.routeToCreate} style={{ display: this.routeToCreate ? '' : 'none' }}>
              {t('Create')}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <div className="table-responsive-lg">
            <CTable hover bordered columns={this.state.columns} items={this.state.items}>
              <caption>
                {t('Displayed records') + ': ' + this.state._filters.displayed}
                <div></div>
                {t('From') + ': ' + this.state._filters.total}
              </caption>
            </CTable>
          </div>
        </CRow>
        <CRow className="mb-2">
          <CCol>
            <CRow>
              <CButtonToolbar role="group" aria-label="Toolbar with button groups">
                <CButtonGroup className="me-2" role="group" aria-label="First group">
                  <CButton color="info" disabled={this.state._filters.previous === false} onClick={this.paginate} value="prev">
                    {t('Prev')}
                  </CButton>
                  <CButton color="info" disabled={this.state._filters.next === false} onClick={this.paginate} value="next">
                    {t('Next')}
                  </CButton>
                </CButtonGroup>
                <CButtonGroup className="me-2" role="group" aria-label="Second group">
                  <CButtonGroup>{this.state.pagination}</CButtonGroup>
                </CButtonGroup>
              </CButtonToolbar>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    )
  }
}

export default ObjectTable
