
import { doc, collection, updateDoc } from "firebase/firestore"
import { useState, useEffect} from "react"
import { projectAuth , projectFirestore} from "../firebase/config"
import useAuthContext from "./useAuthContext"

const useLogOut = () =>{
    const[isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const {dispatch, user} = useAuthContext()


    const logout = async () =>{
        setError(null)
        setIsPending(true)
        // sign the user out
        try{
            // set online to false before logging out
            const {uid} = user
            // updateDoc(doc(projectFirestore, `user/${uid}`), {online: false})
            await updateDoc(doc(collection(projectFirestore, 'user'), uid), { online: false })
            .then(() => {
                setIsPending(false)
                setError(null)
            })
            .catch(err => setError(err.message))

            await projectAuth.signOut().then(()=>{
                setIsPending(false)
                setError(null)  
            }).catch(err=>{
                setIsPending(false)
                setError(null)
            })
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