import homepage from "../assets/pic2 3.jpg";
import marine from "../assets/marine_drive.png";
import SearchIcon from "../assets/search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useHistory } from 'react-router-dom';

// import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U";

export default function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState({ latitude: "", longitude: "" });
  const [place, setPlace] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handlePlaceChange = async (e) => {
    try {
      const inputValue = e.target.value;

      if (inputValue.trim() !== "") {
        const response = await fetch(
          `http://localhost:3001/search?q=${inputValue}`
        );
        const searchData = await response.json();
        setData(searchData);
      } else {
        setData({ latitude: 49.26060520000001, longitude: -123.2459939 }); // set data state values for ubc
      }
      //       Handle the response data here
      // const predictions = response.data.predictions;
      // for (const prediction of predictions) {
      //     // Extract place ID
      //     const placeId = prediction.place_id;

      //     // Fetch details of the place using Place Details API
      //     const placeDetails = response.data.predictions;

      //     // Extract coordinates from placeDetails.geometry.location
      //     if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
      //         const { lat, lng } = placeDetails.geometry.location;
      //         console.log(lat);
      //         console.log(lng);
      //     }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(data.latitude);
  console.log(data.longitude);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/searchSubletss", {
      state: { latitude: data.latitude, longitude: data.longitude },
    });
  };

  // console.warn("result return here", place)
  return (
    <div className="position-relative" style={{ marginTop: "7%" }}>
      <img
        src={homepage}
        className="img-fluid m-3 bg-body-tertiary rounded position-relative"
        style={{
          width: "70%",
          height: "500px",
          marginTop: "30px",
          borderRadius: "8px",
          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
          filter: "contrast(110%)",
        }}
        alt="Homepage"
      />
      <form
        className="d-flex position-absolute translate-middle"
        style={{
          top: "86%",
          left: "38%",
          minWidth: "600px",
        }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by address or neighbourhood"
          aria-label="Search by address or neighbourhood"
          onChange={handlePlaceChange}
          style={{
            backgroundImage: `url(${SearchIcon})`,
            backgroundPosition: "15px center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            paddingInline: "50px",
          }}
        />
        <button
          className="btn text-white"
          type="submit"
          style={{
            background: "#24a0ed",
            padding: "10px",
            paddingInline: "15px",
            marginBlock: "7.5px",
            marginLeft: "-100px",
            borderRadius: "10px",
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      {/* <GoogleComponent
                // apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                //   locationBoxStyle={'custom-style'}
                //   locationListStyle={'custom-style-list'}
                onChange={handlePlaceChange} /> */}
    </div>
  );
}
