import './App.css'
import Sidebar from './AdminSide/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './LandingPage'
import AdminRoute from './Routes/AdminRoute'
import UserRoute from './Routes/UserRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setupAxiosInterceptors } from './services/intercepor'

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=> {
    setupAxiosInterceptors(dispatch)
  },[dispatch])

  return (
    <>
      <BrowserRouter>

        <div className="app">
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route  path='admin/*' element={<AdminRoute/>} />
              <Route path='user/*' element={<UserRoute/>}/>

            </Routes>
          </main>
        </div>
      </BrowserRouter>



    </>
  )
}

export default App
