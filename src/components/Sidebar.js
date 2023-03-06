import React from 'react'
//import styles
import "./Sidebar.css"
// import images 
import DashboardIcon from "../assets/dashboard_icon.svg"
import addIcon from "../assets/add_icon.svg"

// import navlinks
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import useAuthContext from '../hooks/useAuthContext'

function Sidebar() {
    const {user} = useAuthContext() // to get photo url
  return(
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className="user">
                <Avatar src = {user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>

            {/* below is the link to dash board and the crate */}
            <nav className="links">
                <ul>
                    <li>
                        <NavLink exact='true' to="/">
                            <img src={DashboardIcon} alt="dashboardIcon" />  
                            <span>Dashboard</span>                  
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={addIcon} alt="addIcon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
export default Sidebar