import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import CreateProfile from "./CreateProfile";
import CardComponent from "./CardComponent";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Card, Col, Image, Row } from "react-bootstrap";
import "./styles/profile.css";
import Success from "../components/Success";

export default function PersonalProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, app } = UserAuth();
  const [allImage, setAllImage] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://ubc-sublet.onrender.com/subletslist"
        );
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
  }, [allImage]);

  const db = getFirestore(app);
  const colRef = collection(db, "profiles");

  useEffect(() => {
    if (!user) return; // Return if user is not authenticated

    const q = query(colRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newProfiles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfiles(newProfiles);
      console.log(newProfiles);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const userProfile = profiles.find((profile) => profile.uid === user.uid);
  console.log(userProfile);
  if (!userProfile) {
    return (
      <div style={{ marginTop: "-65px" }}>
        <CreateProfile colRef={colRef} user={user} app={app} />
      </div>
    );
  }

  const filteredImages = allImage.filter((image) => {
    return image.user_id === user.uid;
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
      <CardComponent key={item._id} item={item} setDeleted={setDeleted} />
    ));
    content = <section className="cards-lists">{cards}</section>;
  }

  return (
    <div className="profile-wrapper" style={{ marginTop: "-65px" }}>
      {deleted && <Success msg="Your listing has been successfully deleted!" />}
      <div className="user-profile">
        <Row className="profile-row justify-content-center">
          <Card className="profile-card">
            <Card.Body>
              <Col className="image-col">
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
              </div>
            </Card.Body>
          </Card>
        </Row>
      </div>

      <div className="cards">
        <h1 className="mt-5 pt-4 pb-4 listing">My Listings</h1>
        {userProfile && content}
      </div>
    </div>
  );
}
