import React from 'react'
import Avatar from '../../components/Avatar'
// import firestore hook to export delete document
import useFirestore from '../../hooks/useFirestore'
import useAuthContext from '../../hooks/useAuthContext'
import {useNavigate} from "react-router-dom"

function ProjectSummary({project}) {
    const {deleteDocument} = useFirestore('projects')
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const handleClick = (e)=>{
        deleteDocument(project.id)
        //  after deleting redirect them into dashboard
        navigate('/')

    }
  return (
    <div>
        <div className="project_summary">
            <h1 className="page-title">{project.name}</h1>
            <p>By {project.createdBy.displayName}</p>
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
            {user.uid === project.createdBy.id && (
            <button className='btn' onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    </div>
  )
}

export default ProjectSummary