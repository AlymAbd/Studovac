class Model {
  getColumns = () => {
    return this.columns
  }

  getColumnsForState() {
    let columns = {}
    this.columns.forEach((row) => {
      columns[row.name] = String(columns.default || '')
    })
    return columns
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

  constructor(name) {
    this._name = name
    this.setFormat(Column.FORMAT_INPUT)
  }

  static new(name) {
    return new this(name)
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

  setRequired = (value = true) => {
    this._required = value
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

  setHidden = (value = true) => {
    this._hidden = value
    return this
  }

  setDisabled = (value = true) => {
    this._disabled = value
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
  constructor(name) {
    super(name)
    if (name == 'password') {
      this.setFormat(Column.FORMAT_PASSWORD)
    } else {
      this.setFormat(Column.FORMAT_TEXT)
    }
    this.setType(Column.TYPE_STRING)
  }
}

class CText extends Column {
  constructor(name) {
    super(name)

    this.setT
    this.setType(Column.TYPE_TEXT)
    this.setFormat(Column.FORMAT_TEXTAREA)
  }
}

class CNumber extends Column {
  constructor(name) {
    super(name)
    this.setType(Column.TYPE_INTEGER)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CFloat extends Column {
  constructor(name) {
    super(name)
    this.setType(Column.TYPE_FLOAT)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDecimal extends Column {
  _max = null
  _places = null

  constructor(name, max = 100, places = 2) {
    super(name)
    this._max = max
    this._places = places
    this.setType(Column.TYPE_DECIMAL)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDateTime extends Column {
  constructor(name) {
    super(name)
    this.setType(Column.TYPE_TEXT)
    this.setFormat(Column.FORMAT_TEXTAREA)
  }
}

class CDate extends Column {
  constructor(name) {
    super(name)
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
  constructor(name) {
    super(name)
    this.setType(Column.TYPE_BOOL)
    this.setFormat(Column.FORMAT_CHECKBOX)
  }
}

export { Model, Column, CBool, CDate, CDateTime, CFloat, CDecimal, CNumber, CText, CString }
