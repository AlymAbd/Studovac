import { Model, CString, CDate, CDateTime, CJSON, CBool, CForeign, CImage } from './_model'

const t = global.$t

class UserSettings extends Model {
  route = '/system/user-setting'
  methods = ['POST', 'GET', 'PUT']
  description = t('Setup your settings')
  title = t('User settings')

  columns = [
    CString.new('name', 'ID').asDisabled(),
    CImage.new('path_to_photo', 'Photo'),
    CJSON.new('settings', t('Settings')).setScheme([
      CString.new('lang', t('Language'))
        .setOptions([
          { value: 'cz', label: 'Čeština' },
          { value: 'en', label: 'English' },
          { value: 'ru', label: 'Русский' },
        ])
        .asSelect()
        .setDefault(global.$cookie.get('lang')),
      CBool.new('dark_mode', t('Night mode')),
      CString.new('location', t('Location')).asDisabled(),
      CBool.new('email_notifications', t('Email notification')),
      CBool.new('telegram_notifications', t('Telegram notification')),
      ,
      CString.new('telegram_id', t('Telegram ID')).asDisabled(),
    ]),
    CDateTime.new('created_at', t('Created')).asDisabled().setDefault(new Date()),
    CDateTime.new('updated_at', t('Updated')).asDisabled().setDefault(new Date()),
  ]
}

export default UserSettings
