import React from 'react'
import "./ProjectList.css"
import { Link } from 'react-router-dom'
import Avatar from "./Avatar"

function ProjectList({projects}) {
  return (
    <div className='project_list'>
        {projects.length === 0 && <p>No project</p>}
        {projects.map((project)=>(
           <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
                <div className='assigned_to'>
                    {/* map through the assigned list */}
                    <ul>
                        {project.assignedUsersList.map(user=>(
                            <li key={user.photoURL}>
                                <Avatar className="avatar" src={user.photoURL}/>
                            </li>
                        ))}
                    </ul>
                </div>
           </Link>
        ))}
    </div>
  )
}

export default ProjectList