import React from 'react'
import { AppFooter, AppHeader } from './layout'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <h1>home</h1>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
