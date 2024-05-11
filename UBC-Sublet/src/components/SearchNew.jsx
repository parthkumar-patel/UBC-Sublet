// import pond1 from "../assets/pond1.jpg";
import upload from "../assets/UBC.jpg";
import SearchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/searchnew.css";

export default function Search() {
  const [isOnlyUBC, setIsOnlyUBC] = useState(false); // State to track if the input value is "UBC"
  const navigate = useNavigate();
  const [data, setData] = useState({ latitude: "", longitude: "" });

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

  return (
    <div className="new">
      <div className="slogan" >
        <p style={{fontFamily: 'Cereal-Md',
         textAlign: 'left', 
         fontSize: '4.5rem'
         }}>Explore places to sublet at UBC</p>
      </div>
       <div className="landingpage">

        <div className="searchbg">


       <form className="searchform"
          style={{
            // top: "82%",
            // left: "10%",
            // right: "50%",
          }}>
      <input className="searchinput" 
              placeholder="Search by address or neighbourhood"
              aria-label="Search by address or neighbourhood"
              onChange={handlePlaceChange} />
      <button className="searchbutton">Search</button>

     
    </form> 
    </div>


{/* <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Search Mockups, Logos..." 
        onChange={handlePlaceChange}
        required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form> */}

      
        

       </div>
       

      {/* <img
        src={upload}
        id="imgFluid"
        className="img-fluid position-relative"
        alt="Homepage"
      /> */}

    




      {/* <form
        className="search-bar"
        style={{
          top: "82%",
          left: "10%",
          right: "50%",
        }}
      >
        <input
          // className="form-control"
          id="Searching"
          type="search"
          placeholder="Search by address or neighbourhood"
          aria-label="Search by address or neighbourhood"
          onChange={handlePlaceChange}
          style={{
            // backgroundImage: `url(${SearchIcon})`,
            // backgroundPosition: "15px center",
            // backgroundRepeat: "no-repeat",
            // borderRadius: "10px",
            // paddingInline: "24px",
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
      </form> */}
  
    </div>
  );
}
