import React, { useState, useEffect } from "react";
import "./styles/post.css";
import UploadImages from "./UploadImages";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionAmenities, setSelectedOptionAmenities] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue2, setInputValue2] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [roomsFor, setRooms] = useState([]);
  // const [data, setData] = useState({ latitude: "", longitude: "" });
  const { user } = UserAuth();
  const navigate = useNavigate();

  let isFinalStep = false;

  useEffect(() => {
    const validateInput = () => {
      if (inputValue2.trim() !== "") {
        const isValidDate = /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue2);
        const isLaterDate = inputValue2 > inputValue;
        if (!isValidDate) {
          alert("Please enter a date in the yyyy/mm/dd format.");
          inputRef2.current.focus();
          return true; // Return true if alert was triggered
        } else if (!isLaterDate) {
          alert("Ending date should be greater than the starting date.");
          inputRef2.current.focus();
          return true; // Return true if alert was triggered
        }
      }
      return false; // Return false if no alert was triggered
    };

    if (!isFocused) {
      const alertTriggered = validateInput();
      if (alertTriggered) {
        return; // Exit early if an alert was triggered
      }
    }
  }, [isFocused]);

  // }, [isFocused]);

  const inputRef2 = React.useRef(null);

  useEffect(() => {
    const validateInput = () => {
      if (inputValue.trim() !== "") {
        const isValidDate = /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue);
        if (!isValidDate) {
          // If the entered date format is incorrect and input is not empty, display an error message
          alert("Please enter a date in the yyyy/mm/dd format.");
          inputRef.current.focus();
          return;
        }
      }
    };

    if (!isFocused) {
      validateInput();
    }
  }, [inputValue, isFocused]);

  const inputRef = React.useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInputFocus2 = () => {
    setIsFocused(true);
  };

  const handleInputBlur2 = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  const showTab = (n) => {
    const x = document.getElementsByClassName("tab");

    if (x.length > 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[n].style.display = "block";
    }

    // if (n === 0) {
    //   prevBtn.style.display = "none";
    // } else {
    //   prevBtn.style.display = "inline";
    // }

    if (n === x.length - 1) {
      isFinalStep = true;
      console.log(isFinalStep);
      console.log("hi");
      document.getElementById("nextBtn").innerHTML = "Post";
    } else {
      isFinalStep = false;
      document.getElementById("nextBtn").innerHTML = "Next";
    }

    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    const x = document.getElementsByClassName("tab");
    if (n === 1 && !validateForm()) return false;

    if (currentTab >= 0 && currentTab < x.length) {
      x[currentTab].style.display = "none";
    }

    setCurrentTab(currentTab + n);

    if (currentTab >= x.length) {
      document.getElementById("nextprevious").style.display = "none";
      document.getElementById("all-steps").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("text-message").style.display = "block";
      return;
    }
    showTab(currentTab);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    if (document.getElementById("nextBtn").innerHTML == "Post") {
      handleMongo();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateForm = () => {
    const x = document.getElementsByClassName("tab");
    if (x.length > 0) {
      const y = x[currentTab].getElementsByTagName("input");
      for (let i = 0; i < y.length; i++) {
        if (y[i].value === "") {
          y[i].className += " invalid";
          return false;
        }
      }
      document.getElementsByClassName("step")[currentTab].className +=
        " finish";
    }
    return true;
  };

  const fixStepIndicator = (n) => {
    const x = document.getElementsByClassName("step");
    if (x.length > 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
      }
      x[n].className += " active";
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOptionChange2 = (e) => {
    const newValue = e.target.value; // Get the new value from the event target
    setSelectedOptionAmenities((prevOptions) => {
      if (prevOptions.includes(newValue)) {
        // If the value already exists in the array, remove it
        return prevOptions.filter((option) => option !== newValue);
      } else {
        // If the value does not exist in the array, add it
        return [...prevOptions, newValue];
      }
    });
  };

  const handleMongo = async () => {
    const usersa = user.uid;
    const addressBox = document.getElementById("addressBox").value;
    const buildgingName = document.getElementById("buildingNameBox").value;
    const initial_Deposit = document.getElementById("Initial_Deposit").value;
    const monthlyRent = document.getElementById("Monthly_Rent").value;
    const bedRooms = document.getElementById("bedRooms").value;
    const timePeriod = document.getElementById("Time_Period").value;
    const first = document.getElementById("firsts").value;
    const last = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const description = document.getElementById("description").value;
    const Starting_Date = document.getElementById("Starting_Date").value;
    const Ending_Date = document.getElementById("Ending_Date").value;
    const radio = document.querySelector('input[name="radio"]:checked').value;
    const checkboxes = document.querySelectorAll(
      'input[name="checkbox"]:checked'
    );
    const radio2 = Array.from(checkboxes).map((checkbox) => checkbox.value);
    const roomisIn = roomsFor;
    let searchData;
    try {
      const inputValue = addressBox;
      if (inputValue.trim() !== "") {
        if (inputValue.toUpperCase() != "UBC") {
          const response = await fetch(
            `https://ubc-sublet.onrender.com/search?q=${inputValue + " UBC"}`
          );
          searchData = await response.json();
          // setData(searchData);
        } else {
          const response = await fetch(
            `https://ubc-sublet.onrender.com/search?q=${inputValue}`
          );
          searchData = await response.json();
          // setData(searchData);
        }
      } else {
        // setData({ latitude: 49.26060520000001, longitude: -123.2459939 }); // set data state values for ubc
      }
    } catch (error) {
      console.error("Error:", error);
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    // Format the date as needed (e.g., YYYY-MM-DD)
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    let b = false;
    let c = false;
    let d = false;
    let e = false;
    radio2.forEach((data) => {
      // Update variables based on checkbox selection
      if (data == "Furnished") {
        b = true;
      } else if (data == "Utilities") {
        c = true;
      } else if (data == "Utensils") {
        d = true;
      } else if (data == "Wifi") {
        e = true;
      }
    });

    const formData = {
      location: {
        currentLocation: addressBox,
        buildingNumber: buildgingName,

        latitude: searchData.latitude,
        longitude: searchData.longitude,
      },
      user_id: usersa,
      rooms: roomisIn,
      pricing: {
        initialDeposit: initial_Deposit,
        monthlyRent: monthlyRent,
      },
      numberOfRoomsAvailable: bedRooms,
      timePeriod: timePeriod,
      contactInformation: {
        name: first + last,
        email: email,
      },
      description: description,
      dateAdding: formattedDate,
      startingSubletDate: Starting_Date,
      endingSubletDate: Ending_Date,
      roomType: radio,
      amenities: {
        furnished: b,
        utilities: c,
        utensile: d,
        wifi: e,
      },
    };
    console.log("done");
    try {
      const response = await fetch("https://ubc-sublet.onrender.com/sublets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form data saved successfully");
        window.scrollTo(0, 0);
        return navigate("/");
      } else {
        console.error("Failed to save form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <form id="regForm">
            <h1 id="register"> </h1>
            <div className="all-steps" id="all-steps">
              <span className="step"></span> <span className="step"></span>
              <span className="step"></span> <span className="step"></span>
            </div>
            <div className="tab">
              <h3 className="heading">What type of property is this? :</h3>
              <label className="container1">
                Two bedroom
                <input
                  type="radio"
                  name="radio"
                  value="2BA"
                  checked={selectedOption === "2BA"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                Four bedroom
                <input
                  type="radio"
                  name="radio"
                  value="4BA"
                  checked={selectedOption === "4BA"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                Six bedroom
                <input
                  type="radio"
                  name="radio"
                  value="6BA"
                  checked={selectedOption === "6BA"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                Shared two bedroom
                <input
                  type="radio"
                  name="radio"
                  value="Shared Two Bedroom"
                  checked={selectedOption === "Shared Two Bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                Studio
                <input
                  type="radio"
                  name="radio"
                  value="Studio"
                  checked={selectedOption === "Studio"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                Apartment
                <input
                  type="radio"
                  name="radio"
                  value="Apartment"
                  checked={selectedOption === "Apartment"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <div className="boxes">
                <label className="address"> Building Name </label>
                <input
                  type="text"
                  placeholder="Eg: Brock Commons North Tower"
                  id="addressBox"
                  onInput={(e) => (e.target.className = "")}
                  name="addressBox"
                />

                <label className="buildingName"> Floor </label>
                <input
                  type="text"
                  placeholder="Eg: 14"
                  id="buildingNameBox"
                  onInput={(e) => (e.target.className = "")}
                  name="buildingNameBox"
                />

                <label className="bedRooms">No. of bedrooms for sublet</label>
                <input
                  type="text"
                  placeholder="Eg: 1"
                  id="bedRooms"
                  onInput={(e) => (e.target.className = "")}
                  name="bedRooms"
                />

                <label className="bathRooms">Total no. of bathrooms</label>
                <input
                  type="text"
                  placeholder="Eg: 2"
                  id="bathRooms"
                  onInput={(e) => (e.target.className = "")}
                  name="bathRooms"
                />

                <label className="amenities"> Amenities :</label>
                <label className="container2">
                  Furnished
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="Furnished"
                    checked={selectedOptionAmenities.includes("Furnished")}
                    onChange={handleOptionChange2}
                  />
                </label>
                <label className="container2">
                  Utilities
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="Utilities"
                    checked={selectedOptionAmenities.includes("Utilities")}
                    onChange={handleOptionChange2}
                  />
                </label>
                <label className="container2">
                  Utensils
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="Utensils"
                    checked={selectedOptionAmenities.includes("Utensils")}
                    onChange={handleOptionChange2}
                  />
                </label>
                <label className="container2">
                  Wifi
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="Wifi"
                    checked={selectedOptionAmenities.includes("Wifi")}
                    onChange={handleOptionChange2}
                  />
                </label>

                <label className="description"> Description </label>
                <textarea
                  type="text"
                  placeholder="Describe your house and its speciality, for instance, floor number and/or any condtions/rules you have."
                  id="description"
                  onInput={(e) => (e.target.className = "")}
                  name="description"
                />
              </div>
            </div>
            <div className="tab">
              <div className="headings2"> Share your contact information</div>
              <p className="firstName">
                <input
                  placeholder="First Name"
                  id="firsts"
                  onInput={(e) => (e.target.className = "")}
                  name="firsts"
                />
              </p>
              <p className="lastName">
                <input
                  placeholder="Last Name"
                  id="last"
                  onInput={(e) => (e.target.className = "")}
                  name="last"
                />
              </p>
              <p className="email">
                <input
                  placeholder="Email"
                  id="email"
                  onInput={(e) => (e.target.className = "")}
                  name="email"
                />
              </p>
              <p className="phone">
                <input
                  placeholder="Phone"
                  id="phone"
                  onInput={(e) => (e.target.className = "")}
                  name="phone"
                />
              </p>
            </div>
            <div className="tab">
              <div className="headings2"> Step 3 Property info </div>
              <p className="Initial_Deposit">
                <input
                  placeholder="Initial Deposit (if any)"
                  id="Initial_Deposit"
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replace(/\D/g, "");
                    e.target.value = sanitizedValue;
                  }}
                  name="Initial_Deposit"
                />
              </p>
              <p className="Monthly_Rent">
                <input
                  placeholder="Monthly Rent"
                  id="Monthly_Rent"
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replace(/\D/g, "");
                    e.target.value = sanitizedValue;
                  }}
                  name="Monthly_Rent"
                />
              </p>
              <p className="Starting_Date">
                {" "}
                <input
                  placeholder="From (yyyy/mm/dd)"
                  id="Starting_Date"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  ref={inputRef}
                  name="Starting_Date"
                  value={inputValue}
                />
              </p>
              <p className="Ending_Date">
                {" "}
                <input
                  placeholder="To (yyyy/mm/dd)"
                  id="Ending_Date"
                  onChange={handleInputChange2}
                  onFocus={handleInputFocus2}
                  onBlur={handleInputBlur2}
                  ref={inputRef2}
                  name="Ending_Date"
                />
              </p>
              <p className="Time_Period">
                {" "}
                <input
                  placeholder="Time period (months)"
                  id="Time_Period"
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove any non-numeric characters
                    e.target.value = sanitizedValue; // Update the input value with the sanitized value/
                  }}
                  name="Time Period"
                />
              </p>
            </div>
            <div className="tab">
              <div className="headings2"> Step 3- Photos (atleast 5) </div>
              <UploadImages setRooms={setRooms} />
            </div>
            <div className="">
              <div className="buttons-wrapper">
                <button
                  type="button"
                  id="prevBtn"
                  onClick={() => {
                    handlePrevious();
                    nextPrev(-1);
                  }}
                  className="btn btn-primary mr-2"
                >
                  Previous
                </button>
                <button
                  type="button"
                  id="nextBtn"
                  onClick={() => {
                    {
                      handleNext();
                      nextPrev(1);
                    }
                  }}
                  className="btn btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
