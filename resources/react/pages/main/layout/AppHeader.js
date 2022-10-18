import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavLink, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList } from '@coreui/icons'
import { useTranslation } from 'react-i18next'

const AppHeader = () => {
  const { t } = useTranslation()
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon="/public/images/logo.png" height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              {t('Home')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/login" component={NavLink}>
              {t('Login')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/register" component={NavLink}>
              {t('Register')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/login" component={NavLink}>
              {t('Password reset')}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3"></CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
