import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Login';
import Home from './modules/Pages/Home';
import SignUp from './modules/auth/signup/SignUp';
import Tablee from './modules/Pages/table/Table';
import Profile from './modules/Pages/profile/Profile';
const Routess = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='table' element={<Tablee/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default Routess
