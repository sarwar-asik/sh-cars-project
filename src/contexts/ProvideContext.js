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
import { toast, ToastContainer } from "react-toastify";
import { AuthToken } from "../jwtToken/AuthToken";
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
    localStorage.removeItem("SHcarsToken");
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
        const user = result.user;
        console.log(user);
        toast("google sign in");
        setloader(true);
        // for token ////
        AuthToken(user);
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
      <ToastContainer />
    </div>
  );
};

export default ProvideContext;
