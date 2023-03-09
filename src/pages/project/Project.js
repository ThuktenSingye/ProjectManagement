import React from 'react'
import "./Project.css"

// in order to extreac id we use useparam hooks
import { useParams } from 'react-router-dom'
import useDocument from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'
function Project() {
  const {id} = useParams()
  const {document, error} = useDocument('projects', id)
  if (error){
    return <div className='error'>{error}</div>
  }

  if (!document){
    return <div className='loading'>Loading ...</div>
  }
  console.log(document)
  return (
    <div className='project_details'>
        <ProjectSummary project = {document}/>
        <ProjectComments project ={document}/>
    </div>
  )
}

export default Project