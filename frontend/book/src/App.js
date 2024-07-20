import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/AddProduct'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import EditProduct from './pages/EditProduct'
import AddProductPage from './pages/AddProductPage'
import Student from './pages/Student'
import Teacher from './pages/Teacher'
import Admin from './pages/Admin'


function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element= {<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        <Route path = 'register' element= {<PublicRoutes><Register/></PublicRoutes> }/> 
        <Route path = 'login' element= {<PublicRoutes><Login/> </PublicRoutes>}/> 
        <Route path = 'forgot-password' element= {<ForgotPassword/> }/> 
        <Route path = 'reset-password/:id/:token' element= {<ResetPassword/> }/> 
        <Route path = 'add-product' element= {<AddProduct/> }/> 
        <Route path = 'add-product-page' element= {<AddProductPage/> }/> 
        <Route path = 'edit/:id' element= {<EditProduct/> }/> 
        <Route path = 'student' element= {<Student/> }/> 
        <Route path = 'teacher' element= {<Teacher/> }/> 
        <Route path = 'admin' element= {<Admin/> }/> 
      </Routes>
      <ToastContainer theme='colored'/>
    </div>
  )
}

// Function to protect the route from unauthorized users
export function ProtectedRoutes({children}) {
  const user = localStorage.getItem('user');
  if(user !== "" && user){
    return children
  }
  else{
    return <Navigate to = '/login'/>
  }
}


// Public routes - when a user already login, he or she shouldn't have access to te login or egiser pages again

export function PublicRoutes({children}) {
  const user = localStorage.getItem('user');
  if(user !== "" && user){
    return <Navigate to = '/'/>
  }
  else{
    return children
  }
}



export default App
