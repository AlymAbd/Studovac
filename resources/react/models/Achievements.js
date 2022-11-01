import { Model, CString, CText, CBool, CDate, CDateTime, CDecimal, CFloat, CNumber } from './_model'

class Achievements extends Model {
  route = '/achievements'
  methods = ['POST', 'GET', 'PUT', 'DELETE']
  description = 'Achievements for students or teachers'

  columns = [
    CString.new('name').asHidden(),
    CString.new('title', 'Title'),
    CString.new('description', 'Description'),
    CString.new('type').setOptions([
      { label: 'Student', value: 'student' },
      { label: 'Teacher', value: 'teacher' },
    ]),
  ]
}

export default Achievements
