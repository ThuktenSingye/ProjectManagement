import React from 'react'
import { useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import { Timestamp } from 'firebase/firestore'
import useFirestore from '../../hooks/useFirestore'
function ProjectComments({project}) {
    const [newComment, setNewComment] = useState('')
    const {user} = useAuthContext()
    const {updateDocument, response} = useFirestore('projects')
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const commentToAdd ={
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments:[...project.comments, commentToAdd]
        })
        if (!response.error){
            setNewComment('')
        }
        
    }
  return (
    <div className='project_comments'>
        <form onSubmit={handleSubmit}>
            <label >
                <span>Add new comment:</span>
                <textarea 
                    required
                    onChange={(e)=>setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
            </label>
            <button className='btn'>Add Comment</button>
        </form>

    </div>
  )
}

export default ProjectComments