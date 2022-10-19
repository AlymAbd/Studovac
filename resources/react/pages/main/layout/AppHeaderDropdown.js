import React from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilUser, cilUserPlus, cilAccountLogout, cilHouse } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar from '@r/assets/images/avatars/default.png'
import { useTranslation } from 'react-i18next'

let isAuthorized = true

const generateLink = (url) => {
  if (url && ![url.slice(1, 2), url.slice(0, 1)].includes('#')) {
    url = '/#/' + url
  }
  return url || '/#'
}

const DropDownItems = () => {
  const { t } = useTranslation()
  if (isAuthorized) {
    return [
      <CDropdownItem href={generateLink('cabinet')} key="cabinet">
        <CIcon icon={cilHouse} className="me-2" />
        {t('Cabinet')}
      </CDropdownItem>,
      <CDropdownItem href={generateLink('logout')} key="logout">
        <CIcon icon={cilAccountLogout} className="me-2" />
        {t('Logout')}
      </CDropdownItem>,
    ]
  } else {
    return [
      <CDropdownItem href={generateLink('login')} key="login">
        <CIcon icon={cilUser} className="me-2" />
        {t('Login')}
      </CDropdownItem>,
      <CDropdownItem href={generateLink('register')} key="register">
        <CIcon icon={cilUserPlus} className="me-2" />
        {t('Register')}
      </CDropdownItem>,
    ]
  }
}

const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{t('Account')}</CDropdownHeader>
        {<DropDownItems />}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
