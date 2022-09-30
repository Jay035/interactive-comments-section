import { createContext, useContext, useEffect } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from "react";

const UserContext = createContext();

export function AuthContextProvider ({children}) {
    const [user, setUser] = useState(null);

    // create user with email and password function
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in function
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    // log out function
    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
        setUser(currentUser)
      })
      return () => {
        unsubscribe();
      }
    }, [])
    

    return(
        <UserContext.Provider value={{createUser, user, logOut, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}
