import { useState } from "react";
import pic from "../assets/pic2.jpg"
import "../App.css"
import { useState, useEffect } from "react";
export default function Card() {
    const [allImage, setAllImage] = useState([]);
    useEffect(() => {
        getImage()
    },[])
    console.log("did it");
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
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

    const data = {
        index: 1,
        roomImages: "https://firebasestorage.googleapis.com/v0/b/art-gallery-ab57c.appspot.com/o/images%2Fart2.jpeg?alt=media&token=4332dbe5-c103-4e0a-8e69-f95e217b25f6",
        roomType: "Single",
        location: "Orchard Commons",
        price: "1100",
    }  

    return (
        <a href="#house" className="house">
            <div className="carousel-inner">
                <img src="https://firebasestorage.googleapis.com/v0/b/art-gallery-ab57c.appspot.com/o/images%2Fart2.jpeg?alt=media&token=4332dbe5-c103-4e0a-8e69-f95e217b25f6" alt="" 
                    width="200px"/>
                    
            </div>
        </a>
    );
}        