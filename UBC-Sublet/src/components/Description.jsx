import "./styles/desc.css";
import main from "../assets/main.png";
import side1 from "../assets/side1.png";
import side2 from "../assets/side2.png";
import side3 from "../assets/side3.png";
import side4 from "../assets/side4.png";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function Descrition() {
  // const [data, setEntireData] = useState([]);
  const location = useLocation();
  const {data} = location.state;
  console.log(data);
  // function getEntireData() {
  //   fetch("http://localhost:3001/subletslist", {
  //     method: "GET",
  //   })
  //   .then ((res) => res.json())
  //   .then ((data) => {
  //     setEntireData(data);
  //   });
  // }

  return (
    <div className="macbook-air-2">
      <div className="desc-img-container">
        <div className="main-img">
          <img src={data.rooms[0]} alt="" className="desc-img" />
        </div>
        <div className="side-images">
          <img src={side1} alt="" className="desc-img" />
          <img src={side2} alt="" className="desc-img" />
          <img src={side3} alt="" className="desc-img" />
          <img src={side4} alt="" className="desc-img" />
        </div>
      </div>
      <div className="form-wrapper">
        <section className="sunny-1br-in-marine-drive-parent">
          <h2 className="sunny-1br-in">{data.location[0].currentLocation} {data.location[0].buildingNumber} {data.numberOfRoomsAvailable}</h2>
          <div className="month1-br4ba">${data.pricing[0].monthlyRent}/month•{data.roomType}•{data.numberOfRoomsAvailable}</div>
        </section>
        <section className="about-this-place-parent">
          <b className="about-this-place">About this place</b>
          <div className="beautiful-and-sunny">
            {data.description}
            {/* Beautiful and sunny one-bedroom apartment in the heart of Chelsea.
            This apartment has a renovated kitchen and bathroom, high ceilings,
            hardwood floors, and a decorative fireplace. The building is well
            maintained with laundry in the basement and a live-in super. It is
            located just steps from the Highline, Chelsea Market, and the Hudson
            River Park. The area is filled with great restaurants, shops, and
            galleries. Easy access to public transportation. Rent includes heat
            and hot water. */}
          </div>
        </section>
        <section className="bonus-button-wrapper">
          <div className="bonus-button">
            <div className="line">
              <b className="amenities">Amenities</b>
              <div className="deposit-rent-frame">
                <div className="bonus-button-3">
                  <div className="hover-me">In Unit</div>
                </div>
                <button className="bonus-button-10">
                  <div className="hover-me">Wifi Free</div>
                </button>
                <button className="bonus-button-4">
                  <div className="hover-me">Included</div>
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
              <div className="price-container">${data.pricing[0].initialDeposit}</div>
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
