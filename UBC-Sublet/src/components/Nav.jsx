import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Fav from "../assets/fav.svg";
import DefaultProfile from "../assets/default.png";
import Person from "../assets/person.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import "./styles/nav.css";

export default function Navbar() {
  const [isOnlyUBC, setIsOnlyUBC] = useState(false); // State to track if the input value is "UBC"
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [data, setData] = useState({ latitude: "", longitude: "" });

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      alert(error);
    }
  };

  const handlePlaceChange = () => {
    navigate("/searchSubletss", {
      state: { latitude: data.latitude, longitude: data.longitude, isOnlyUBC },
    });
  };

  const handleCoordinates = async (e) => {
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
      // aler("Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm fixed-top p-3 bg-white">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand"
          style={{
            fontSize: "26px",
            paddingBlock: "0px",
            backgroundColor: "#130e3d",
          }}
        >
          Subletify
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
                  backgroundImage: `url(${SearchIcon})`,
                  backgroundColor: "#f2f2f2",
                  backgroundPosition: "108%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  paddingInlineStart: "12px",
                  paddingInlineEnd: "10px",
                }}
              />
            </div>

            <button
              className="btn text-white"
              type="button"
              id="search-button"
              onClick={handlePlaceChange}
              style={{
                zIndex: "2",
                backgroundImage: `url(${SearchIcon})`,
                backgroundPosition: "7px",
              }}
            >
              {" "}
            </button>
          </div>
          <div
            className="parentContainer"
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "flex-end",
              right: "0px",
            }}
          >
            <div
              className="topLinks"
              style={{ position: "absolute", right: "0" }}
            >
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
                    border: "1px #d1d1d1 solid",
                    marginBlock: "-8px",
                    marginRight: "2px",
                  }}
                />
              </Link>
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
                    <div className="textProf">Profile</div>
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
          </div>
        </div>
      </div>
    </nav>
  );
}
