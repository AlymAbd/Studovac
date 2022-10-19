import React from 'react'
import { Route, Navigate } from 'react-router-dom'

// System pages
const Page404 = React.lazy(() => import('@r/pages/Page404'))
const Page500 = React.lazy(() => import('@r/pages/Page500'))

// Pages
const DefaultLayout = React.lazy(() => import('@r/pages/cabinet/layout/DefaultLayout'))
const Main = React.lazy(() => import('@r/pages/main/MainPage'))
const Login = React.lazy(() => import('@r/pages/main/Login'))
const Register = React.lazy(() => import('@r/pages/main/Register'))
const ForgotPassword = React.lazy(() => import('@r/pages/main/ForgotPassword'))

const routes = [
  <Route exact path="/" name="Home" element={<Main />} key="rHome" />,
  <Route path="/cabinet/*" name="Cabinet" element={<DefaultLayout />} key="rCabinet" />,
  <Route exact path="/404" name="404" element={<Page404 />} key="r404" />,
  <Route exact path="/500" name="500" element={<Page500 />} key="r500" />,

  <Route exact path="/login" name="Login Page" element={<Login />} key="rLogin" />,
  <Route exact path="/register" name="Register Page" element={<Register />} key="rRegister" />,
  <Route exact path="/forgot_password" name="Forgot Password" element={<ForgotPassword />} key="rForgotPass" />,

  <Route path="*" element={<Navigate replace to="/404" />} key="rredirect404" />,
]

export default routes
