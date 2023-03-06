
import { useState , useEffect} from "react"
import { projectAuth,projectStorage, projectFirestore} from "../firebase/config"
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
// import use context hook
import useAuthContext from "./useAuthContext"

import { collection , doc, setDoc} from "firebase/firestore"

const useSignup = ()=>{
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    // const [imgURL, setImgURL] = useState(null)

    const signup = async (email, password, displayName, thumbnail)=>{
        setError(null) // reset error everytime we sign in
        setIsPending(true)
        try{
            const res = await createUserWithEmailAndPassword(projectAuth, email, password)
            const user = res.user

            // .then((userCredential) => {
                // Handle successful account creation
                // const user = userCredential.user
                // upload user thumbnai on the following path 
            const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`
            const imgRef = ref(projectStorage, uploadPath)
            
            // upload image
            await uploadBytes(imgRef, thumbnail).then((snapshot)=>{
                setError(null)
            
                }).catch(err=>{
                    setError(err.message)
                })

            const imgURL = await  getDownloadURL(imgRef)
            await  updateProfile(user, {displayName, photoURL:imgURL}).then((result)=>{
                setIsPending(false)
                setError(null)
            }).catch(err=>{
                setError(err.message)
            })                                                                                      // used to update profile
    
            
            // create user document this will show user with theri avatar and whether they are online or not 
            const collectionRef = collection(projectFirestore, 'user') // get collection
            const docRef = doc(collectionRef,user.uid) // get document referece from collection
            await setDoc(docRef,{
                online: true,
                displayName,
                photoURL: imgURL
            } ) // set new doc based on doc reference
            
            
            // disptach login function
            dispatch({type:'LOGIN', payload:user})

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        
            
        }catch(err){
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
    }


    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])


    return {error, isPending, signup}
}
export default useSignup