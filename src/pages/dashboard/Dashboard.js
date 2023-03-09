import React from 'react'
import "./Dashboard.css"
// this is where we output the project
import useCollection from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'

function Dashboard() {
  const {documents, error} = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const {user} = useAuthContext()

  const changeFilter = (newFilter) =>{
    setCurrentFilter(newFilter)
  }
  //  filter those and pass project list based on filter list 
  const projects = documents ?documents.filter((document)=>{ // if true it will be in filter array else it wil be out of filtered array
    switch (currentFilter){
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u)=>{
          if (user.uid === u.id){ // checking if the user and the project id is same 
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true;

    }
  }): null
  return (
    <div className='dashboard'>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && <ProjectFilter currentFilter= {currentFilter} changeFilter= {changeFilter}/>}
        {documents && <ProjectList projects={projects}/>}
    </div>
  )
}

export default Dashboard