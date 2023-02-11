import { createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function AuthContextProvider({ children }) {
  const [user] = useAuthState(auth);
  const [likeId, setLikeId] = useState("");
  const [newDoc, setNewDoc] = useState("");
  const [addCommentModalShown, setAddCommentModalShown] = useState(false)

  const likesRef = collection(db, "likes");
  const navigate = useNavigate();
  const addLike = async (commentId) => {
    try {
      if (!user) {
        navigate("/login");
      }
      const data = await addDoc(likesRef, {
        userId: user?.uid,
        commentId: commentId,
      });
      setNewDoc(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async (commentId) => {
    try {
      const unLikeQuery = query(
        likesRef,
        where("commentId", "==", commentId),
        where("userId", "==", user?.uid)
      );

      const unLikeData = await getDocs(unLikeQuery);
      setLikeId(unLikeData.docs[0].id);
      console.log(unLikeData.docs[0]);
      const unLike = doc(db, "likes", likeId);
      await deleteDoc(unLike);
      console.log(likeId)

      if (!user) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
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

  return (
    <UserContext.Provider
      value={{ handleReply, user, newDoc, addLike, removeLike, likeId, addCommentModalShown, setAddCommentModalShown }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}

AuthContextProvider.propTypes = {
  likeId: PropTypes.string,
};
