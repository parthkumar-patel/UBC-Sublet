import React, { useState, useEffect } from "react";
import "./post.css";

// export default function Post() {
//     const [currentTab, setCurrentTab] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(""); // State to manage selected radio button
//     const [inputValue, setInputValue] = useState('');
//     const [isFocused, setIsFocused] = useState(false);
//     const [inputValue2, setInputValue2] = useState('');
//     const [currentStep, setCurrentStep] = useState(0);

//     useEffect(() => {
//         const validateInput = () => {
//             if (inputValue2.trim() !== '') {
//                 const isValidDate = /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue2);
//                 const isLaterDate = inputValue2 > inputValue;
//                 if (!isValidDate) {
//                     alert("Please enter a date in the yyyy/mm/dd format.");
//                     inputRef2.current.focus();
//                     return true; // Return true if alert was triggered
//                 } else if (!isLaterDate) {
//                     alert("Ending date should be greater than the starting date.");
//                     inputRef2.current.focus();
//                     return true; // Return true if alert was triggered
//                 }
//             }
//             return false; // Return false if no alert was triggered
//         };

//         if (!isFocused) {
//             const alertTriggered = validateInput();
//             if (alertTriggered) {
//                 return; // Exit early if an alert was triggered
//             }
//         }
//     }, [isFocused]);

//     // }, [isFocused]);

//     const inputRef2 = React.useRef(null);

//     useEffect(() => {
//         const validateInput = () => {
//             if (inputValue.trim() !== '') {
//                 const isValidDate = /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue);
//                 if (!isValidDate) {
//                     // If the entered date format is incorrect and input is not empty, display an error message
//                     alert("Please enter a date in the yyyy/mm/dd format.");
//                     inputRef.current.focus();
//                     return;
//                 }
//             }
//         };

//         if (!isFocused) {
//             validateInput();
//         }
//     }, [inputValue, isFocused]);

//     const inputRef = React.useRef(null);

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleInputFocus = () => {
//         setIsFocused(true);
//     };

//     const handleInputBlur = () => {
//         setIsFocused(false);
//     };

//     const handleInputChange2 = (e) => {
//         setInputValue2(e.target.value)
//     };

//     const handleInputFocus2 = () => {
//         setIsFocused(true);
//     };

//     const handleInputBlur2 = () => {
//         setIsFocused(false);
//     };

//     useEffect(() => {
//         showTab(currentTab);
//     }, [currentTab]);

//     const showTab = (n) => {
//         const x = document.getElementsByClassName("tab");
//         if (x.length > 0) {
//             for (let i = 0; i < x.length; i++) {
//                 x[i].style.display = "none";
//             }
//             x[n].style.display = "block";
//         }

//         const prevBtn = document.getElementById("prevBtn");
//         const nextBtn = document.getElementById("nextBtn");

//         if (n === 0) {
//             prevBtn.style.display = "none";
//         } else {
//             prevBtn.style.display = "inline";
//         }

//         if (n === (x.length - 1)) {
//             nextBtn.innerHTML = "Submit";
//         } else {
//             nextBtn.innerHTML = "Next";
//         }

//         fixStepIndicator(n);
//     }

//     const nextPrev = (n) => {
//         const x = document.getElementsByClassName("tab");
//         if (n === 1 && !validateForm()) return false;

//         if (currentTab >= 0 && currentTab < x.length) {
//             x[currentTab].style.display = "none";
//         }

//         setCurrentTab(currentTab + n);

//         if (currentTab >= x.length) {
//             document.getElementById("nextprevious").style.display = "none";
//             document.getElementById("all-steps").style.display = "none";
//             document.getElementById("register").style.display = "none";
//             document.getElementById("text-message").style.display = "block";
//             return;
//         }
//         showTab(currentTab);
//     }

//     const handleNext = () => {
//         // Logic to handle next step
//         setCurrentStep(currentStep + 1);
//     };

//     // Function to handle "Previous" button click
//     const handlePrevious = () => {
//         // Logic to handle previous step
//         setCurrentStep(currentStep - 1);
//     };

//     const nextButtonId = `nextBtn${currentStep}`;
//     const prevButtonId = `prevBtn${currentStep}`;

//     const validateForm = () => {
//         const x = document.getElementsByClassName("tab");
//         if (x.length > 0) {
//             const y = x[currentTab].getElementsByTagName("input");
//             for (let i = 0; i < y.length; i++) {
//                 if (y[i].value === "") {
//                     y[i].className += " invalid";
//                     return false;
//                 }
//             }
//             document.getElementsByClassName("step")[currentTab].className += " finish";
//         }
//         return true;
//     }

//     const fixStepIndicator = (n) => {
//         const x = document.getElementsByClassName("step");
//         if (x.length > 0) {
//             for (let i = 0; i < x.length; i++) {
//                 x[i].className = x[i].className.replace(" active", "");
//             }
//             x[n].className += " active";
//         }
//     }

//     const handleOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row d-flex justify-content-center align-items-center">
//                 <div className="col-md-6" >
//                     <form id="regForm">
//                         <h1 id="register"> </h1>
//                         <div className="all-steps" id="all-steps"> <span className="step"></span> <span className="step"></span> <span className="step"></span> <span className="step"></span> </div>
//                         <div className="tab">
//                             <h3 className = "heading">What type of property is this? :</h3>
//                                 <label className="container1"> Two-Bedroom
//                                 <input type="radio" name="radio" value="two-bedroom" checked={selectedOption === "two-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="container1"> Four-Bedroom
//                                 <input type="radio" name="radio" value="four-bedroom" checked={selectedOption === "four-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="container1"> Six-Bedroom
//                                 <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="container1"> Shared-Two-Bedroom
//                                 <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="container1"> Studio
//                                 <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="container1"> Apartment
//                                 <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
//                                 <span className="checkmark"></span>
//                             </label>
//                             <label className="address"> Address </label>
//                             <input type="text" placeholder="Building + UBC" id = "addressBox" onInput={(e) => e.target.className = ''} name="address" />

//                             <label className="buildingName"> Building Name </label>
//                             <input type="text" placeholder="Name eg North Tower" id = "buildingNameBox" onInput={(e) => e.target.className = ''} name="address" />

//                             <label className="bedRooms"> Bedrooms </label>
//                             <input type="text" placeholder="eg. 4" id = "bedRooms" onInput={(e) => e.target.className = ''} name="bedrooms" />

//                             <label className="bathRooms"> bathRooms </label>
//                             <input type="text" placeholder="eg. 2" id = "bathRooms" onInput={(e) => e.target.className = ''} name="bathRooms" />

//                             <label className="description"> Description </label>
//                             <input type="text" placeholder="What do you want to say?" id = "description" onInput={(e) => e.target.className = ''} name="description" />

//                         </div>
//                         <div className="tab"> <div className = "headings2"> Share your contact information</div>
//                             <p className='firstName'><input placeholder="First Name" id = "firsts" onInput={(e) => e.target.className = ''} name="firsts" /></p>
//                             <p className='lastName'><input placeholder="Last Name" id = "last" onInput={(e) => e.target.className = ''} name="last" /></p>
//                             <p className='email'><input placeholder="Email" id = "email" onInput={(e) => e.target.className = ''} name="email" /></p>
//                             <p className='phone'><input placeholder="Phone" id = "phone" onInput={(e) => e.target.className = ''} name="phone" /></p>
//                         </div>

//                         <div className="tab"> <div className = "headings3"> Step 3 Property info </div>
//                             <p className='Initial_Deposit'> <input placeholder="Initial Deposit" id = "Initial_Deposit" onInput={(e) => {const inputValue = e.target.value;
//                                                                                                                           const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove any non-numeric characters
//                                                                                                                          e.target.value = sanitizedValue; // Update the input value with the sanitized value/
//                                                                                                                         }} name="Initial_Deposit" /></p>
//                             <p className='Monthly_Rent'><input placeholder="Monthly Rent" id = "Monthly_Rent" onInput={(e) => {const inputValue = e.target.value;
//                                                                                                                           const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove any non-numeric characters
//                                                                                                                          e.target.value = sanitizedValue;}} name="Monthly_Rent" /></p>
//                             <p className='Starting_Date'> <input placeholder="yyyy/mm/dd format" id = "Starting_Date"  onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur}  ref={inputRef} name="Starting_Date" value={inputValue} /></p>
//                             <p className='Ending_Date'> <input placeholder="yyyy/mm/dd format" id = "Ending_Date" onChange={handleInputChange2} onFocus={handleInputFocus2} onBlur={handleInputBlur2}  ref={inputRef2} name="Ending_Date" /></p>
//                             <p className='Time_Period'> <input placeholder="Time period in integers eg. 4, 5" id = "Time_Period" onInput={(e) =>  {const inputValue = e.target.value;
//                                                                                                                           const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove any non-numeric characters
//                                                                                                                          e.target.value = sanitizedValue; // Update the input value with the sanitized value/
//                                                                                                                         }} name="Time Period" /></p>
//                         </div>

//                          <div className="thanks-message text-center" id="text-message">
//                             <h3>Thanks for your submission!</h3> <span>Your submission has been entered! We will contact you shortly!</span>
//                         </div>

//                         <div className="row">
//                         <div className="row mt-3">
//                             <div className="col-md-6">
//                                 <button type="button" id="prevBtn" onClick={() => {handlePrevious(); nextPrev(-1)}} className="btn btn-primary mr-2">Previous</button>
//                                 <button type="button" id="nextBtn" onClick={() => {{handleNext(); nextPrev(1)}}} className="btn btn-primary">Next</button>
//                             </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function Post() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(""); // State to manage selected radio button
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue2, setInputValue2] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <form id="regForm">
            <h1 id="register"> </h1>
            <div className="all-steps" id="all-steps">
              {" "}
              <span className="step"></span> <span className="step"></span>{" "}
              <span className="step"></span> <span className="step"></span>{" "}
            </div>
            <div className="tab">
              <h3 className="heading">What type of property is this? :</h3>
              <label className="container1">
                {" "}
                Two-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="two-bedroom"
                  checked={selectedOption === "two-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                {" "}
                Four-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="four-bedroom"
                  checked={selectedOption === "four-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                {" "}
                Six-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="six-bedroom"
                  checked={selectedOption === "six-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                {" "}
                Shared-Two-Bedroom
                <input
                  type="radio"
                  name="radio"
                  value="six-bedroom"
                  checked={selectedOption === "six-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                {" "}
                Studio
                <input
                  type="radio"
                  name="radio"
                  value="six-bedroom"
                  checked={selectedOption === "six-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container1">
                {" "}
                Apartment
                <input
                  type="radio"
                  name="radio"
                  value="six-bedroom"
                  checked={selectedOption === "six-bedroom"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
              </label>
              <label className="address"> Address </label>
              <input
                type="text"
                placeholder="Building + UBC"
                id="addressBox"
                onInput={(e) => (e.target.className = "")}
                name="address"
              />

              <label className="buildingName"> Building Name </label>
              <input
                type="text"
                placeholder="Name eg North Tower"
                id="buildingNameBox"
                onInput={(e) => (e.target.className = "")}
                name="address"
              />

              <label className="bedRooms"> Bedrooms </label>
              <input
                type="text"
                placeholder="eg. 4"
                id="bedRooms"
                onInput={(e) => (e.target.className = "")}
                name="bedrooms"
              />

              <label className="bathRooms"> bathRooms </label>
              <input
                type="text"
                placeholder="eg. 2"
                id="bathRooms"
                onInput={(e) => (e.target.className = "")}
                name="bathRooms"
              />

              <label className="description"> Description </label>
              <input
                type="text"
                placeholder="What do you want to say?"
                id="description"
                onInput={(e) => (e.target.className = "")}
                name="description"
              />
            </div>
            <div className="tab">
              {" "}
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
              {" "}
              <div className="headings3"> Step 3 Property info </div>
              <p className="Initial_Deposit">
                {" "}
                <input
                  placeholder="Initial Deposit"
                  id="Initial_Deposit"
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove any non-numeric characters
                    e.target.value = sanitizedValue; // Update the input value with the sanitized value/
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
                    const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove any non-numeric characters
                    e.target.value = sanitizedValue;
                  }}
                  name="Monthly_Rent"
                />
              </p>
              <p className="Starting_Date">
                {" "}
                <input
                  placeholder="yyyy/mm/dd format"
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
                  placeholder="yyyy/mm/dd format"
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
                  placeholder="Time period in integers eg. 4, 5"
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

            {/* Content of your form */}
            <div className="row mt-3">
              <div className="col-md-6">
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
                    handleNext();
                    nextPrev(1);
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
