import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
// import logo
import Temple from "../assets/temple.svg"
// import logout hooks
import useLogOut from '../hooks/useLogOut'
// import context to get user sttae
import useAuthContext from '../hooks/useAuthContext'

function Navbar() {

  const {logout, isPending} = useLogOut()
  const {user} = useAuthContext()
  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt="logo" />
                <span>The Singye</span>
            </li>
            {!user && (
              <>
              {/* we used fragment here beacuse we have more than one children to return */}
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
              </>
            )}
            {user && (
            <li>
                {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                {isPending && <button className='btn' disabled>Logging out ..</button>}
            </li>
            )}
        </ul>
    </div>
  )
}

export default Navbar
