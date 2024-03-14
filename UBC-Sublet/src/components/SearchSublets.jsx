// import { isEmpty } from "@firebase/util";
import { useState, useEffect } from "react";
import "./searchSublet.css";
// import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchSublet() {
    const [entireData, setentireData] = useState([]);
    const [conditionalData, setconditionalData] = useState([]);
    const [conditionalDataInActive, setconditionalDataInActive] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [activeButtons, setActiveButtons] = useState([]);
    const location = useLocation();
    const [priceRange, setPriceRange] = useState(0);
    const [maxpriceRange, setmaxPriceRange] = useState(0);

    const [leaseRange, setLeaseRange] = useState(0);
    const [maxleaseRange, setmaxLeaseRange] = useState(0);

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
        // Create a variable to hold the new data to be added
        let newData = [];
    
        entireData.forEach(data => {
            const latitudes = data.location.map(loc => loc.latitude);
            const longitudes = data.location.map(loc => loc.longitude);
            if (Math.abs(latitudes - latitude) <= 5 && Math.abs(longitudes - longitude) <= 5) {
                newData.push(data); // Add data to the temporary array
            }
        });
    
        // After the loop, update the state with the accumulated data
        setconditionalData(prevData => [...prevData, ...newData]);
        setFilteredData(prevData => [...prevData, ...newData]);
        setconditionalDataInActive(prevData => [...prevData, ...newData]);

    },  [entireData]);

    const handleButtonClick = (buttonId) => {
        if(activeButtons.includes(buttonId)) {
            setActiveButtons(activeButtons.filter(id => id !== buttonId))
        } else {
            setActiveButtons([...activeButtons, buttonId]);
        }
    }

    const handleMaxPriceChange = (e) => {
        setmaxPriceRange(parseInt(e.target.value))
    }

    const handleMaxLeaseChange = (e) => {
        setmaxLeaseRange(parseInt(e.target.value))
    }

    const handlePriceChange = (e) => {
        setPriceRange(parseInt(e.target.value))
    }

    const handleLeaseTermChange = (e) => {
        setLeaseRange(parseInt(e.target.value))
    }

    // const handleTheFilter = (e) => {
        // setconditionalData(conditionalDataInActive);
        //  setFilteredData(conditionalDataInActive);
        // console.log(filteredData);
        // // before the components are rendered initialize it to the main data, or the data it was earlier
        // const filteredButtons = activeButtons.filter(data => data === "Newest");
        // const filteredButtons2 = activeButtons.filter(data => data === "Oldest");
        // const filteredButtons3 = activeButtons.filter(data => data == "Lowest Price");
        // const filteredButtons4 = activeButtons.filter(data => data == "Highest Price");
        // const filterPriceRange = priceRange;
        // const filterLeaseRange = leaseRange;
        // const filtermaxPriceRange = maxpriceRange;
        // const filermaxLeaseRange = maxleaseRange;

        // if (filteredButtons.length > 0) {
        //     const sortedConditionalData = filteredData.slice().sort((a, b) => {
        //         // Split the date strings and construct Date objects
        //         const datePartsA = a.dateAdding.split('/');
        //         const datePartsB = b.dateAdding.split('/');
        //         // Create Date objects with format: day/month/year
        //         const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
        //         const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        //         // Sort in descending order based on the date field
        //         console.log(a.dateAdding);
        //         console.log(b.dateAdding);
        //         return dateB - dateA; // Sorting in descending order
        //     });
    
        //     console.log("done");
        //     setFilteredData(sortedConditionalData);

        // } if (filteredButtons2.length > 0) {
        //     const sortedConditionalData = filteredData.slice().sort((a, b) => {
        //         // Split the date strings and construct Date objects
        //         const datePartsA = a.dateAdding.split('/');
        //         const datePartsB = b.dateAdding.split('/');
        //         // Create Date objects with format: day/month/year
        //         const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
        //         const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        //         // Sort in descending order based on the date field
        //         console.log(a.dateAdding);
        //         console.log(b.dateAdding);
        //         return dateA - dateB; // Sorting in descending order
        //     });
        //     console.log("done");
        //     setFilteredData(sortedConditionalData);

        // }  if (filteredButtons4.length > 0) {
        //     const sortedConditionalData = filteredData.slice().sort((a, b) => {
        //         const pricingA = a.pricing[0].monthlyRent;
        //         const pricingB = b.pricing[0].monthlyRent;
        //         console.log(pricingA);
        //         console.log(pricingB);
        //         return pricingA - pricingB; // Sorting in descending order
        //     });
        //     console.log("done");
        //     setFilteredData(sortedConditionalData);

        // } if (filteredButtons3.length > 0) {
        //     const sortedConditionalData = filteredData.slice().sort((a, b) => {
        //         const pricingA = a.pricing[0].monthlyRent;
        //         const pricingB = b.pricing[0].monthlyRent;
        //         return pricingB - pricingA;
        //     });
        //     setFilteredData(sortedConditionalData);

        // } if (filterPriceRange > 0) {
        //     const sortedConditionalData = filteredData.slice().filter(data => {
        //         console.log(data.pricing[0].monthlyRent);
        //         return  data.pricing.some(price => price.monthlyRent >= priceRange);
        //     });
        //     setFilteredData(sortedConditionalData);
        // }
        // if (filterLeaseRange > 0) {
        //     const sortedConditionalData = filteredData.slice().filter(data => {
        //        return  data.timePeriod >= leaseRange;
        //     });
        //     setFilteredData(sortedConditionalData);
        // } 
        // if (filtermaxPriceRange > 1) {
        //     const sortedConditionalData = filteredData.slice().filter(data => {
        //         return  data.pricing.some(monthlyRent <= maxpriceRange);
        //      });
        //     setFilteredData(sortedConditionalData);
        // } if (filermaxLeaseRange > 1) {
        //     const sortedConditionalData = filteredData.slice().filter(data => {
        //         return  data.timePeriod <= maxleaseRange;
        //      });
        //     setFilteredData(sortedConditionalData);
        // } 
        // else if (filteredButtons.length == 0 && filteredButtons2 == 0 && filteredButtons3 == 0 && filteredButtons4 == 0 && filterPriceRange == 0 && filterLeaseRange == 0 && filtermaxPriceRange == 0 && filermaxLeaseRange == 0) {
        //     setconditionalData(conditionalDataInActive);
        //     return;
        // }
        // setconditionalData(filteredData);
        // const handleTheFilter = (e) => {
            // let filteredData = [...conditionalDataInActive]; // Start with the original data set
        
            
            
            // if (maxpriceRange != 0) {
            // // Apply additional filtering based on price and lease range
            //     filteredData = filteredData.filter(data => data.pricing[0].monthlyRent >= priceRange && data.pricing[0].monthlyRent <= maxpriceRange);
            // } else {
            //     filteredData = filteredData.filter(data => data.pricing[0].monthlyRent >= priceRange);
            // } if (maxleaseRange != 0) {
            //     filteredData = filteredData.filter(data => data.timePeriod >= leaseRange && data.timePeriod <= maxleaseRange);
            // } else {
            //     filteredData = filteredData.filter(data => data.timePeriod >= leaseRange);
            // } 
        
            // setFilteredData(filteredData);
            // setconditionalData(filteredData);

            const handleTheFilter = (e) => {
                let filteredData = [...conditionalDataInActive]; // Start with the original data set
            
                // Determine the primary filter based on the first selected filter
                const primaryFilter = activeButtons[0];

                const sortingFunctions = {
                    "Newest": (a, b) => {
                        // Sorting logic for sorting data by newest date
                        // This function compares two objects based on their dateAdding property
                        // and sorts them in descending order (newest first)
                        const datePartsA = a.dateAdding.split('/');
                        const datePartsB = b.dateAdding.split('/');
                        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
                        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
                        return dateB - dateA;
                    },
                    "Oldest": (a, b) => {
                        // Sorting logic for sorting data by oldest date
                        // This function compares two objects based on their dateAdding property
                        // and sorts them in ascending order (oldest first)
                        const datePartsA = a.dateAdding.split('/');
                        const datePartsB = b.dateAdding.split('/');
                        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
                        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
                        return dateA - dateB;
                    },
                    "Lowest Price": (a, b) => {
                        const pricingA = a.pricing[0].monthlyRent;
                        const pricingB = b.pricing[0].monthlyRent;
                        return pricingA - pricingB;
                    },
                    "Highest Price" : (a, b) => {
                        const pricingA = a.pricing[0].monthlyRent;
                        const pricingB = b.pricing[0].monthlyRent;
                        return pricingB - pricingA; // Sorting in descending order
                    },
                    "Shortest Lease" : (a, b) => {
                        const timePeriodA = a.timePeriod;
                        const timePeriodB = b.timePeriod;
                        return timePeriodA - timePeriodB; // Sorting in descending order
                    },
                    "Longest Lease" : (a, b) => {
                        const timePeriodA = a.timePeriod;
                        const timePeriodB = b.timePeriod;
                        return timePeriodB - timePeriodA; // Sorting in descending order
                    }
                    // Define sorting functions for other filters (e.g., Lowest Price, Highest Price, Shortest Lease, etc.)
                };
                

                // Apply sorting based on the primary filter
                if (primaryFilter) {
                    filteredData = filteredData.slice().sort(sortingFunctions[primaryFilter]);
                }
            
                // Apply secondary filters if more than one button is active
                if (activeButtons.length > 1) {
                    // Divide the sorted data into groups of 4 cards
                    const groups = [];
                    for (let i = 0; i < filteredData.length; i += 4) {
                        groups.push(filteredData.slice(i, i + 4));
                    }
            
                    // Apply the secondary filters to each group of 4 cards
                    const filteredGroups = groups.map(group => {
                        // Apply filters other than the primary filter
                        let filteredGroup = group;
                        activeButtons.slice(1).forEach(filter => {
                            if (sortingFunctions[filter]) {
                                filteredGroup = filteredGroup.sort(sortingFunctions[filter]);
                            }
                        });
                        return filteredGroup;
                    });
            
                    // Combine the filtered groups
                    filteredData = filteredGroups.flat();
                }
            
                // Apply additional filtering based on price and lease range
                if (maxpriceRange != 0) {
                    // Apply additional filtering based on price and lease range
                        filteredData = filteredData.filter(data => data.pricing[0].monthlyRent >= priceRange && data.pricing[0].monthlyRent <= maxpriceRange);
                    } else {
                        filteredData = filteredData.filter(data => data.pricing[0].monthlyRent >= priceRange);
                    } if (maxleaseRange != 0) {
                        filteredData = filteredData.filter(data => data.timePeriod >= leaseRange && data.timePeriod <= maxleaseRange);
                    } else {
                        filteredData = filteredData.filter(data => data.timePeriod >= leaseRange);
                    }             
                // Update state with filtered data
                setFilteredData(filteredData);
                setconditionalData(filteredData);
            };
            
        
    
    
    

    return (
        conditionalData.length == 0 ? 
        <div className="position-absolute top-50 start-50 translate-middle">
            <h1> No search results found, please go back </h1>
        </div>
        :
        <div>
        <div className="featuredITems">
                <h1 style = {{
                marginTop: '-80px',
                marginLeft: '600px',
                fontSize: '40px',
                fontWeight: 'bold',
                fontFamily: 'Archivo Black'
            }}> Sublets in UBC</h1>
            
            {conditionalData.map((items, index) => (
                    <div key = {index} className="card"
                    style={{
                        marginLeft: '400px',
                        marginTop: '100px',
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
            </div>
            <div style = {{ marginTop: '180px' }}>
                <h2 style = {{ marginLeft: '40px', marginTop: '-60px', position: 'absolute', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Archivo Black'}}> Filters </h2>
                <button type="button" className={activeButtons.includes("Newest") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Newest')}}
                style = {{
                    marginLeft: '10px',
                    marginTop: '20px',
                    position: 'relative'
                }}> Newest </button>
                
                <button type="button" className={activeButtons.includes("Oldest") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Oldest')}}
                style = {{
                    marginLeft: '10px',
                    marginTop: '20px',
                    position: 'absolute'
                }}> Oldest </button>
                
                <button type="button" className={activeButtons.includes("Lowest Price") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Lowest Price')}}
                style = {{
                    marginLeft: '-80px',
                    marginTop: '70px',
                    position: 'absolute'
                }}> Lowest Price </button>
                
                <button type="button" className={activeButtons.includes("Highest Price") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Highest Price')}}
                style = {{
                    marginLeft: '50px',
                    marginTop: '70px',
                    position: 'absolute'
                }}> Highest Price </button>
                 
                <button type="button" className={activeButtons.includes("Shortest Lease") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Shortest Lease')}}
                style = {{
                    marginLeft: '-80px',
                    marginTop: '120px',
                    position: 'absolute'
                }}> Shortest Lease </button>
                
                <button type="button" className={activeButtons.includes("Longest Lease") ? "btn btn-dark" : "btn btn-outline-secondary"}
                onClick={() => {handleButtonClick('Longest Lease')}}
                style = {{
                    marginLeft: '-80px',
                    marginTop: '170px',
                    position: 'absolute'
                }}> Longest Lease </button>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '250px',
                    position: 'absolute',
                    marginLeft: '-80px',
                    fontSize: '15px'
                }}> Min Price  </label>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '255px',
                    position: 'absolute',
                    marginLeft: '180px',
                    fontSize: '15px'
                }}> {priceRange}  </label>
                
                <input type="range" className="form-range" min= '0'
                    max= '1000' id="customRange2"
                    onChange={handlePriceChange}
                style = {{
                    maxInlineSize: '300px',
                    marginTop: '275px',
                    marginLeft: '-80px',
                    position: 'absolute',
                }}/>

                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '320px',
                    position: 'absolute',
                    marginLeft: '-80px',
                    fontSize: '15px'
                }}> Max Price  </label>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '320px',
                    position: 'absolute',
                    marginLeft: '180px',
                    fontSize: '15px'
                }}> {maxpriceRange}  </label>
                <input type="range" className="form-range" min = '0'
                    max= '3000' id="customRange2"
                    onChange={handleMaxPriceChange}
                style = {{
                    maxInlineSize: '300px',
                    marginTop: '342px',
                    marginLeft: '-80px',
                    position: 'absolute',
                }}/>


                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '415px',
                    position: 'absolute',
                    marginLeft: '-80px',
                    fontSize: '15px'
                }}>  Min Lease Range  </label>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '415px',
                    position: 'absolute',
                    marginLeft: '180px',
                    fontSize: '15px'
                }}> {leaseRange}  </label>
                <input type="range" className="form-range" min= '0'
                    max= '11' id="customRange2"
                    onChange={handleLeaseTermChange}

                style = {{
                    maxInlineSize: '300px',
                    marginTop: '438px',
                    marginLeft: '-80px',
                    position: 'absolute',
                }}/>

                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '468px',
                    position: 'absolute',
                    marginLeft: '-80px',
                    fontSize: '15px'
                }}> Max Lease Range  </label>
                <label htmlFor="customRange2" className="form-label"
                style = {{
                    marginTop: '468px',
                    position: 'absolute',
                    marginLeft: '180px',
                    fontSize: '15px'
                }}> {maxleaseRange}  </label>
                <input type="range" className="form-range" min= "0"
                    max= '12' id="customRange2"
                    onChange={handleMaxLeaseChange}

                style = {{
                    maxInlineSize: '300px',
                    marginTop: '490px',
                    marginLeft: '-80px',
                    position: 'absolute',
                }}/>



                <button type="button" className="btn btn-primary"
                onClick={handleTheFilter}
                style = {{
                    width: '300px',
                    marginLeft: '-80px',
                    marginTop: '565px',
                    position: 'absolute',
                    weight: 'bold'
                }}> Apply Filters </button>
            </div>
        </div>
        
    )
}