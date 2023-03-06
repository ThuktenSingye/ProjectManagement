import React from 'react'
import "./OnlineUsers.css"
// import useCollection hook to obtain user document
import useCollection from '../hooks/useCollection'
// import avatar component
import Avatar from './Avatar.js'
function OnlineUsers() {
    const {documents, error} = useCollection('user') // fetch the collection document

  return (
    <div className='user-list'>
        <h2>All user</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map((user)=>(
            <div key={user.id} className="user-list-item">
                <span>{user.displayName}</span>
                <Avatar src = {user.photoURL}/>
            </div>
        ))}
    </div>
  )
}

export default OnlineUsers