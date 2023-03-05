import React, { useState } from 'react'
import "./Signup.css"
// import hook
import useSignup from '../../hooks/useSignup'

function Signup() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const {signup, isPending, error} = useSignup()

  const handleFileChange = (e) =>{
    // setThumbnail(null)
    let selected = e.target.files[0] // return array of files

    if (!selected){
      setThumbnailError("Please select the file")
      return
    }
    if (!selected.type.includes('image')){
      setThumbnailError("Selected file should be image")
      return
    }
    if (selected.size > 100000){
      setThumbnailError("Image file size must be less than 100000kb")
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
  
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          onChange={(e)=> setPassword(e.target.value)} 
          value={password}
          required
          />
      </label>
      <label >
        <span>display name:</span>
        <input 
          type="text"
          onChange={(e)=> setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input 
          type="file"
          required
          onChange={handleFileChange}
         />
         {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup