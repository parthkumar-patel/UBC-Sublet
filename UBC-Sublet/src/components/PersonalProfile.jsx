import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import CreateProfile from "./CreateProfile";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Card, Container, Row, Col, Image } from "react-bootstrap";

export default function PersonalProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();

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

  // Effect hook to fetch user profiles from Firestore
  useEffect(() => {
    if (!user) return; // Return if user is not authenticated

    const q = query(colRef);

    // Subscribe to real-time updates on 'profiles' collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newProfiles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfiles(newProfiles);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Redirect to sign-in page if user is not authenticated
  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const userProfile = profiles.find((profile) => profile.uid === user.uid);
  if (!userProfile) {
    // return <Navigate to="/create-profile" />;
    return <CreateProfile colRef={colRef} />;
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
