import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Main } from './layout'
import AuthService from '@r/service/auth'
import { parseEmailOrPhone } from '@r/service/utils'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      phone: '',
      password: '',
      message_type: 'primary',
      message_text: '',
    }
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleInput = (e) => {
    let data = {}
    if (e.target.id == 'emailorphone') {
      data = parseEmailOrPhone(e.target.value)
    } else {
      data[e.target.id] = e.target.value
    }
    this.setState(data)
  }

  handleAuth = (event) => {
    event.preventDefault()
    AuthService.login(this.state)
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        this.setState({ message_type: 'danger' })
        if (error.response && error.response.status !== 500) {
          this.setState({ message_text: error.response.data.error })
        } else {
          this.setState({ message_text: 'Server Error' })
          console.log(error)
        }
      })
  }

  render() {
    const t = global.$t
    return (
      <Main>
        <div className="bg-light d-flex flex-row align-items-center">
          <CContainer>
            <CAlert color={this.state.message_type} visible={this.state.message_text !== ''}>
              {this.state.message_text}
            </CAlert>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.handleAuth}>
                        <h1>{t('Login')}</h1>
                        <p className="text-medium-emphasis">{t('Sign In to your account')}</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput onChange={this.handleInput} id="emailorphone" placeholder={t('Email or phone')} required />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            onChange={this.handleInput}
                            id="password"
                            type="password"
                            placeholder={t('Password')}
                            autoComplete="current-password"
                            required
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              {t('Login')}
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <Link to="/reset_password">
                              <CButton color="link" className="px-0">
                                {t('Forgot password?')}
                              </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>{t('Sign up')}</h2>
                        <p>{t("If you don't have any account you can create new in a moment")}</p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>
                            {t('Register')}
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </Main>
    )
  }
}

export default Login
