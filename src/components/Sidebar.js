import React from 'react'
//import styles
import "./Sidebar.css"
// import images 
import DashboardIcon from "../assets/dashboard_icon.svg"
import addIcon from "../assets/add_icon.svg"

// import navlinks
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return(
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className="user">
                {/* avatar and user */}
                <p>Hey user</p>
            </div>

            {/* below is the link to dash board and the crate */}
            <nav className="links">
                <ul>
                    <li>
                        <NavLink exact to="/">
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