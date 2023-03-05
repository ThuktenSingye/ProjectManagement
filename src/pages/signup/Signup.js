import React, { useState } from 'react'
import "./Signup.css"

function Signup() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(null)

  const handleFileChange = (e) =>{
    setThumbnail(null)
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
    console.log("Thumbnail updated")
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(email, password, displayName, thumbnail)
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
      <button className='btn'>Sign Up</button>
    </form>
  )
}

export default Signup