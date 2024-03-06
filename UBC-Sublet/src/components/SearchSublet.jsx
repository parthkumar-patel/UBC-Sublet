import React, { useState, useEffect } from "react";
// import React from 'react';
import { useLocation } from 'react-router-dom';


export default function SearchList() {
    // const [latitudeData, setLatitude] = useState([]);
    // const [longitudeData, setLongitude] = useState([]);
    const [entireData, setentireData] = useState([]);
    const [conditionalData, setconditionalData] = useState([]);
    const location = useLocation();
    // Extract latitude and longitude from the state object
    const { latitude, longitude } = location.state;
    // console.log('Latitude:', latitude);
    // console.log('Longitude:', longitude);
    useEffect(() => {
        getLocationCordinates()
    }, []);
    function getLocationCordinates() {
        fetch('http://localhost:3001/subletslist', {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            setentireData(data);
        })
    }
    useEffect(() => {
        entireData.forEach(data => {
            const latitudes = data.location.map(loc => loc.latitude);
            if (Math.abs(latitudes - latitude <= 0.005)) {
                setconditionalData(data);
            }
        });
        entireData.forEach(data => {
            // console.log(data);
            const longitudes = data.location.map(loc => loc.longitude);
            if (Math.abs(longitudes - longitude <= 0.005)) {
                setconditionalData(data);
            }
        });
    },  [entireData]);

    return ( 
        <div> 
            
        </div>
    );
}