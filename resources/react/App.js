import React, { Component, Suspense } from 'react'
import { HashRouter, Routes } from 'react-router-dom'
import './scss/style.scss'
import routes from './routes'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>{routes}</Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
