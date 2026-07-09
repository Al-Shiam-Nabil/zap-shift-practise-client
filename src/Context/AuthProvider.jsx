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
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const googleSignin = () => {
    setLoading(true);

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
    loading,
    setLoading,
    user,
  };
  return (
    <div>
      <AuthContext value={info}>{children}</AuthContext>
    </div>
  );
}
