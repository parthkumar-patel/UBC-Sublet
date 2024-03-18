import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import CreateProfile from "./CreateProfile";
import CardComponent from "./CardComponent";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import "./styles/profile.css";

export default function PersonalProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/subletslist");
        const data = await response.json();
        const sortedData = data
          .slice()
          .sort((a, b) => a.dateAdding - b.dateAdding);
        setAllImage(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };
  const firebaseConfignew = {
    apiKey: "AIzaSyApjwpwpCwORh66wapgNgigm1iKdEjZub8",
    authDomain: "art-gallery-ab57c.firebaseapp.com",
    projectId: "art-gallery-ab57c",
    storageBucket: "art-gallery-ab57c.appspot.com",
    messagingSenderId: "569425492328",
    appId: "1:569425492328:web:dd223dcd55fe4d681ffedd",
    measurementId: "G-S5LYSLD7F9",
  };

  const app = initializeApp(firebaseConfig);
  const appNew = initializeApp(firebaseConfignew, "new");
  const db1 = getFirestore(appNew);
  const colRef = collection(db1, "profiles");

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
    return (
      <div style={{ marginTop: "-65px" }}>
        <CreateProfile colRef={colRef} user={user} app={app} />
      </div>
    );
  }

  const filteredImages = allImage.filter((image) => {
    return userProfile.lisitings.includes(image._id);
  });

  const cards = filteredImages.map((item) => {
    return <CardComponent key={item._id} item={item} />;
  });

  return (
    <div className="profile-wrapper" style={{ marginTop: "-65px" }}>
      <Container className="user-profile">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <Col xs={6} md={4}>
                    <Image
                      src={userProfile.imageURL}
                      width="100px"
                      alt="Profile"
                      roundedCircle
                    />
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
      <div className="cards">
        <h1 className="mt-5 pt-4">My Listings</h1>
        {userProfile && <section className="cards-lists">{cards}</section>}
      </div>
    </div>
  );
}
