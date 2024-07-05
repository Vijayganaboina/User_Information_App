import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import DataPage from './components/DataPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Form />}/>
        <Route path='/data' element={<DataPage />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
