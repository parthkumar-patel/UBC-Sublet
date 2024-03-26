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

  function getImage() {
    fetch("http://localhost:3001/subletslist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // let imageCount = 0;

        // // Increment the image count for each image added
        // imageCount++;

        // Sort the data if less than or equal to four images have been added
        // Sort the data if less than or equal to four images have been added
        const sortedData = data.slice().sort((a, b) => {
          const dateA = a.dateAdding;
          const dateB = b.dateAdding;
          return dateA - dateB;
        });

        setAllImage(sortedData.slice(0, 5)); // Set only the first four sorted images
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const handleCardClick = (item) => {
    console.log("being presssed")
    navigate("/desc", {
      state: { item },
    });
  };
  const cards = allImage.map((item) => {
    console.log("Carousel ID:", "carouselExampleControlsNoTouching" + item._id);

    return <CardComponent key={item._id} item={item}  // Test with a simple log
    />;
  });

  return (
    <div>
      <div
        className="featuredITems" id = "featuredi"
      >
        Featured sublets
      </div>
      <section className="cards-list" id = "cards-lists" style={{ marginTop: "150px" }}     onClick={(e => console.log(e))}>
        {cards}
      </section>
    </div>
  );
}
