import { useContext, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import PropTypes from "prop-types";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEKCwNSFllLu5zfSPtv2CuG5N-o8agztg",
  authDomain: "echohouse-a308d.firebaseapp.com",
  projectId: "echohouse-a308d",
  storageBucket: "echohouse-a308d.appspot.com",
  messagingSenderId: "611969960248",
  appId: "1:611969960248:web:70944b1ef2144ea61559cd",
  measurementId: "G-0E6X8MF7Q9",
};

initializeApp(firebaseConfig);
const auth = getAuth();

// google sign in
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
