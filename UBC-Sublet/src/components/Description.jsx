import "./styles/desc.css";
import Contact from "./Contact";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";


export default function Descrition() {
  const location = useLocation();
  const [furnished, setfurnished] = useState([]);
  const [utensils, setutensils] = useState([]);
  const [Utilities, setUtilities] = useState([]);

  const { data } = location.state;
  console.log(data);
  console.log(data.amenities[0].furnished);
  useEffect(() => {
    // Update the 'furnished' state based on the 'data' object
    if (data.amenities && data.amenities.length > 0) {
      if (data.amenities[0].furnished === true) {
        setfurnished("furnished");
      } else {
        setfurnished("unfurnished");
      }
    } if (data.amenities[0].utensile === true){ 
      setutensils("Utensils included");
    } else {
      setutensils("Utensils not included");
    } if (data.amenities[0].Utilities === true) {
      setUtilities("Utilities included");
    } else {
      setUtilities("Utilities not included");
    }
  }, [data]); //

  return (
    <div className="macbook-air-2">
      <div className="desc-img-container">
        <div className="main-img">
          <img src={data.rooms[0]} alt="" className="desc-img" />
        </div>
        <div className="side-images">
          <img src={data.rooms[1]} alt="" className="desc-img" />
          <img src={data.rooms[2]} alt="" className="desc-img" />
          <img src={data.rooms[3]} alt="" className="desc-img" />
          <img src={data.rooms[4]} alt="" className="desc-img" />
        </div>
      </div>
      <div className="form-wrapper">
        <section className="sunny-1br-in-marine-drive-parent">
          <h2 className="sunny-1br-in">
            {data.location[0].currentLocation} {data.location[0].buildingNumber}
            {data.numberOfRoomsAvailable}
          </h2>
          <div className="month1-br4ba">
            ${data.pricing[0].monthlyRent}/month• {data.numberOfRoomsAvailable}
            BR • {data.roomType}
          </div>
        </section>
        <section className="about-this-place-parent">
          <b className="about-this-place">About this place</b>
          <div className="beautiful-and-sunny">{data.description}</div>
        </section>
        <section className="bonus-button-wrapper">
          <div className="bonus-button">
            <div className="line">
              <b className="amenities">Amenities</b>
              <div className="deposit-rent-frame">
                <div className="bonus-button-3">
                  <div className="hover-me">{furnished}</div>
                </div>
                <button className="bonus-button-10">
                  <div className="hover-me">{utensils}</div>
                </button>
                <button className="bonus-button-4">
                  <div className="hover-me">{Utilities}</div>
                </button>
                <button className="bonus-button-5">
                  <div className="hover-me">Included</div>
                </button>
                <button className="bonus-button-6">
                  <div className="hover-me">Included</div>
                </button>
                <button className="bonus-button-7">
                  <div className="hover-me">Included</div>
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="pricing-parent">
          <b className="pricing">Pricing</b>
          <div className="frame5" />
        </div>
        <div className="name-input-parent">
          <div className="name-input">
            <div className="payment-details">
              <div className="deposit">Deposit</div>
              <div className="price-container">
                ${data.pricing[0].initialDeposit}
              </div>
            </div>
            <div className="payment-details1">
              <div className="first-months-rent">First Month’s Rent</div>
              <div className="div">${data.pricing[0].monthlyRent}</div>
            </div>
          </div>
          <div className="frame6" />
        </div>
        <Contact />
      </div>
    </div>
  );
}
