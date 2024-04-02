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


export const AuthContextProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };
  
  initializeApp(firebaseConfig);
  const auth = getAuth();
  
  // google sign in
  const AuthContext = createContext();

  const [user, setUser] = useState(null);

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
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };
  
  initializeApp(firebaseConfig);
  const auth = getAuth();
  
  // google sign in
  const AuthContext = createContext();
  return useContext(AuthContext);
};
