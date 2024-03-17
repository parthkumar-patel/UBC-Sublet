import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
// import Profile from "../assets/profile.png";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function PersonalProfile() {
  const [profiles, setProfiles] = useState([]);
  const { user } = UserAuth();

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

  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const colRef = collection(db, "profiles");
    const q = query(colRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newProfiles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfiles(newProfiles);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <Navigate to="/signin" />;
  }
  console.log(profiles[0]);
  return (
    <div className="d-flex">
      <img src={user.photoURL} alt="Profile" />
      {profiles.length > 0 && (
        <div>
          <p>First Name: {profiles[0].FirstName}</p>
          <p>Last Name: {profiles[0].LastName}</p>
          {/* <p>Birthday: {profiles[0].Birthday}</p> */}
          <p>Email Id: {profiles[0].Email}</p>
          <p>Contact Number: {profiles[0].ContactNo}</p>
        </div>
      )}
    </div>
  );
}
