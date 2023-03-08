import React from 'react'
import Avatar from '../../components/Avatar'

function ProjectSummary({project}) {
  return (
    <div>
        <div className="project_summary">
            <h1 className="page-title">{project.name}</h1>
            <p className="due-date">
                Project due by {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">{project.details}</p>
            <h4>Project is assigned to:</h4>
            <div className="assigned-users">
                {project.assignedUsersList.map(user=>(
                    <div key={user.id}>
                        <Avatar src={user.photoURL}/>
                    </div>
                ))}
            </div>
           
        </div>
    </div>
  )
}

export default ProjectSummary