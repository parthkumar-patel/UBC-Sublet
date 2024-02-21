import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

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

// const signupForm = document.querySelector('.signup');
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const email = signupForm.email.value
//   const password = signupForm.password.value

//   createUserWithEmailAndPassword(auth, email, password)
//   .then((cred) => {
//     // console.log('user created: ',cred.user)
//     signupForm.reset()
//   })
//   .catch((err) => {
//     console.log(err.mes)
//   })
// })



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
