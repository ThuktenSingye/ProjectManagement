import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
// import pages and component
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={ <Dashboard />}/>
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
