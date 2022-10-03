import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB0h80E6GGEYRiv5erPAwzHXPrjwxJ71D4",
  authDomain: "comments-authentication-2a59f.firebaseapp.com",
  projectId: "comments-authentication-2a59f",
  storageBucket: "comments-authentication-2a59f.appspot.com",
  messagingSenderId: "880337890611",
  appId: "1:880337890611:web:7c0492cd9f395216966246",
  measurementId: "G-78V6SQC3HF"
});

export const auth = getAuth(app);
export default app;