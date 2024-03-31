import CardComponent from "./CardComponent";
import "../App.css";
import "./styles/card.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();
  const [allImage, setAllImage] = useState([]);
  useEffect(() => {
    getImage();
  }, []);

  const handleViewAll = () => {
    navigate("/searchSubletss", {
      state: { latitude: 49.26060520000001, longitude: -123.2459939 },
    });
  };

  function getImage() {
    fetch("http://localhost:3001/subletslist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.slice().sort((a, b) => {
          const dateA = a.dateAdding;
          const dateB = b.dateAdding;
          return dateA - dateB;
        });

        setAllImage(sortedData.slice(0, 8)); // Set only the first four sorted images
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const cards = allImage.map((item) => {
    return <CardComponent key={item._id} item={item} />;
  });

  return (
    <div>
      <div className="featured-view-all">
        <div className="featured-sublet">Featured Sublets</div>
        <button className="view-all-sublet" onClick={handleViewAll}>
          View all Sublets
        </button>
      </div>
      <section
        className="cards-list"
        id="cards-lists"
        style={{ marginTop: "90px" }}
      >
        {cards}
      </section>
    </div>
  );
}
