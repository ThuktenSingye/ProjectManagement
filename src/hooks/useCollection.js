// this hook is to fetch collection from the firebase and display on the UI

import { collection, onSnapshot,where, query, orderBy} from "firebase/firestore"
import { useState, useEffect, useRef }from "react"
import { projectFirestore } from "../firebase/config"

const useCollection = (data, para, _orderBy) =>{
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    // if we dont use red --> infinite loop in useEffect
    // para is an array and is different on every function call
    const q = useRef(para).current
    const sortBy = useRef(_orderBy).current
    // whenever collection changes we want to render again and display 
    useEffect(()=>{
        let ref = collection(projectFirestore, data)
        if (q){
            ref = query(ref, orderBy(...sortBy),where(...q))
        }
    
        const unsub = onSnapshot(ref, (snapshot)=>{
            let results = []
            snapshot.docs.forEach(doc =>{
                results.push({...doc.data(), id:doc.id})
            })
            setDocuments(results)
            setError(null)
        }, (error)=>{
            console.log(error)
            setError('could not fetch the data')
        })

        // unmount the listener // cleanup function
        return () => unsub()
    },[data, q, sortBy])
    // the above para is reference type like whenver the component is re rendered 
    // this para which is array type is created differently than the last array 
    // so we used useRef hook 

    return {documents, error}

}
export default useCollection