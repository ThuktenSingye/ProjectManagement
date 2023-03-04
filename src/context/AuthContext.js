import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user:null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady : false // this authready check is if user is login or not.if so render all component in app.js
    })
    // when component is loaded first, we need check if user is login or not for that we can use useEffect hook that allow to render once 
    useEffect(()=>{
        // it is listener and listento the changes in user authentication state
        // callback function receives an argument that represent current authentited user 
        const unsub = projectAuth.onAuthStateChanged((user)=>{ 
            dispatch({type:'AUTH_IS_READY', payload:user})
            unsub() // stop listening
        })
    }, [])

    console.log("AuthContext state:", state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}


