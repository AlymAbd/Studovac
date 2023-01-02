import { Model, CString, CID, CForeign, CDateTime, CFloat, CDecimal } from './items'
import Course from './Course'
class CoursePrices extends Model {
  route = '/course/price'
  methods = ['POST', 'GET', 'PUT']
  description = 'Course prices'

  columns = [
    CID.new('name', '#'),
    CString.new('title', t('Title')),
    CForeign.new('course_id', t('Course')).setForeign(Course).setRequestName('course'),
    CString.new('currency', t('Currency')).setOptions([]),
    CDecimal.new('price', t('Price'), 9999999, 2),
    CDecimal.new('margin_percent', t('Margin'), 3, 2).setDefault(20),
    CDateTime.new('valid_from', t('Valid from')),
    CDateTime.new('valid_to', t('Valid to')),
  ]
}

export default CoursePrices
