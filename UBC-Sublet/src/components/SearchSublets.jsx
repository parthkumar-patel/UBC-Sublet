import { useState, useEffect } from "react";
// import "./styles/card.css";
import "./styles/searchSublet.css";
import CardComponent from "./CardComponent";
import { useLocation } from "react-router-dom";

export default function SearchSublet() {
  const [entireData, setentireData] = useState([]);
  const [conditionalData, setconditionalData] = useState([]);
  const [conditionalDataInActive, setconditionalDataInActive] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  const [activeButtons, setActiveButtons] = useState([]);
  const location = useLocation();
  const [priceRange, setPriceRange] = useState(0);
  const [maxpriceRange, setmaxPriceRange] = useState(0);

  const [leaseRange, setLeaseRange] = useState(0);
  const [maxleaseRange, setmaxLeaseRange] = useState(0);

  const { latitude, longitude } = location.state;
  // Add event listener to the search button

  // console.log('Latitude:', latitude);
  // console.log('Longitude:', longitude);

  useEffect(() => {
    getLocationCordinates();
  }, []);

  function getLocationCordinates() {
    setentireData([]);
    fetch("http://localhost:3001/subletslist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setentireData(data);
      });
  }
  useEffect(() => {
    // Create a variable to hold the new data to be added
    let newData = [];
    if (location.state == null) {
      entireData.forEach((data) => newData.push(data));
    } else {
      entireData.forEach((data) => {
        const latitudes = data.location.map((loc) => loc.latitude);
        const longitudes = data.location.map((loc) => loc.longitude);
        if (
          Math.abs(latitudes - latitude) <= 0.005 &&
          Math.abs(longitudes - longitude) <= 0.005
        ) {
          newData.push(data); // Add data to the temporary array
        }
      });
    }

    // After the loop, update the state with the accumulated data
    setconditionalData((prevData) => [...prevData, ...newData]);
    // setFilteredData((prevData) => [...prevData, ...newData]);
    setconditionalDataInActive((prevData) => [...prevData, ...newData]);
  }, [entireData]);

  const handleButtonClick = (buttonId) => {
    if (activeButtons.includes(buttonId)) {
      setActiveButtons(activeButtons.filter((id) => id !== buttonId));
    } else {
      setActiveButtons([...activeButtons, buttonId]);
    }
  };

  const handleMaxPriceChange = (e) => {
    setmaxPriceRange(parseInt(e.target.value));
  };

  const handleMaxLeaseChange = (e) => {
    setmaxLeaseRange(parseInt(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const handleLeaseTermChange = (e) => {
    setLeaseRange(parseInt(e.target.value));
  };

  const handleTheFilter = () => {
    let filteredData = [...conditionalDataInActive];
    const primaryFilter = activeButtons[0];

    const sortingFunctions = {
      Newest: (a, b) => {
        const datePartsA = a.dateAdding.split("/");
        const datePartsB = b.dateAdding.split("/");
        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        return dateB - dateA;
      },
      Oldest: (a, b) => {
        const datePartsA = a.dateAdding.split("/");
        const datePartsB = b.dateAdding.split("/");
        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        return dateA - dateB;
      },
      "Lowest Price": (a, b) => {
        const pricingA = a.pricing[0].monthlyRent;
        const pricingB = b.pricing[0].monthlyRent;
        return pricingA - pricingB;
      },
      "Highest Price": (a, b) => {
        const pricingA = a.pricing[0].monthlyRent;
        const pricingB = b.pricing[0].monthlyRent;
        return pricingB - pricingA; // Sorting in descending order
      },
      "Shortest Lease": (a, b) => {
        const timePeriodA = a.timePeriod;
        const timePeriodB = b.timePeriod;
        return timePeriodA - timePeriodB; // Sorting in descending order
      },
      "Longest Lease": (a, b) => {
        const timePeriodA = a.timePeriod;
        const timePeriodB = b.timePeriod;
        return timePeriodB - timePeriodA; // Sorting in descending order
      },
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
      const filteredGroups = groups.map((group) => {
        // Apply filters other than the primary filter
        let filteredGroup = group;
        activeButtons.slice(1).forEach((filter) => {
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
      filteredData = filteredData.filter(
        (data) =>
          data.pricing[0].monthlyRent >= priceRange &&
          data.pricing[0].monthlyRent <= maxpriceRange
      );
    } else {
      filteredData = filteredData.filter(
        (data) => data.pricing[0].monthlyRent >= priceRange
      );
    }
    if (maxleaseRange != 0) {
      filteredData = filteredData.filter(
        (data) =>
          data.timePeriod >= leaseRange && data.timePeriod <= maxleaseRange
      );
    } else {
      filteredData = filteredData.filter(
        (data) => data.timePeriod >= leaseRange
      );
    }
    // Update state with filtered data
    // setFilteredData(filteredData);
    setconditionalData(filteredData);
  };

  const cards = conditionalData.map((item, index) => {
    return <CardComponent key={index} item={item} />;
  });

  return (
    <>
      <div className="filters">
        <h2
          style={
            {
              // textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
            }
          }
        >
          Filters
        </h2>
        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Newest")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Newest");
          }}
          style={{
            marginLeft: "10px",
            marginTop: "20px",
            position: "relative",
          }}
        >
          {" "}
          Newest{" "}
        </button>

        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Oldest")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Oldest");
          }}
          style={{
            marginLeft: "10px",
            marginTop: "20px",
            // position: "absolute",
          }}
        >
          {" "}
          Oldest{" "}
        </button>

        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Lowest Price")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Lowest Price");
          }}
          style={{
            marginLeft: "-80px",
            marginTop: "70px",
            // position: "absolute",
          }}
        >
          {" "}
          Lowest Price{" "}
        </button>

        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Highest Price")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Highest Price");
          }}
          style={{
            marginLeft: "50px",
            marginTop: "70px",
            // position: "absolute",
          }}
        >
          {" "}
          Highest Price{" "}
        </button>

        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Shortest Lease")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Shortest Lease");
          }}
          style={{
            marginLeft: "-80px",
            marginTop: "120px",
            // position: "absolute",
          }}
        >
          {" "}
          Shortest Lease{" "}
        </button>

        <button
          type="button"
          id="buttons_f"
          className={
            activeButtons.includes("Longest Lease")
              ? "btn btn-dark"
              : "btn btn-outline-secondary"
          }
          onClick={() => {
            handleButtonClick("Longest Lease");
          }}
          style={{
            marginLeft: "-80px",
            marginTop: "170px",
            // position: "absolute",
          }}
        >
          {" "}
          Longest Lease{" "}
        </button>
        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "250px",
            position: "absolute",
            marginLeft: "-80px",
            fontSize: "15px",
          }}
        >
          {" "}
          Min Price{" "}
        </label>
        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "255px",
            position: "absolute",
            marginLeft: "168px",
            fontSize: "15px",
          }}
        >
          {" "}
          {priceRange}{" "}
        </label>

        <input
          type="range"
          className="form-range"
          min="0"
          max="1000"
          id="customRange2"
          onChange={handlePriceChange}
          style={{
            maxInlineSize: "300px",
            marginTop: "275px",
            marginLeft: "-80px",
            position: "absolute",
          }}
        />

        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "320px",
            position: "absolute",
            marginLeft: "-80px",
            fontSize: "15px",
          }}
        >
          {" "}
          Max Price{" "}
        </label>
        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "320px",
            position: "absolute",
            marginLeft: "168px",
            fontSize: "15px",
          }}
        >
          {" "}
          {maxpriceRange}{" "}
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="3000"
          id="customRange2"
          onChange={handleMaxPriceChange}
          style={{
            maxInlineSize: "300px",
            marginTop: "342px",
            marginLeft: "-80px",
            position: "absolute",
          }}
        />

        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "415px",
            position: "absolute",
            marginLeft: "-80px",
            fontSize: "15px",
          }}
        >
          {" "}
          Min Lease Range{" "}
        </label>
        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "415px",
            position: "absolute",
            marginLeft: "168px",
            fontSize: "15px",
          }}
        >
          {" "}
          {leaseRange}{" "}
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="11"
          id="customRange2"
          onChange={handleLeaseTermChange}
          style={{
            maxInlineSize: "300px",
            marginTop: "438px",
            marginLeft: "-80px",
            position: "absolute",
          }}
        />

        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "468px",
            position: "absolute",
            marginLeft: "-80px",
            fontSize: "15px",
          }}
        >
          {" "}
          Max Lease Range{" "}
        </label>
        <label
          htmlFor="customRange2"
          className="form-label"
          id="form-label"
          style={{
            marginTop: "468px",
            position: "absolute",
            marginLeft: "168px",
            fontSize: "15px",
          }}
        >
          {" "}
          {maxleaseRange}{" "}
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="12"
          id="customRange2"
          onChange={handleMaxLeaseChange}
          style={{
            maxInlineSize: "300px",
            marginTop: "490px",
            marginLeft: "-80px",
            position: "absolute",
          }}
        />

        <button
          type="button"
          id="buttons_f_1"
          className="btn btn-primary"
          onClick={handleTheFilter}
          style={{
            width: "300px",
            marginLeft: "-80px",
            marginTop: "565px",
            position: "absolute",
            weight: "bold",
          }}
        >
          {" "}
          Apply Filters{" "}
        </button>
      </div>
      <div>
        {conditionalData.length == 0 ? (
          <div className="position-absolute top-50 start-50 translate-middle gap-10">
            <h1> No search results found, please go back </h1>
          </div>
        ) : (
          <section className="cards-lists" id="cards-lists2">
            {cards}
          </section>
        )}
      </div>
    </>
  );
}
