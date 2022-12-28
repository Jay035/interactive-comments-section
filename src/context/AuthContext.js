import { createContext, useContext, useEffect } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function AuthContextProvider ({children}) {
    const [user] = useAuthState(auth);

    const likesRef = collection(db, "likes");
    const navigate = useNavigate();
    const addLike = async (commentId) => {
        if (!user) {
          navigate("/login");
        }
        await addDoc(likesRef, {
          userId: user?.uid,
          commentId: commentId,
        });
      };

      const handleReply = () => {
        if (!user) {
          navigate("/login");
        }
      };

    // create user with email and password function
    // const createUser = (email, password) => {
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }

    // sign in function
    // const signIn = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password);
    // }
    
    // log out function
    // const logOut = () => {
    //     return signOut(auth);
    // }

    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //     console.log(currentUser)
    //     setUser(currentUser)
    //   })
    //   return () => {
    //     unsubscribe();
    //   }
    // }, [])
    

    return(
        <UserContext.Provider value={{addLike, handleReply, user}}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth() {
    return useContext(UserContext)
}
