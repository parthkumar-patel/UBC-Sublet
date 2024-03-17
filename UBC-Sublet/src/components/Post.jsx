import React, { useState, useEffect } from 'react';
import "./post.css"

export default function Post() {
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedOption, setSelectedOption] = useState(""); // State to manage selected radio button

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

        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        if (n === 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "inline";
        }

        if (n === (x.length - 1)) {
            nextBtn.innerHTML = "Submit";
        } else {
            nextBtn.innerHTML = "Next";
        }

        fixStepIndicator(n);
    }

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
    }

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
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return true;
    }

    const fixStepIndicator = (n) => {
        const x = document.getElementsByClassName("step");
        if (x.length > 0) {
            for (let i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }
            x[n].className += " active";
        }
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <form id="regForm">
                        <h1 id="register"> </h1>
                        <div className="all-steps" id="all-steps"> <span className="step"></span> <span className="step"></span> <span className="step"></span> <span className="step"></span> </div>
                        <div className="tab">
                            <h3 className = "heading">What type of property is this? :</h3>
                                <label className="container1"> Two-Bedroom
                                <input type="radio" name="radio" value="two-bedroom" checked={selectedOption === "two-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container1"> Four-Bedroom
                                <input type="radio" name="radio" value="four-bedroom" checked={selectedOption === "four-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container1"> Six-Bedroom
                                <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container1"> Shared-Two-Bedroom
                                <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container1"> Studio
                                <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container1"> Apartment
                                <input type="radio" name="radio" value="six-bedroom" checked={selectedOption === "six-bedroom"} onChange={handleOptionChange} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="address"> Address </label>
                            <input type="text" placeholder="Building + UBC" id = "addressBox" onInput={(e) => e.target.className = ''} name="address" />

                            <label className="buildingName"> Building Name </label>
                            <input type="text" placeholder="Name eg North Tower" id = "buildingNameBox" onInput={(e) => e.target.className = ''} name="address" />

                            <label className="bedRooms"> Bedrooms </label>
                            <input type="text" placeholder="eg. 4" id = "bedRooms" onInput={(e) => e.target.className = ''} name="bedrooms" />

                            <label className="bathRooms"> bathRooms </label>
                            <input type="text" placeholder="eg. 2" id = "bathRooms" onInput={(e) => e.target.className = ''} name="bathRooms" />


                        </div>
                        <div className="tab"> <div className = "headings2"> Share your contact information</div>
                            <p className='firstName'><input placeholder="First Name" id = "firsts" onInput={(e) => e.target.className = ''} name="firsts" /></p>
                            <p className='lastName'><input placeholder="Last Name" id = "last" onInput={(e) => e.target.className = ''} name="last" /></p>
                            <p className='email'><input placeholder="Email" id = "email" onInput={(e) => e.target.className = ''} name="email" /></p>
                            <p className='phone'><input placeholder="Phone" id = "phone" onInput={(e) => e.target.className = ''} name="phone" /></p>
                        </div>
                         <div className="thanks-message text-center" id="text-message"> <img src="https://i.imgur.com/O18mJ1K.png" width="100" className="mb-4" />
                            <h3>Thanks for your Donation!</h3> <span>Your donation has been entered! We will contact you shortly!</span>
                        </div>
                        <div style={{ overflow: "auto" }} id="nextprevious">
                            <div style={{ float: "right" }}> <button type="button" id="prevBtn" onClick={() => nextPrev(-1)}>Previous</button> <button type="button" id="nextBtn" onClick={() => nextPrev(1)}>Next</button> </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

