import React, { useState } from 'react'
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']
function ProjectFilter({currentFilter, changeFilter}) {
    
    const handleClick = (newFilter) =>{
        // console.log(newFilter)
        changeFilter(newFilter)
    }

  return (
    <div className='project_filter'>
        <nav>
            <p>Filter by:</p>
            {filterList.map((f)=>(
                <button 
                    key={f}
                    onClick= {()=>handleClick(f)}
                    className={currentFilter === f ? 'active':''}
                >{f}</button>              
            ))}
        </nav>
    </div>
  )
}

export default ProjectFilter