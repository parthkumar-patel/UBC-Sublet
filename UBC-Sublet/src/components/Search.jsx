import homepage from "../assets/pic2 3.jpg";
import SearchIcon from "../assets/search.svg"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// import { useHistory } from 'react-router-dom';

// import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U"

export default function Search() {
    const navigate = useNavigate();
    const [data, setData] = useState({ latitude: '', longitude: '' });
    const [place, setPlace] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
  
    const handlePlaceChange = async(e) => {
        try {
            const inputValue = e.target.value;
            // Only fetch data if input value is not empty
            if (inputValue.trim() !== '') {
              const response = await fetch(`http://localhost:3001/search?q=${inputValue}`);
              const searchData = await response.json();
              console.log(searchData);
              setData(searchData);
              //setData(searchData);
            } else {
              // Clear latitude and longitude when input value is empty
              setData({ latitude: '', longitude: '' }); // Clear data state if input is empty

            }
                  // Handle the response data here
            // const predictions = response.data.predictions;
            // for (const prediction of predictions) {
            //     // Extract place ID
            //     const placeId = prediction.place_id;


            //     // Fetch details of the place using Place Details API
            //     const placeDetails = response.data.predictions;
    
            //     // Extract coordinates from placeDetails.geometry.location
            //     if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
            //         const { lat, lng } = placeDetails.geometry.location;
            //         console.log(lat);
            //         console.log(lng);
            //     }
            
        } catch (error) {
            console.error('Error:', error);
        } 
    }
    console.log(data.latitude);
    console.log(data.longitude);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/searchSublet", {
            state: { latitude: data.latitude, longitude: data.longitude }
        })
    }
 
 

    // console.warn("result return here", place)
    return (
        <div style={{ marginTop: '-40px', display: 'flex' }} className="">
            <img src={homepage} className="img-fluid img-thumbnail" 
                style={{
                    width: '100%', 
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)', 
                    filter: 'contrast(110%)' 
                }} 
                alt="Homepage"
            />
            <form className="d-flex" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-82%, 112%)',
                // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                width: 'calc(100% - 20px)', // Adjusted width for smaller screens
                // maxWidth: '1024px',
                maxWidth: '600px',
                margin: 'auto' // Center the form horizontally
            }}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search by address or neighbourhood" 
                    aria-label="Search by address or neighbourhood" 
                    onChange={handlePlaceChange}
                    style={{ 
                        backgroundImage: `url(${SearchIcon})`, 
                        backgroundPosition: '10px center', 
                        backgroundRepeat: 'no-repeat', 
                        borderRadius: '30px',
                        paddingLeft: '40px',
                    }} 
                />
                <button className="btn btn-primary" type="submit"
                onClick={handleSubmit}
                    style ={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        marginLeft : '-85px',
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px'
                    }} >
                    Search</button>
            </form>
            {/* <GoogleComponent
                // apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                //   locationBoxStyle={'custom-style'}
                //   locationListStyle={'custom-style-list'}
                onChange={handlePlaceChange} /> */}
        </div>
    )
}