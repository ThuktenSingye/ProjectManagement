
import { useState, useEffect} from "react"
import { projectAuth } from "../firebase/config"
import useAuthContext from "./useAuthContext"

const useLogOut = () =>{
    const[isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () =>{
        setError(null)
        setIsPending(true)

        // sign the user out
        try{
            await projectAuth.signOut()
            // dispatch logout action
            dispatch({type: "LOGOUT"})
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
    return {isPending, error, logout}
}
export default useLogOut