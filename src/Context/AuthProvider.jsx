import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";

export default function AuthProvider({ children }) {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, EmailAuthCredential, password);
  };

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const info = {
    createUser,
    signinUser,
    googleSignin,
    signOutUser,
  };
  return (
    <div>
      <AuthContext value={info}>{children}</AuthContext>
    </div>
  );
}
