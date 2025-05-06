import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from '../src/pages/SignUp';
import Dashboard from '../src/pages/Dashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';
// import '@ant-design/v5-patch-for-react-19';

const App = () => {
  return (
    
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/Dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  )
}

export default App;

