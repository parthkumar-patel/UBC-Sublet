import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import Profile from "../assets/profile.png";
import Fav from "../assets/fav.svg";
import Search from "../assets/search.svg";
import DefaultProfile from "../assets/person.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/nav.css";

const API_KEY = "AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U";

export default function Navbar() {
  const [alreadyNavigated, setAlreadyNavigated] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [data, setData] = useState({ latitude: "", longitude: "" });
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [searchInput, setSearchInput] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceChange = () => {
    // if (window.location.pathname === "/searchSubletss") {
    //     // Reload the page if already on the "searchSubletss" page
    //     window.location.reload();
    // }

    navigate("/searchSubletss", {
      state: { latitude: data.latitude, longitude: data.longitude },
    });
    window.location.reload();
  };

  const handleCoordinates = async (e) => {
    try {
      let inputValue = "";
      inputValue = e.target.value.trim(); // Trim whitespace from input
      if (inputValue) {
        // Check if input is not empty
        const response = await fetch(
          `http://localhost:3001/search?q=${inputValue}`
        );
        console.log("response", response);
        if (response.ok) {
          const searchData = await response.json();
          console.log(searchData.longitude);
          setData(searchData);
        } else {
          console.error("Search request failed:", response.statusText);
        }
      } else {
        // Optionally provide feedback to the user about empty input
        console.log("Input is empty");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm fixed-top p-3 bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={Logo}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          UBC Sublet
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="input-group">
            <div className="form-outline" data-mdb-input-init>
              <input
                id="search-input"
                type="search"
                className="form-control"
                onChange={handleCoordinates}
              />
            </div>

            <button
              className="btn text-white"
              type="button"
              id="search-button"
              onClick={handlePlaceChange}
            >
              Search
              <i className="fas fa-search"></i>
            </button>
          </div>

          <Link to="/Fav" className="navbar">
            <img
              src={Fav}
              alt="Fav"
              width="30"
              height="24"
              className="d-inline-block align-text-top ms-2"
              id="favid"
            />
          </Link>
        </div>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user ? user.photoURL : DefaultProfile}
              alt="Profile"
              width="24"
              height="24"
              className="d-inline-block align-text-top ms-2 rounded-circle"
              id="profileImage"
            />
          </a>
          <ul className="dropdown-menu">
            <Link to="/profile" className="dropdown-item ms-3">
              <div className="textProf"> Profile </div>
            </Link>
            <hr className="dropdown-divider" />
            <div className="dropdown-item ms-1">
              {user ? (
                <a onClick={handleSignOut} className="btn">
                  Logout
                </a>
              ) : (
                <Link to="/login" className="btn">
                  Log in
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// WE WILL HAVE TO ADD THIS CODE WHEREEVER WE ARE POSTING A SUBLET IT IS TO CONVERT IMAGE FILE INTO BINARY TO STORE IT INTO THE DATABASE
/*
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
*/
