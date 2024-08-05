import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";
import FoodieLogo from './FoodieLogo.png'; // Import the logo

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActivecCategory] = useState("All");

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
      console.log("Fetched firm data: ", newFirmData);
    } catch (error) {
      alert("Firm Data not fetched");
      console.error("Error fetching firm data: ", error);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActivecCategory(category);
  };

  return (
    <>
      <h3>Restaurants with online food delivery</h3>
      <div className="filterButtons">
        <button
          onClick={() => filterHandler("All", "All")}
          className={activeCategory === "All" ? 'activeButton' : ''}
        >
          All
        </button>
        <button
          onClick={() => filterHandler("South-Indian", "South-Indian")}
          className={activeCategory === "South-Indian" ? 'activeButton' : ''}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterHandler("North-Indian", "North-Indian")}
          className={activeCategory === "North-Indian" ? 'activeButton' : ''}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterHandler("Chinese", "Chinese")}
          className={activeCategory === "Chinese" ? 'activeButton' : ''}
        >
          Chinese
        </button>
        <button
          onClick={() => filterHandler("Bakery", "Bakery")}
          className={activeCategory === "Bakery" ? 'activeButton' : ''}
        >
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((item) =>
          item.firm.map((value) => {
            if (
              selectedRegion === "All" ||
              value.region.includes(selectedRegion)
            ) {
              const imageUrl = value.image ? `${API_URL}/uploads/${value.image}` : FoodieLogo;
              console.log("Image URL: ", imageUrl);
              return (
                <Link
                  key={value._id} // Unique key for each firm
                  to={`/products/${value._id}/${value.firmName}`}
                  className="link"
                >
                  <div className="zoomEffect">
                    <div className="firmGroupBox">
                      <div className="firmGroup">
                        <img
                          src={imageUrl}
                          alt={value.firmName} // Add alt attribute for images
                          onError={(e) => e.target.src = FoodieLogo} // Fallback to default image on error
                        />
                        <div className="firmOffer">{value.offer}</div>
                      </div>
                      <div className="firmDetails">
                        <strong>{value.firmName}</strong>
                        <div className="firmArea">
                          {value.region.join(",")}
                        </div>
                        <div className="firmArea">{value.area}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
            return null;
          })
        )}
      </section>
    </>
  );
};

export default FirmCollections;
