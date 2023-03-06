
import { useState, useEffect} from "react"
import {  projectFirestore, projectAuth,} from "../firebase/config"
import useAuthContext from "./useAuthContext"
import {signInWithEmailAndPassword} from 'firebase/auth'
import { doc ,  updateDoc, collection} from "firebase/firestore"

const useLogin = () =>{
    const[isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) =>{
        setError(null)
        setIsPending(true)
        // login
        try{          
            const res = await signInWithEmailAndPassword(projectAuth, email, password)  
                // return the response object that have user 
            const user = res.user
            // update the online status
            const {uid} = user

            await updateDoc(doc(projectFirestore, 'user', uid), {online: true}) 
            // updateDoc(doc(projectFirestore, 'user', uid), { online: true })
            .then(() => {
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                setError(false)
                setIsPending(false)
            })
            // dispatch logout action
            dispatch({type: "LOGIN", payload: user})
            
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
            
        }catch(err){
        
            if (!isCancelled){
                setIsPending(false)
                setError(err.message)
            }
        }
    }
    // it will return an function that state setIsCancelled to true when the component unmount
    // by updating, we are not updating state on he unmounted one
    useEffect(()=>{
        return () => setIsCancelled(true)
    }, [])

    return {isPending, error, login}
}
export default useLogin