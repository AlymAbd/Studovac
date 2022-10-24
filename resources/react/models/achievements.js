import { Model, CString } from './_model'

class Achievements extends Model {
  route = '/achievments'
  methods = ['POST', 'GET', 'PUT', 'DELETE']

  columns = [
    CString.new('name').setHidden(),
    CString.new('title').setRequired(),
    CString.new('description').setMaxlength(512),
    CString.new('type').setOptions([
      { label: 'Student', value: 'student' },
      { label: 'Teacher', value: 'teacher' },
    ]),
  ]
}

export default new Achievements()
