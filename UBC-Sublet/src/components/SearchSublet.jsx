import React, { useState, useEffect } from "react";
// import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchList() {
    const location = useLocation();
    // Extract latitude and longitude from the state object
    const { latitude, longitude } = location.state;
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    return ( 
        <div> 

        </div>
    );
}