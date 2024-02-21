import Navbar from './components/Navbar';
import './App.css'

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, 
  // signOut, signInWithEmailAndPassword,
} from "firebase/auth"

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

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log('user created: ',cred.user)
    signupForm.reset()
  })
  .catch((err) => {
    console.log(err.mes)
  })
})


export default function App() {
  return (
      <div className="app--container"> 
          <Navbar />
      </div>
  )
}