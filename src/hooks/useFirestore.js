// can be used to add or remove document in the collection

// import { Timestamp } from "firebase/firestore"
import { useReducer, useEffect, useState } from "react"
import { projectFirestore} from "../firebase/config"
import { Timestamp , collection, addDoc, doc, deleteDoc} from "firebase/firestore"
const firestoreReducer = (state,action) =>{
    switch(action.type){
        case 'IS_PENDING':
            return {isPending: true,document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return {isPending: false, document:null, success: true, error: null}
        case 'ERROR':
            return{isPending:false, document:null, success:false, error: action.payload}
        default:
            return state
    }
}
let initialState= {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const useFirestore = (collect) =>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = collection(projectFirestore, collect )
    // //only dispatch if not cancelled

    const dispatchIfNotCancelled = (action)=>{
        if (!isCancelled){
            dispatch(action)
        }
    }   
    // //to  add document
    const addDocument = async (doc) =>{

        dispatch({type:"IS_PENDING"})
        try{
            const createdAt = Timestamp.fromDate(new Date())
            const addedDocument = await addDoc(ref, {...doc, createdAt})
            dispatchIfNotCancelled({type:'ADDED_DOCUMENT', payload: addedDocument})
        
        }catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload: err.message})
        }
    }
    // // delete an document
    const deleteDocument = async (id) =>{
        dispatch({type:"IS_PENDING"})
        try{
            const deletedDocument = await deleteDoc(doc(ref,id)) // delete document of particular id
            dispatchIfNotCancelled({type:'DELECTED_DOCUMENTS', payload: deleteDocument})

        }catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload: 'could not delete'})
        }
    }
    // // cleanup function
    useEffect(()=>{
        return () => setIsCancelled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}
export default useFirestore