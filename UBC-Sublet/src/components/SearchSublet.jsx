// import { isEmpty } from "@firebase/util";
import { useState, useEffect } from "react";
// import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchSublet() {
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
            const longitudes = data.location.map(loc => loc.longitude);
            if (Math.abs(latitudes - latitude) <= 0.005 && Math.abs(longitudes - longitude) <= 0.005) {
                setconditionalData([data]);
            }
        });
    },  [entireData]);
    
    return (
        conditionalData.length == 0 ? 
        <div className="position-absolute top-50 start-50 translate-middle">
            <h1> No search results found </h1>
        </div> 
        :
        <div className="featuredITems">
                <h1 style = {{
                marginTop: '350px',
                marginLeft: '210px',
                fontSize: '40px',
                fontWeight: 'bold',
                fontFamily: 'Archivo Black'
            }}> Sublets in UBC</h1>
            
            {conditionalData.map((items, index) => (
                    <div key = {index} className="card"
                    style={{
                        marginLeft: '200px'
                    }}>
                    {items.rooms.map((singleImage, imageIndex) => (
                        <div key ={imageIndex} className = "img">
                            <img src={singleImage} alt="pic" width="170px"/>
                        </div>
                    ))} 
                    <div className="card--stats">
                        <div className = "firstElement"> <h6> {items.roomType} </h6> </div>
                        <div> {items.location.currentLocation} </div>
                    </div>
                </div>                            
            ))}
            <div>
                <h2 style = {{ marginLeft: '-175px', marginTop: '-335px', position: 'absolute', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Archivo Black'}}> Filters </h2>
                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '-200px',
                    marginTop: '20px'
                }}> Newest </button>

                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '10px',
                    marginTop: '20px',
                    position: 'absolute'
                }}> Oldest </button>

                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '-80px',
                    marginTop: '70px',
                    position: 'absolute'
                }}> Lowest Price </button>

                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '50px',
                    marginTop: '70px',
                    position: 'absolute'
                }}> Highest Price </button>
                 
                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '-80px',
                    marginTop: '120px',
                    position: 'absolute'
                }}> Shortest Lease </button>

                <button type="button" className="btn btn-outline-secondary"
                style = {{
                    marginLeft: '-80px',
                    marginTop: '170px',
                    position: 'absolute'
                }}> Longest Lease </button>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '230px',
                    position: 'absolute',
                    marginLeft: '-80px',
                    fontSize: '15px'
                }}> Price  </label>
                <input type="range" className="form-range" min= '0'
                    max= '1000' id="customRange2"
                style = {{
                    maxInlineSize: '300px',
                    marginTop: '255px',
                    marginLeft: '-80px',
                    position: 'absolute',
                }}/>
            </div>
        </div>
    )
}