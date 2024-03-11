import CardComponent from "./CardComponent";
import "../App.css"
import { useState, useEffect } from "react";
export default function Card() {
    const [allImage, setAllImage] = useState([]);
    useEffect(() => {
        getImage()
    },[])

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

    // const data = [
    //     {
    //         "_id": { "$oid": "65eeea3a52e4bfc7af9d2fcc" },
    //         "location": [
    //           {
    //             "currentLocation": "Orchard Commons",
    //             "latitude": {
    //               "$numberDouble": "49.257900630679906"
    //             },
    //             "longitude": {
    //               "$numberDouble": "-123.24668723936075"
    //             },
    //             "_id": {
    //               "$oid": "65e6c3e91954ba4281adb3eb"
    //             }
    //           }
    //         ],
    //         "rooms": [
    //           "data:image/jpeg;base64,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"
    //         ],
    //         "pricing": [
    //           {
    //             "initialDeposit": { "$numberInt": "100" },
    //             "monthlyRent": { "$numberInt": "1200" },
    //             "_id": {
    //               "$oid": "65e6c3e91954ba4281adb3ec"
    //             }
    //           }
    //         ],
    //         "numberOfRoomsAvailable": "6 shared",
    //         "timePeriod": { "$numberInt": "12" },
    //         "contactInformation": [
    //           {
    //             "name": "Rythem",
    //             "email": "rythemshah2004@gmail.com",
    //             "_id": {
    //               "$oid": "65e6c3e91954ba4281adb3ed"
    //             }
    //           }
    //         ],
    //         "description": "Private unit in a shared room",
    //         "amenities": [
    //           {
    //             "furnished": true,
    //             "utilities": false,
    //             "utensile": true,
    //             "_id": {
    //               "$oid": "65e6c3e91954ba4281adb3ee"
    //             }
    //           }
    //         ],
    //         "dateAdding": "2/04/2024",
    //         "startingSubletDate": "01/05/2024",
    //         "roomType": "4",
    //         "__v": { "$numberInt": "0" }
    //       },
    //   ]

    const cards = allImage.map((item, index) => {
        return (
            <CardComponent
                key={index}
                item={item}
            />
        )
    })

    return (
        <div>
            <b className="featuredITems"> Featured sublets </b>
            <section className = "cards-list">
                {cards}
            </section>
        </div>
    );
}        