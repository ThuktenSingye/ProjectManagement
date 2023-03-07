import React, { useState } from 'react'
import "./Create.css"

function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(name, details, dueDate)
  }

  return (
    <div className='create-form'>
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input 
            type="text"
            required
            onChange={(e)=>setName(e.target.value)}
            value= {name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            required
            onChange={(e)=>setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due Date:</span>
          <input 
            type="date"
            required
            onChange={(e)=> setDueDate(e.target.value)}
            value={dueDate}
           />
        </label>
        <label>
          <span>Project Category</span>
          {/* category */}
        </label>
        <label>
          <span>Assigned to:</span>
          {/* assigned to  */}
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}

export default Create