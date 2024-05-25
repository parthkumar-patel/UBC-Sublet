import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/searchnew.css";
import SearchIcon from "../assets/Button.svg";
import SearchWithIcon from "../assets/SearchWithIcon.svg";

export default function Search() {
  const [isOnlyUBC, setIsOnlyUBC] = useState(false); // State to track if the input value is "UBC"
  const navigate = useNavigate();
  const [data, setData] = useState({ latitude: "", longitude: "" });
  const [clicked, setClicked] = useState(false);
  const panelRef = useRef(null);

  const handlePlaceChange = async (e) => {
    try {
      const inputValue = e.target.value;

      if (inputValue.trim() !== "") {
        if (inputValue.toUpperCase() != "UBC") {
          setIsOnlyUBC(false);
          const response = await fetch(
            `https://ubc-sublet.onrender.com/search?q=${inputValue + " UBC"}`
          );
          const searchData = await response.json();
          setData(searchData);
        } else {
          setIsOnlyUBC(true); // Set the flag to true if input value is "UBC"
          const response = await fetch(
            `https://ubc-sublet.onrender.com/search?q=${inputValue}`
          );
          const searchData = await response.json();
          setData(searchData);
        }
      } else {
        setIsOnlyUBC(false);
        setData({ latitude: 49.26060520000001, longitude: -123.2459939 }); // set data state values for ubc
      }
    } catch (error) {
      alert("Error:" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/searchSubletss", {
      state: { latitude: data.latitude, longitude: data.longitude, isOnlyUBC },
    });
  };

  const handleTabPanelClick = (event) => {
    if (panelRef.current && panelRef.current.contains(event.target)) {
      setClicked(true);
    }
    const input = document.getElementById("searchInput");
    if (event.target !== input) {
      input.focus();
    }
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="new">
      <div className="slogan">
        <p className="headline">Explore places to sublet at UBC</p>
      </div>
      <div className="landingpage">
        <form
          className={`tabpanel ${clicked ? "clicked" : ""}`}
          onClick={handleTabPanelClick}
          ref={panelRef}
        >
          <div className="destination-search">
            <div className="search-field">
              <div className="where">Where</div>
              <input
                id="searchInput"
                className="search-destinations"
                placeholder="Search destinations"
                aria-label="Search destinations"
                onChange={handlePlaceChange}
                autoComplete="off"
              />
            </div>
          </div>
          <button className="searchbutton" onClick={handleSubmit}>
            <img
              className={`button-icon ${clicked ? "with-icon" : ""}`}
              loading="lazy"
              alt="SearchIcon"
              src={clicked ? SearchWithIcon : SearchIcon}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
