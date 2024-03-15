import { useState } from "react";
import "./styles/card.css";
import DateConvertor from "./DateConvertor";

export default function CardComponent(prop) {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  console.log("ititiitit", prop.item._id);

  return (
    <div className="container-3-parent">
      <div className="img">
        <div
          id={"carouselExampleControlsNoTouching" + prop.item._id}
          className="carousel slide"
          data-bs-touch="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={prop.item.rooms[0]}
                className="d-block w-100"
                alt="pic"
              />
            </div>
            <div className="carousel-item">
              <img
                src={prop.item.rooms[1]}
                className="d-block w-100"
                alt="pic"
              />
            </div>
            <div className="carousel-item">
              <img
                src={prop.item.rooms[2]}
                className="d-block w-100"
                alt="pic"
              />
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={
                "#carouselExampleControlsNoTouching" + prop.item._id
              }
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={
                "#carouselExampleControlsNoTouching" + prop.item._id
              }
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="save">
          <label className="save-container mx-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <svg
              className="save-regular"
              xmlns="http://www.w3.org/2000/svg"
              height="0.5em"
              viewBox="0 0 384 512"
            >
              <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
            </svg>
            <svg
              className="save-solid"
              xmlns="http://www.w3.org/2000/svg"
              height="0.5em"
              viewBox="0 0 384 512"
            >
              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="container-3">
        <div className="frame">
          <b className="location">{prop.item.location[0].currentLocation}</b>
        </div>
        <div className="frame1">
          <div className="distance"> Vancouver 3.4 mi away</div>
        </div>
        <div className="frame2">
          <b className="price">
            <span className="span">${prop.item.pricing[0].monthlyRent}</span>
            <span className="mo">/mo</span>
          </b>
        </div>
        <div className="frame3">
          <div className="description">
            {" "}
            1BR/{prop.item.roomType}BA • {prop.item.description}
          </div>
        </div>
        <div className="frame4">
          <div className="duration">
            <span> Available</span>
            {/* <b>: May 1, 2024 - July 1, 2024</b> */}
            <DateConvertor
              start={prop.item.startingSubletDate}
              timePeriod={prop.item.timePeriod.$numberInt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
