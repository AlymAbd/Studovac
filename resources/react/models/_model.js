import { session } from '@r/service/axios'

class Model {
  route = null
  methods = null
  description = null
  size = 4
  columns = []

  getColumns = () => {
    return this.columns.filter((row) => {
      return !row.hidden
    })
  }

  getColumnsForState = (columns = null) => {
    let cols = {}
    columns = columns ? columns : this.columns
    columns.forEach((row) => {
      if (!row.hidden) {
        let value
        switch (row.format) {
          case Column.FORMAT_CHECKBOX:
            value = Boolean(row.default ? row.default : false)
            break
          default:
            value = String(row.default ? row.default : '')
            break
        }
        cols[row.name] = value
      }
      if (row instanceof CJSON) {
        cols = { ...cols, ...row.getScheme() }
      }
    })
    return cols
  }

  getColumnsForValidation = (columns) => {
    let cols = {}
    columns = columns ? columns : this.columns
    columns.forEach((row) => {
      if (!row.hidden) {
        cols[row.name] = ''
      }
      if (row instanceof CJSON) {
        cols = { ...cols, ...row.getSchemeValidation() }
      }
    })
    return cols
  }

  getRoute(param = null) {
    let url = this.route
    if (param) {
      url = url + '/detail/' + param
    }
    return url
  }

  getMethods() {
    return this.methods
  }

  getDescription() {
    return this.description
  }

  handleData(modelState) {
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

  constructor(name, title = null) {
    this._name = name
    this._title = title ? title : name.charAt(0).toUpperCase() + name.slice(1)
    this.setFormat(Column.FORMAT_INPUT)
  }

  static new(name, title = null) {
    return new this(name, title)
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
    this._default = value
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

  asHidden = () => {
    this._hidden = true
    return this
  }

  asDisabled = () => {
    this._disabled = true
    return this
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
}

class CString extends Column {
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

class CText extends Column {
  _rows = 5

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
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_INTEGER)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CFloat extends Column {
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_FLOAT)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDecimal extends Column {
  _max = null
  _places = null

  constructor(name, title = null, max = 100, places = 2) {
    super(name, title)
    this._max = max
    this._places = places
    this.setType(Column.TYPE_DECIMAL)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDateTime extends Column {
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
  }
}

class CDate extends Column {
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATE)
    this.setFormat(Column.FORMAT_DATE)
  }

  withTime = () => {
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
    return this
  }
}

class CBool extends Column {
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_BOOL)
    this.setFormat(Column.FORMAT_CHECKBOX)
  }
}

class CEnum extends Column {
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
    return model.getColumnsForState(this._scheme)
  }

  getSchemeValidation = () => {
    let model = new Model()
    return model.getColumnsForValidation(this._scheme)
  }

  get requestName() {
    return this._requestName
  }

  get scheme() {
    return this._scheme
  }
}

class CFile extends Column {
  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_STRING)
    this.setFormat(Column.FORMAT_FILE)
  }
}

export { Model, Column, CFile, CBool, CDate, CDateTime, CFloat, CDecimal, CNumber, CText, CString, CEnum, CForeign, CJSON }
