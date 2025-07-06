import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
import { Dashboard } from '../pages/Dashboard'
import { SendMoney } from '../pages/SendMoney'
import { Landing } from '../pages/Landing'
import { Update } from '../pages/Update'

function App() {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/send' element={<SendMoney/>}></Route>
            <Route path='/update' element={<Update/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
