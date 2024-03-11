import { useState } from "react";
import "./card.css"; // Import CSS file
import pic from "../assets/pic2.jpg";
import pic1 from "../assets/pic1.jpeg"

const Card = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const data = {
    index: 1,
    roomImages: [pic, pic1],
    roomType: "Single",
    location: "Orchard Commons",
    price: "1100",
}  

  return (
    <div className="card">
      <div className="img">
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={data.roomImages[0]} className="d-block w-100" alt="pic" />
            </div>
            <div className="carousel-item">
              <img src={data.roomImages[1]} className="d-block w-100" alt="pic" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
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

      <div className="  p-3 " style={{ maxWidth: '400px' }}>
  <div className="row">
    <div className="col">
      <h1 className="fw-bold mb-3" style={{ fontSize: '24px' }}>Orchard Commons 
        <em>
          $975
          <small>
            /mo
          </small>
        </em>
      </h1>
    </div>
    <div className="col-auto">
      <p className="fw-bold mb-3" style={{ fontSize: '24px' }}>$975/mo</p>
    </div>
  </div>
  <p className="mb-3" style={{ fontSize: '16px' }}>3.4 mi away</p>
  <p className="mb-4" style={{ fontSize: '14px' }}>1BR/4BA • Private room in shared unit</p>
  <button className="btn btn-primary fw-bold" style={{ fontSize: '16px' }}>Contact for details</button>
</div>

    </div>
  );
};

export default Card;