// import { useState } from "react";
import pic from "../assets/pic2.jpg"
import "../App.css"
import React, { useState, useEffect } from "react";
export default function Card() {
    const [allImage, setAllImage] = useState([]);
    useEffect(() => {
        getImage()
    },[])
    console.log("did it");
    // const [isChecked, setIsChecked] = useState(true);

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    // };
    function getImage() {
        fetch("http://localhost:3001/subletslist", {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setAllImage(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
        console.log("did it");
    }
    return (
        <div>
            <div className="featuredITems"> Featured sublets
            </div>
            <div class = "cards-list">
            {allImage.map((item, index) => (
                <div key={index} className="card">
                    {item.rooms.map((eachImage, index) => (
                        <div key ={index} class = "img">
                            <img src={eachImage} alt="pic" width="170px" />
                            <div className="card--stats">
                                <div class = "firstElement"> <h6> {item.roomType} </h6> </div>
                                <div> {item.location} </div>
                            </div>
                        </div>
                ))}
                </div>
            ))}
        </div>
        </div>
    );
}
        // <label className="save-container mx-4">
        //     <input type="checkbox"
        //         checked={isChecked}
        //         onChange={handleCheckboxChange} />
        //     <svg className="save-regular" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg>
        //     <svg className="save-solid" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
        // </label>

        
