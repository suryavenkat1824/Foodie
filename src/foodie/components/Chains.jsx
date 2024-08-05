import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import FoodieLogo from './FoodieLogo.png'; // Import the default image

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);

    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
            const newData = await response.json();
            setVendorData(newData);
            console.log("Fetched vendor data: ", newData);
            setLoading(false);
        } catch (error) {
            alert("Failed to fetch data");
            console.error("Error fetching data: ", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        vendorFirmHandler();
    }, []);

    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery");
        const scrollAmount = 500;

        if (direction === "left") {
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
            });
        } else if (direction === "right") {
            gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className='mediaChainSection'>
            <div className="loaderSection">
                {loading && <>
                    <div className="loader">Looking for great food near you...</div>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </>}
            </div>
            <div className="btnSection">
                <button onClick={() => handleScroll("left")}>
                    <FaRegArrowAltCircleLeft className='btnIcons' />
                </button>
                <button onClick={() => handleScroll("right")}>
                    <FaRegArrowAltCircleRight className='btnIcons' />
                </button>
            </div>
            <h3 className='chainTitle'>Top restaurant chains</h3>
            <section className="chainSection" id="chainGallery" onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
                {vendorData.vendors && vendorData.vendors.map((vendor) => (
                    <div key={vendor._id} className="vendorBox">
                        {vendor.firm.map((item) => {
                            const imageUrl = item.image ? `${API_URL}/uploads/${item.image}` : FoodieLogo;
                            console.log("Image URL: ", imageUrl);
                            return (
                                <div key={item._id}>
                                    <Link to={`/products/${item._id}/${item.firmName}`} className="link">
                                        <div className="firmImage">
                                            <img
                                                src={imageUrl}
                                                alt={item.firmName}
                                                onError={(e) => e.target.src = FoodieLogo} // Fallback to default image on error
                                            />
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Chains;
