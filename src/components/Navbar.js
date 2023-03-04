import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
// import logo
import Temple from "../assets/temple.svg"
function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt="logo" />
                <span>The Singye</span>
            </li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/login'>SignUp</Link></li>
            <li>
                <button className='btn'>Logout</button>
            </li>
        </ul>
    </div>
  )
}

export default Navbar