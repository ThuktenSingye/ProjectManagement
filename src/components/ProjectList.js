import React from 'react'
import "./ProjectList.css"

function ProjectList({projects}) {
  return (
    <div className='project_list'>
        {projects.length === 0 && <p>No project</p>}
        {projects.map((project)=>(
            <div key={project.id}>
                {project.name}
            </div>
        ))}
    </div>
  )
}

export default ProjectList