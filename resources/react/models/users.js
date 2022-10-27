import { Model, CString, CFile, CBool, CDate, CEnum, CForeign, CDateTime, CDecimal, CFloat, CNumber, CJSON } from './_model'

class Users extends Model {
  route = '/system/user'
  methods = ['POST', 'GET', 'PUT']
  description = 'Setup your settings'

  columns = [
    CString.new('name', 'Unique name').asHidden(),
    CString.new('title', 'Title').asRequired(),
    CString.new('email', 'Email').asEmail(),
    CString.new('phone', 'Phone'),
    CDateTime.new('email_verified_at', 'Email verification'),
    CDateTime.new('phone_verified_at', 'Phone verification'),
    CBool.new('account_verified', 'Account verified'),
    CString.new('password', 'Password').asPassword(),
    CString.new('access_type', 'Access type').setOptions([
      { label: 'Guest', value: 'guest' },
      { label: 'Teacher', value: 'teacher' },
    ]),
    CFile.new('path_to_photo', 'Path to photo'),
    CDateTime.new('created_at', 'Created'),
    CDateTime.new('updated_at', 'Updated'),
  ]
}

export default Users
