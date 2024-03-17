import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

// import Profile from "../assets/profile.png";

export default function PersonalProfile() {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const db = getFirestore();
  const colRef = collection(db, "profiles");

  const q = query(colRef);

  // real time collection data
  const unsubCol = onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  });

  unsubCol
  return (
    <div className="d-flex">
      <img src={user.photoURL} alt="Profile" />
      <p>First Name: {user.displayName}</p>
    </div>
  );
}
