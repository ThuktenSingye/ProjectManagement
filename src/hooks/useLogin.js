
import { useState, useEffect} from "react"
import { projectAuth } from "../firebase/config"
import useAuthContext from "./useAuthContext"
import {signInWithEmailAndPassword} from 'firebase/auth'

const useLogin = () =>{
    const[isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) =>{
        setError(null)
        setIsPending(true)

        // sign the user out
        try{
            const  res = await signInWithEmailAndPassword(projectAuth,email, password)// return the response object that have user 
            // dispatch logout action
            dispatch({type: "LOGIN", payload: res.user})
            
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