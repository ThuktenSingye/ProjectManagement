import React from 'react'
import { useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import { Timestamp } from 'firebase/firestore'
import useFirestore from '../../hooks/useFirestore'
import Avatar from "../../components/Avatar"
import {formatDistanceToNow} from 'date-fns'  // its look at date comment created and date when we are on web apge. it then guess the different between them 

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
        <h4>Project Comments</h4>
        <ul>
            {project.comments.length > 0 && project.comments.map(comment=>(
                <li key={comment.id}>
                    <div className='comment-author'>
                        <Avatar src={comment.photoURL}/>
                        <p>{comment.displayName}</p>
                    </div>
                    <div className="comment-date">
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p> 
                        {/*  addSuffix to true add suffix at the end like 21 minute (ago) */}
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>

                </li>
            ))}
        </ul>
        <form className='add-comment' onSubmit={handleSubmit}>
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