import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import RouteGuard from './guard'

// Containers
const DefaultLayout = React.lazy(() => import('@r/pages/cabinet/layout/DefaultLayout'))

// Pages
const Main = React.lazy(() => import('@r/pages/main/MainPage'))
const Login = React.lazy(() => import('@r/pages/main/Login'))
const Register = React.lazy(() => import('@r/pages/main/Register'))
const Page404 = React.lazy(() => import('@r/pages/Page404'))
const Page500 = React.lazy(() => import('@r/pages/Page500'))

const routes = [
  <Route exact path="/" name="Main" element={<Main />} />,
  <Route path="/cabinet/*" name="Cabinet" element={<DefaultLayout />} />,
  <Route exact path="/login" name="Login Page" element={<Login />} />,
  <Route exact path="/register" name="Register Page" element={<Register />} />,
  <Route exact path="/404" name="Page 404" element={<Page404 />} />,
  <Route exact path="/500" name="Page 500" element={<Page500 />} />,
  <Route path="*" element={<Navigate replace to="/404" />} />,
]

export default routes
