import homepage from "../assets/pic2 3.jpg";

import SearchIcon from "../assets/search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/search.css";

export default function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState({ latitude: "", longitude: "" });

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

  return (
    <div className="position-relative" style={{ marginTop: "7%" }}>
      <img
        src={homepage}
        id="imgFluid"
        className="img-fluid m-3 bg-body-tertiary rounded position-relative"
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
          id="Searching"
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
          id="buttonSearch"
          style={{
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}
