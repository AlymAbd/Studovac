import { Model, CString, CID, CForeign, CDateTime } from './items'

const t = global.$t

class Course extends Model {
  route = '/course'
  methods = ['POST', 'GET', 'PUT']
  description = t('Courses')

  columns = [
    CID.new('name', '#'),
    CString.new()
  ]
}

export default Course
