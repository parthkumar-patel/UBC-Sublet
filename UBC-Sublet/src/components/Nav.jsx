import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import Fav from "../assets/fav.svg";
import Search from "../assets/search.svg";
import DefaultProfile from "../assets/default.png";
import Person from "../assets/person.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "../assets/search.svg";

import "./styles/nav.css";

// const API_KEY = "AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [data, setData] = useState({ latitude: "", longitude: "" });

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceChange = () => {
    navigate("/searchSubletss", {
      state: { latitude: data.latitude, longitude: data.longitude },
    });
    window.location.reload();
  };

  const handleCoordinates = async (e) => {
    try {
      let inputValue = "";
      inputValue = e.target.value.trim();
      if (inputValue) {
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
                placeholder="Search"
                onChange={handleCoordinates}
                style={{
                  position: "relative",
                  backgroundImage: `url(${Search})`,
                  backgroundColor: "white",
                  backgroundPosition: "108%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  paddingInlineStart: "50px",
                  paddingInlineEnd: "10px",
                }}
              />
            </div>

            <button
              className="btn text-white"
              type="button"
              id="search-button"
              onClick={handlePlaceChange}
              style = {{  zIndex: "0", backgroundImage: `url(${SearchIcon})`, backgroundPosition: '7px' }}
            > </button>
          </div>

          <Link to="/Fav" className="navbar">
            <img
              src={Fav}
              alt="Fav"
              className="d-inline-block align-text-top ms-2"
              id="favid"
              style={{
                backgroundColor: "#f2f2f2",
                scale: "0.83",
                backgroundRepeat: "no-repeat",
                border: "#d8d8d8 solid",
                borderRadius: "10px",
                padding: "8px",
                marginBlock: "-8px",
                marginRight: "2px",
              }}
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
              src={user ? user.photoURL || DefaultProfile : Person}
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
