import React, { useEffect, useState } from 'react'
import "./Create.css"
// import select component from reacts-select
import Select from 'react-select'
// import collectino to get user info for assigning projeect
import useCollection from '../../hooks/useCollection'

// import timestamp
import { Timestamp } from 'firebase/firestore'
import useAuthContext from "../../hooks/useAuthContext"

const categories = [
  {value: 'development', label : 'Development'},
  {value: 'design', label: 'Design'},
  {value: 'sales', label: 'Sales'},
  {value:'marketing', label: 'Marketing'}
]
function Create() {
  const {documents} = useCollection('user')
  const [users, setUsers] = useState([])
  const {user} = useAuthContext()

  // we can use useEffect hook by setting document as dependecny to document can be updated
  useEffect(()=>{
    if (documents){
      const options = documents.map(user=>{
        return {value: user, label:user.displayName}
      })
      setUsers(options)
    }
  }, [documents])

  // all form state
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)


  const handleSubmit = (e) =>{
    e.preventDefault()
    // check whether if user has selected the option
    setFormError(null)
    if (!category){
      setFormError("Please select a project category")
      return // return say dont execute any further code
    }
    if (assignedUsers.length < 1){ // no assigned user
      setFormError("Set assign the project to at least one user")
      return
    }
    // now create an project object that will store project detail and will be used to store in firestore database
    // below is information object about user that created that document

    const createdBy = {
      displayName : user.displayName,
      photoURl: user.photoURL,
      id: user.uid
    }
    // below is assigned user list
    const assignedUsersList = assignedUsers.map((u)=>{
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date()),
      comments: [],
      createdBy,
      assignedUsersList
    }
    
    console.log(project)
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
          <Select 
            options={categories}
            onChange={(option)=> setCategory(option)}
          />
        </label>
        <label>
          <span>Assigned to:</span>
          <Select 
            options={users}
            onChange={(option)=>setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create