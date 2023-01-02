import { Model, CString, CID, CForeign, CDateTime, CImage } from './items'
import Users from './Users'

const t = global.$t

class Course extends Model {
  route = '/course/course'
  methods = ['POST', 'GET', 'PUT']
  description = t('Courses')

  columns = [
    CID.new('name', '#'),
    CString.new('title', t('Title')),
    CString.new('description', t('Description')),
    CForeign.new('creator_id', t('Creator')).setForeign(Users).setRequestName('creator'),
    CForeign.new('moderator_id', t('Moderator')).setForeign(Users).setRequestName('moderator'),
    CDateTime.new('active_from', t('Active from')),
    CDateTime.new('active_to', t('Active to')),
    CDateTime.new('checked_at', t('Checked at')),
    CDateTime.new('deactivated_at', t('Deactivated at')),
    CImage.new('path_to_photo', t('Path to photo')),
  ]
}

export default Course
