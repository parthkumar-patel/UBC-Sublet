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
import { useNavigate } from "react-router-dom";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// google sign in
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    navigate("/");
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
    <AuthContext.Provider value={{ googleSignIn, logOut, user, app }}>
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
