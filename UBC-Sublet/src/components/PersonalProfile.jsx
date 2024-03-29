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
import { Card, Col, Image, Row } from "react-bootstrap";
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
          .sort((a, b) => a.dateAdding - b.dateAdding)
          
        setAllImage(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []); // Ensure user_id is provided as a dependency if it's used inside the useEffect
  
  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const colRef = collection(db, "profiles");

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
    return <Navigate to="/login" />;
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
     return (image.user_id === user.uid);
  });

  let content;
  if (filteredImages.length === 0) {
    content = (
      <div className="no-listing-msg">
        You haven&apos;t posted anything yet. Create your first listing!
      </div>
    );
  } else {
    const cards = filteredImages.map((item) => (
      <CardComponent key={item._id} item={item} />
    ));
    content = <section className="cards-lists">{cards}</section>;
  }

  return (
    <div className="profile-wrapper" style={{ marginTop: "-65px" }}>
      <div className="user-profile">
        <Row className="profile-row justify-content-center">
          {/* <Card className="profile-card">
            {/* <Card.Body> */}
              {/* <Col className="image-col">
                <Image
                  src={userProfile.imageURL}
                  className="image"
                  alt="Profile"
                />
              </Col>
              <div className="profile-row card-info">
                {userProfile && (
                  <div>
                    <p className="full-name">{`${userProfile.FirstName} ${userProfile.LastName}`}</p>
                    <div className="email-info">
                      <span>Email:</span>
                      <p>{userProfile.Email}</p>
                    </div>
                    <div className="contact-info">
                      <span>Contact No.:</span>
                      <p> +1 {userProfile.ContactNo}</p>
                    </div>
                  </div>
                )}
              </div> */}
            {/* </Card.Body> */}
        
        </Row>
      </div>
      <div className="cards" style = {{ marginLeft: "-40%" }}>
        <h1 className="mt-5 pt-4 listing">My Listings</h1>
        {userProfile && content}
      </div>
    </div>
  );
}
