
import { useState , useEffect} from "react"
import { projectAuth} from "../firebase/config"
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'


import useAuthContext from "./useAuthContext"

const useSignup = ()=>{
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, displayName)=>{
        setError(null) // reset error everytime we sign in
        setIsPending(true)
        await createUserWithEmailAndPassword(projectAuth, email, password)
        .then((userCredential) => {
            // Handle successful account creation
            const user = userCredential.user
            updateProfile(user, {displayName}).then((result)=>{ // used to update profile
            }).catch(err=>{
                setError(err.message)
            })
            // disptach login function
            dispatch({type:'LOGIN', payload:user})
            if (!isCancelled){

                setIsPending(false)
                setError(null)
            }
        })
        .catch((error) => {
            // Handle errors
            console.error(error)
            if (!isCancelled){
                setError(error)
                setIsPending(false)
            }
        })
    }
    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {error, isPending, signup}
}
export default useSignup