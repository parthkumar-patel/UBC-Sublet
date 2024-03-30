import "./styles/desc.css";
import Contact from "./Contact";
import { useLocation } from "react-router-dom";

export default function Descrition() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

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
