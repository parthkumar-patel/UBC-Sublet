import CardComponent from "./CardComponent";
import "../App.css";
import { useState, useEffect } from "react";
export default function Card() {
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

        setAllImage(sortedData.slice(0, 4)); // Set only the first four sorted images
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
const cards = allImage.map((item) => {
    console.log("Carousel ID:", "carouselExampleControlsNoTouching" + item._id);

return (
    <CardComponent
        key={item._id}
        item={item}
    />
)
})

return (
    <div>
      <b className="featuredITems"> Featured sublets </b>
      <section className="cards-list">{cards}</section>
    </div>
  );
}
