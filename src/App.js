import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
// import pages and component
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import React from 'react';

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Sidebar/>
            <div className="container">
              <Navbar />
              <Routes>
                <Route exact="true" path='/' element={ <Dashboard />}/> 
                <Route path='/create' element={ <Create />}/>
                <Route path='/login' element={ <Login />}/>
                <Route path='/project' element={ <Project />}/>
                <Route path='/signup' element={ <Signup />}/>    
              </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
