import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import { store } from './features/store'
import { Provider } from 'react-redux'

import './common/normalize.scss'
import './common/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)

