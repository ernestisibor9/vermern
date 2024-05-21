import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element= {<Home/> }/>
        <Route path = 'register' element= {<Register/> }/> 
        <Route path = 'login' element= {<Login/> }/> 
      </Routes>
      <ToastContainer theme='colored'/>
    </div>
  )
}

export default App
