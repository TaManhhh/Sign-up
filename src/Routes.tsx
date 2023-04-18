import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Login';
import Home from './modules/Pages/Home';
import SignUp from './modules/auth/signup/SignUp';
const Routess = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default Routess
