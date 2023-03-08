import { collection, doc , onSnapshot} from "firebase/firestore"
import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
// set up the real time database
const useDocument = (db, id) =>{
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    // realtiem data for document
    useEffect(()=>{
        const ref = doc(collection(projectFirestore,db), id) // doc ref
       const unsub= onSnapshot(doc, (snapshot)=>{
            setDocument({...snapshot.data, id: snapshot.id})
            setError(null)
        }, (err)=>{
            setError("failed to get document")
        })

        return () => unsub()// cleanup function
    }, [db, id])
    return {document, error}
}
export default useDocument