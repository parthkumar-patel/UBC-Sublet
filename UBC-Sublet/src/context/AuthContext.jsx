import { useContext, createContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile
  } from 'firebase/auth';
import PropTypes from 'prop-types';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC"
  };
  
initializeApp(firebaseConfig);
const auth = getAuth();


// Function to handle signup form submission
export const handleSignupSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.elements.displayName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
            try {
                await updateProfile(cred.user, { displayName: displayName });
                console.log('User created:', cred.user);
                e.target.reset();
            } catch (err) {
                console.error('Error updating profile:', err.message);
            }
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
};

// Function to handle login form submission
export const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User logged in:', cred.user);
            e.target.reset();
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
};


// google sign in 
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          console.log('User', currentUser)
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
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired 
};

export const UserAuth = () => {
    return useContext(AuthContext);
};