import React from 'react'
import "./Dashboard.css"
// this is where we output the project
import useCollection from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

function Dashboard() {
  const {documents, error} = useCollection('projects')

  return (
    <div className='dashboard'>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && <ProjectFilter/>}
        {documents && <ProjectList projects={documents}/>}
    </div>
  )
}

export default Dashboard