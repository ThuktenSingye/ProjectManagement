import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuthContext= () => {
    const context = useContext(AuthContext)

    if (context=== undefined){
        throw new Error('useAuthContext must be inside a AuthContextProvider')
    }

    return context // this context is value of context provider
}
export default useAuthContext