import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const ProvideContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loader, setloader] = useState(true);

  const createUser = (email, password) => {
    setloader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setloader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setloader(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const logout = () => {
    return signOut(auth)
      .then(() => {
        alert("logout");
      })
      .catch((error) => {
        console.log(error.message, "from log out");
      });
  };

  const provider = new GoogleAuthProvider();

  const googleSignIn = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user, "and", token);
        alert("google sign in");
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  const userInfo = { user, createUser, loader, login, logout, googleSignIn };
  return (
    <div>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default ProvideContext;
