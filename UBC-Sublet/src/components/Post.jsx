import { useState, useEffect } from "react";
import "./post.css"; // Import your CSS file

export default function Post() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  const showTab = (n) => {
    const x = document.getElementsByClassName("tabPost");
    if (x.length > 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[n].style.display = "block";
    }

    const prevBtn = document.getElementById("prevBtnPost");
    const nextBtn = document.getElementById("nextBtnPost");

    if (n === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "inline";
    }

    if (n === x.length - 1) {
      nextBtn.innerHTML = "Submit";
    } else {
      nextBtn.innerHTML = "Next";
    }

    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    const x = document.getElementsByClassName("tabPost");
    if (n === 1 && !validateForm()) return false;

    if (currentTab >= 0 && currentTab < x.length) {
      x[currentTab].style.display = "none";
    }

    setCurrentTab(currentTab + n);

    if (currentTab >= x.length) {
      document.getElementById("nextprevious").style.display = "none";
      document.getElementById("all-stepsPost").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("thanks-messagePost").style.display = "block";
      return;
    }

    showTab(currentTab);
  };

  const validateForm = () => {
    const x = document.getElementsByClassName("tabPost");
    if (x.length > 0) {
      const y = x[currentTab].getElementsByTagName("input");
      for (let i = 0; i < y.length; i++) {
        if (y[i].value === "") {
          y[i].className += " invalid";
          return false;
        }
      }
      document.getElementsByClassName("stepPost")[currentTab].className +=
        " finish";
    }
    return true;
  };

  const fixStepIndicator = (n) => {
    const x = document.getElementsByClassName("stepPost");
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

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <form id="regFormPost">
            <h1 className="post" id="register">
              {" "}
            </h1>
            <div className="all-stepsPost" id="all-stepsPost">
              <span className="stepPost"></span>{" "}
              <span className="stepPost"></span>{" "}
              <span className="stepPost"></span>{" "}
              <span className="stepPost"></span>{" "}
            </div>
            <div className="tabPost">
              <h3 className="headingPost">What type of property is this? :</h3>
              <label className="container1Post">
                Two-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="two-bedroom"
                  checked={selectedOption === "two-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>
              <label className="container1Post">
                Four-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="four-bedroom"
                  checked={selectedOption === "four-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>
              <label className="container1Post">
                Six-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="six-bedroom"
                  checked={selectedOption === "six-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>
              <label className="container1Post">
                Shared-Two-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="shared-two-bedroom"
                  checked={selectedOption === "shared-two-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>
              <label className="container1Post">
                Studio
                <input
                  type="radio"
                  name="radio"
                  value="studio"
                  checked={selectedOption === "studio"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>
              <label className="container1Post">
                Apartment
                <input
                  type="radio"
                  name="radio"
                  value="apartment"
                  checked={selectedOption === "apartment"}
                  onChange={handleOptionChange}
                />
                <span className="checkmarkPost"></span>
              </label>

              <label className="addressPost"> Address </label>
              <input
                type="text"
                placeholder="Building + UBC"
                id="addressBoxPost"
                onInput={(e) => (e.target.className = "")}
                name="address"
              />
              <label className="buildingNamePost"> Building Name </label>
              <input
                type="text"
                placeholder="Name eg North Tower"
                id="buildingNameBoxPost"
                onInput={(e) => (e.target.className = "")}
                name="address"
              />

              <label className="bedRoomsPost"> Bedrooms </label>
              <input
                type="text"
                placeholder="eg. 4"
                id="bedRoomsPost"
                onInput={(e) => (e.target.className = "")}
                name="bedrooms"
              />

              <label className="bathRoomsPost"> Bathrooms </label>
              <input
                type="text"
                placeholder="eg. 2"
                id="bathRoomsPost"
                onInput={(e) => (e.target.className = "")}
                name="bathRooms"
              />

              <div className="tabPost">
                <div className="headings2Post">
                  {" "}
                  Share your contact information
                </div>
                <p className="firstNamePost">
                  <input
                    placeholder="First Name"
                    id="firstsPost"
                    onInput={(e) => (e.target.className = "")}
                    name="firsts"
                  />
                </p>
                <p className="lastNamePost">
                  <input
                    placeholder="Last Name"
                    id="lastPost"
                    onInput={(e) => (e.target.className = "")}
                    name="last"
                  />
                </p>
                <p className="emailPost">
                  <input
                    placeholder="Email"
                    id="emailPost"
                    onInput={(e) => (e.target.className = "")}
                    name="email"
                  />
                </p>
                <p className="phonePost">
                  <input
                    placeholder="Phone"
                    id="phonePost"
                    onInput={(e) => (e.target.className = "")}
                    name="phone"
                  />
                </p>
              </div>
            </div>
            <div style={{ overflow: "auto" }} id="nextprevious">
              <div style={{ float: "right" }}>
                <button
                  type="button"
                  id="prevBtnPost"
                  onClick={() => nextPrev(-1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  id="nextBtnPost"
                  onClick={() => nextPrev(1)}
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
