import { session } from '@r/service/axios'

class Model {
  route = null
  description = ''
  columns = []

  getColumns = (getAll = false) => {
    if (getAll) {
      return this.columns
    } else {
      return this.columns.filter((row) => {
        return !row.hidden
      })
    }
  }

  getColumn = (name, fromAll = true) => {
    const colum = this.getColumns(fromAll).filter((row) => {
      return row.name == name
    })
    return colum === undefined ? null : colum[0]
  }

  getColumnValues = (columns = null, validation = false) => {
    let cols = {}
    columns = columns ? columns : this.getColumns()
    columns.forEach((row) => {
      cols[row.name] = validation ? '' : row.getValueOrDefault()
      if (row instanceof CJSON) {
        if (validation) {
          cols = { ...cols, ...row.getSchemeValidation(validation) }
        } else {
          cols = { ...cols, ...row.getSchemeValues() }
        }
        delete cols[row.name]
      }
    })
    return cols
  }

  getColumnState = (columns) => {
    let cols = {}
    columns = columns ? columns : this.columns
    columns.forEach((row) => {
      if (!row.hidden) {
        cols[row.name] = row
      }
      if (row instanceof CJSON) {
        cols = { ...cols, ...row.getScheme() }
      }
    })
    return cols
  }

  getRoute = (param = null) => {
    let url = this.route
    if (param) {
      url = url + '/detail/' + param
    }
    return url
  }

  handleData = (modelState) => {
    let data = {}

    Object.keys(modelState).forEach((column) => {
      if (column.includes('__')) {
        let jsonKey = column.split('__')[0]

        if (!data.hasOwnProperty(jsonKey) || !(data[jsonKey] instanceof Object)) {
          data[jsonKey] = {}
        }

        data[jsonKey][column.split('__')[1]] = modelState[column]
      } else {
        data[column] = modelState[column]
      }
    })
    return data
  }

  // API Handlers block
  prepareColumns = (data) => {
    Object.keys(data).forEach((row) => {
      if (data[row] !== null && typeof data[row] === 'object') {
        Object.keys(data[row]).forEach((subRow) => {
          data[row + '__' + subRow] = data[row][subRow]
        })
        delete data[row]
      }
    })
    return data
  }

  applyValues = (data) => {
    this.prepareColumns(data)
    this.getColumns(true).forEach((column) => {
      switch (column.format) {
        case Column.FORMAT_FOREIGN:
          column.setValue(data[column.name + '__name'])
          break
        case Column.FORMAT_JSON:
          column.scheme.forEach((jsonCol) => {
            jsonCol.setValue(data[jsonCol.name] !== undefined || data[jsonCol.name] !== null ? data[jsonCol.name] : jsonCol.default)
          })
          break
        default:
          column.setValue(data[column.name])
          break
      }
    })
  }

  getAllRecords = (limit = 10, page = 1, orderBy = null, orderDest = 'asc', otherFilters = null) => {
    let filters = ['limit=' + limit, 'page=' + page]
    if (orderBy) {
      filters = filters.concat(filters, ['order_by=' + orderBy, 'order_dest=' + orderDest])
    }
    if (otherFilters) {
      filters.concat(filters, otherFilters)
    }

    return new Promise((resolve, reject) => {
      session
        .get(this.getRoute() + '/?' + filters.join('&'))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getDetailRecord = (id, relations = null) => {
    let route = this.getRoute(id)
    if (relations) {
      if (Array.isArray(relations)) {
        relations.forEach((rel) => {
          route = route + '/?with[]=' + rel
        })
      } else {
        route = route + '/?with=' + relations
      }
    }
    return new Promise((resolve, reject) => {
      session
        .get(route)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  createRecord = (data) => {
    return new Promise((resolve, reject) => {
      session
        .post(this.getRoute(), data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updateRecord = (data, id) => {
    return new Promise((resolve, reject) => {
      session
        .put(this.getRoute(id), data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  uploadFile = (formData, id) => {
    return new Promise((resolve, reject) => {
      session
        .post(this.getRoute(id), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ContentType: 'multipart/form-data',
          },
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
      session
        .delete(this.getRoute(id))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get title() {
    return ''
  }

  get description() {
    return this.description
  }

  get methods() {
    return this.methods
  }
}

class Column {
  static TYPE_STRING = 'string'
  static TYPE_TEXT = 'text'
  static TYPE_DATE = 'date'
  static TYPE_DATETIME = 'datetime'
  static TYPE_BOOL = 'bool'
  static TYPE_INTEGER = 'int'
  static TYPE_DECIMAL = 'decimal'
  static TYPE_FLOAT = 'float'
  static TYPE_ARRAY = 'array'
  static TYPE_OBJECTARRAY = 'objectarray'

  static FORMAT_NUMBER = 'number'
  static FORMAT_TEXT = 'text'
  static FORMAT_SELECT = 'select'
  static FORMAT_DATE = 'date'
  static FORMAT_DATETIME = 'datetime'
  static FORMAT_MULTISELECT = 'multiselect'
  static FORMAT_CHECKBOX = 'checkbox'
  static FORMAT_RADIO = 'radio'
  static FORMAT_TEXTAREA = 'textarea'
  static FORMAT_PASSWORD = 'password'
  static FORMAT_EMAIL = 'email'
  static FORMAT_FILE = 'file'
  static FORMAT_FOREIGN = 'foreign'
  static FORMAT_ENUM = 'enum'
  static FORMAT_JSON = 'json'
  static FORMAT_IMAGE = 'image'
  static FORMAT_ID = 'cid'

  _name = null
  _format = null
  _type = null
  _options = []
  _required = false
  _hidden = false
  _default = null
  _title = null
  _maxLength = -1
  _disabled = false
  _value = null
  _settedValues = false
  _canSort = false
  _canFilter = false

  constructor(name, title = null) {
    this._name = name
    this._title = title ? title : name.charAt(0).toUpperCase() + name.slice(1)
    this.setFormat(Column.FORMAT_INPUT)
  }

  static new(name, title = null) {
    return new this(name, title)
  }

  serialize = (value) => {
    return value ? String(value) : ''
  }

  getValueOrDefault = () => {
    return this.value !== null ? this.value : this.default
  }

  getOption = (value = null, label = null) => {
    let option = this.options.filter((row) => {
      if (label) {
        return row.label === label
      } else {
        return row.value === value
      }
    })
    return option.length > 0 ? option[0] : {}
  }

  setValue = (value) => {
    this._value = this.serialize(value)
    this._settedValues = true
    return this
  }

  setFormat = (value) => {
    this._format = value
    return this
  }

  setType = (value) => {
    this._type = value
    return this
  }

  setTitle = (value) => {
    this._title = value
    return this
  }

  setMaxlength = (length) => {
    this._maxLength = length
    return this
  }

  setOptions = (options) => {
    this._options = options
    return this
  }

  setName = (value) => {
    this._name = value
    return this
  }

  setDefault = (value) => {
    this._default = this.serialize(value)
    return this
  }

  asRequired = () => {
    this._required = true
    return this
  }

  asSelect = () => {
    this.setFormat(Column.FORMAT_SELECT)
    return this
  }

  asMultipleSelect = () => {
    this.setFormat(Column.FORMAT_MULTISELECT)
    return this
  }

  asRadio = () => {
    this.setFormat(Column.FORMAT_RADIO)
    return this
  }

  asPassword = () => {
    this.setFormat(Column.FORMAT_PASSWORD)
    return this
  }

  asEmail = () => {
    this.setFormat(Column.FORMAT_EMAIL)
    return this
  }

  asHidden = (value = true) => {
    this._hidden = value
    return this
  }

  asDisabled = () => {
    this._disabled = true
    return this
  }

  asFilterable = () => {
    this._canFilter = true
    return this
  }

  asSortable = () => {
    this._canSort = true
    return this
  }

  getOption = (value = null, label = null) => {
    value = value ? value : this.value
    return this.options.filter((row) => {
      if (label) {
        return row.label === label
      } else {
        return row.value === value
      }
    })
  }

  get name() {
    return this._name
  }

  get format() {
    return this._format
  }

  get maxLength() {
    return this._maxLength
  }

  get options() {
    return this._options
  }

  get required() {
    return this._required
  }

  get type() {
    return this._type
  }

  get hidden() {
    return this._hidden
  }

  get default() {
    return this._default
  }

  get title() {
    return this._title
  }

  get disabled() {
    return this._disabled
  }

  get value() {
    return this._value || this.default
  }

  get sortable() {
    return this._canSort
  }

  get filterable() {
    return this._canFilter
  }
}

class CString extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    if (name == 'password') {
      this.setFormat(Column.FORMAT_PASSWORD)
    } else {
      this.setFormat(Column.FORMAT_TEXT)
    }
    this.setType(Column.TYPE_STRING)
    this.setMaxlength(255)
  }
}

class CID extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setFormat(Column.FORMAT_ID)
    this.setType(Column.TYPE_STRING)
    this.asDisabled()
  }
}

class CText extends Column {
  _rows = 5
  _default = ''

  constructor(name, title = null, rows = 5) {
    super(name, title)
    this.rows = rows
    this.setType(Column.TYPE_TEXT)
    this.setFormat(Column.FORMAT_TEXTAREA)
  }

  set rows(value) {
    this._rows = value
  }

  get rows() {
    return this._rows
  }
}

class CNumber extends Column {
  _default = 0

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_INTEGER)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CFloat extends Column {
  _default = 0

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_FLOAT)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDecimal extends Column {
  _max = null
  _places = null
  _default = 0

  constructor(name, title = null, max = 100, places = 2) {
    super(name, title)
    this._max = max
    this._places = places
    this.setType(Column.TYPE_DECIMAL)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDateTime extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
  }

  serialize = (value) => {
    return new Date(value)
  }

  toNormalDate = (value) => {
    const date = this.serialize(value)
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    const datet = [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('.')
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    return datet + ' ' + time
  }
}

class CDate extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATE)
    this.setFormat(Column.FORMAT_DATE)
  }

  serialize = (value) => {
    return new Date(value)
  }

  withTime = () => {
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
    return this
  }

  toNormalDate = (value) => {
    const date = this.serialize(value)
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('.')
  }
}

class CBool extends Column {
  _default = false

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_BOOL)
    this.setFormat(Column.FORMAT_CHECKBOX)
  }

  serialize = (value) => {
    return Boolean(value)
  }
}

class CEnum extends Column {
  _default = []

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_ARRAY)
    this.setFormat(Column.FORMAT_ENUM)
  }
}

class CForeign extends Column {
  _requestName = null
  _foreign = null
  _where = null
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_OBJECTARRAY)
    this.setFormat(Column.FORMAT_FOREIGN)
  }

  setForeign = (value) => {
    this._foreign = value
    return this
  }

  setRequestName = (value) => {
    this._requestName = value
    return this
  }

  setFilter = (value) => {
    this._where = value
    return this
  }

  requestOptions = () => {
    let fmodel = new this.foreign()
    return new Promise((resolve, reject) => {
      session
        .get(fmodel.getRoute())
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get foreign() {
    return this._foreign
  }

  get filter() {
    return this._where
  }

  get requestName() {
    return this._requestName
  }
}

class CJSON extends Column {
  _scheme = {}
  _default = {}

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_OBJECTARRAY)
    this.setFormat(Column.FORMAT_JSON)
  }

  setScheme = (value) => {
    this._scheme = value.map((row) => {
      return row.setName(this.name + '__' + row.name)
    })
    return this
  }

  getScheme = () => {
    let model = new Model()
    return model.getColumnState(this._scheme)
  }

  getSchemeValues = () => {
    let model = new Model()
    return model.getColumnValues(this._scheme)
  }

  getSchemeValidation = (validation) => {
    let model = new Model()
    return model.getColumnValues(this._scheme, validation)
  }

  get requestName() {
    return this._requestName
  }

  get scheme() {
    return this._scheme
  }
}

class CFile extends Column {
  _default = ''
  _filetype = '*'
  _multiple = false
  _maxSize = 1024
  _files = []

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_STRING)
    this.setFormat(Column.FORMAT_FILE)
  }

  asMultiple = () => {
    this._multiple = true
    return this
  }

  text = () => {
    this._filetype = '.txt'
    return this
  }

  excel = () => {
    this._filetype = '.xlsx,.xls'
    return this
  }

  csv = () => {
    this._filetype = '.csv'
    return this
  }

  addFile = (filename) => {
    this._files.push(filename)
  }

  serialize = (value) => {
    return String(value)
  }

  /**
   * @param {number} value
   */
  set maxSize(value) {
    this._maxSize = value
  }

  get accepts() {
    return this._filetype
  }
}

class CImage extends CFile {
  _filetype = 'image/*'

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_STRING)
    this.setFormat(Column.FORMAT_IMAGE)
  }
}

export { Model, Column, CID, CFile, CBool, CDate, CDateTime, CFloat, CDecimal, CNumber, CText, CString, CEnum, CForeign, CJSON, CImage }
