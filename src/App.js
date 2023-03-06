import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
// import context
import useAuthContext from './hooks/useAuthContext';

function App() {
  // based on user state like if user is null or is login, we can redirect to different component
  const {user, authIsReady} = useAuthContext()

  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}
            <div className="container">
              <Navbar />
              <Routes>
                <Route exact="true" path='/' element={user ? <Dashboard/>: <Navigate to='/login'/>} />
                <Route path='/create' element={user ? <Create /> : <Navigate to='/login'/>}/>
                <Route path='/login' element={user?<Navigate to='/'/> :<Login />}/>
                <Route path='/projects/:id' element={user? <Project />: <Navigate to='/login'/>}/>
                <Route path='/signup' element={ user ? <Navigate to='/'/>:<Signup />}/>    
              </Routes>
            </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
