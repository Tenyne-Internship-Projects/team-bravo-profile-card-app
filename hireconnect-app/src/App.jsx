import React from 'react';
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Signin from './pages/Signin';
import Emailverify from './pages/Emailverify';
import Resetpswd from './pages/Resetpswd';
import SignUp from './pages/SignUp';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ConfirmReset from './pages/ConfirmReset';
import Profilecard from './pages/Profilecard';
import EditProfile from './pages/EditProfile';
//import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (

    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/verify-email' element={< Emailverify/>} />
        <Route path='/reset-password' element={< Resetpswd />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/confirm-reset' element={<ConfirmReset />} />
        <Route path='/profile' element={<Profilecard />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}

        
      </Routes>
    </>
  )
}

export default App