import React, { useContext, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import TopBar from "../components/TopBar";
import { CartContext } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { url } from "../api";
// const url="https://foodie-backend-wqpo.onrender.com";
const PlaceOrder = () => {
  const { cart, totalPrice, discount, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a method to get the token
      const token = localStorage.getItem("token");

      await axios.post(
         `${url}/api/orders`,
        {
          items: cart,
          amount: totalPrice - discount,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the cart after successful order placement
      clearCart();

      // Handle successful order placement (e.g., redirect to a confirmation page or show a success message)
      toast.success("Order placed Successfully");
      Swal.fire("Order placed Succesfully","Go to Home to order more","success");
      // alert("Order placed successfully!");

      // Optionally reset address state here
      setAddress({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });

    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error
      alert("Please Login for Placing Order");
    }
  };

  return (
    <>
      <TopBar />
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={address.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={address.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={address.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={address.zipCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={address.phone}
            onChange={handleChange}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{totalPrice === 0 ? 0 : 2}</p>
              </div>
              <div className="cart-total-details">
                <p>Discount</p>
                <p>₹{discount.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{(totalPrice - discount + 2).toFixed(2)}</b>
              </div>
            </div>

            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
