import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Card, Container, Row, Col, Image } from "react-bootstrap";

// Function component for user profile page
export default function PersonalProfile() {
  const [profiles, setProfiles] = useState([]); // State to hold user profiles
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth(); // Destructuring user from authentication context

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };

  // Initialize Firebase app
  initializeApp(firebaseConfig);

  // Effect hook to fetch user profiles from Firestore
  useEffect(() => {
    if (!user) return; // Return if user is not authenticated

    const db = getFirestore(); // Firestore database instance
    const colRef = collection(db, "profiles"); // Reference to 'profiles' collection
    const q = query(colRef); // Query to get all documents from collection

    // Subscribe to real-time updates on 'profiles' collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newProfiles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfiles(newProfiles); // Update profiles state with new data
      setLoading(false);
    });

    // Unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
  }, [user]); // Dependency array with 'user'

  // Redirect to sign-in page if user is not authenticated
  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Find user profile from profiles array
  const userProfile = profiles.find((profile) => profile.uid === user.uid);
  if (!userProfile) {
    return <Navigate to="/create-profile" />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Col xs={6} md={4}>
                  <Image src={user.photoURL} alt="Profile" roundedCircle />
                </Col>
                {userProfile && (
                  <div className="ml-3">
                    <h4>{`${userProfile.FirstName} ${userProfile.LastName}`}</h4>
                    <p>Email: {userProfile.Email}</p>
                    <p>Contact Number: {userProfile.ContactNo}</p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
