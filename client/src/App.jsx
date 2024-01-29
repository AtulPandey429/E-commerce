import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/PagenotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminPrivateRoute from './components/admin/AdminPrivateRoute';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
 

  return (
    <>
  
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          </Route>
          <Route path="/dashboard" element={<AdminPrivateRoute />} >
          <Route path="admin" element={<AdminDashboard/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<PagenotFound />} />
      </Routes>
    

  
    </>
  )
}

export default App
