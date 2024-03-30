import pond1 from "../assets/pond1.jpg";
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
          `http://localhost:3001/search?q=${inputValue, "UBC"}`
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
        src={pond1}
        id="imgFluid"
        className="img-fluid position-relative"
        alt="Homepage"
      />
      <form
        className="d-flex search-bar"
        style={{
          top: "82%",
          left: "10%",
          right: "50%",
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
            paddingInline: "24px",
          }}
        />
        <button
          className="btn text-white"
          type="submit"
          id="buttonSearch"
          style={{ borderRadius: "10px" }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}
