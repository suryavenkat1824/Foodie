// src/components/AddCart.jsx
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import TopBar from "./TopBar";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddCart = () => {
  const {
    cart,
    totalPrice,
    discount,
    setDiscount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cart.reduce(
      (acc, item) => ({ ...acc, [item.productId]: item.quantity }),
      {}
    )
  );
  const [promoCode, setPromoCode] = useState("");
  const [deliveryFee] = useState(2); // Example delivery fee

  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    updateQuantity(productId, newQuantity);
  };

  const handleIncrement = (productId) => {
    const newQuantity =
      (quantities[productId] ||
        cart.find((item) => item.productId === productId)?.quantity ||
        1) + 1;
    handleQuantityChange(productId, newQuantity);
  };

  const handleDecrement = (productId) => {
    const currentQuantity =
      quantities[productId] ||
      cart.find((item) => item.productId === productId)?.quantity ||
      1;
    const newQuantity = currentQuantity - 1;
    if (newQuantity >= 1) {
      handleQuantityChange(productId, newQuantity);
    }
  };

  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: `Are you sure you want to delete ${productName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire(
          "Deleted!",
          `${productName} has been removed from your cart.`,
          "success"
        );
      }
    });
  };

  const handlePromoCodeSubmit = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(totalPrice * 0.1); // Example 10% discount
      Swal.fire("Success!", "Promo code applied successfully!", "success");
    } else {
      Swal.fire(
        "Invalid Promo Code",
        "Please enter a valid promo code.",
        "error"
      );
    }
  };

  const finalTotalPrice = totalPrice - discount + deliveryFee;

  return (
    <>
      <TopBar />
      <section className="cartSection">
        <h3>Cart</h3>
        {cart.length > 0 ? (
          <>
            <table className="cartTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td className="quantityControls">
                      <button onClick={() => handleDecrement(item.productId)}>
                        <FaMinus />
                      </button>
                      <span className="quantityNumber">
                        {quantities[item.productId] || item.quantity}
                      </span>
                      <button onClick={() => handleIncrement(item.productId)}>
                        <FaPlus />
                      </button>
                    </td>
                    <td>
                      ₹
                      {item.price *
                        (quantities[item.productId] || item.quantity)}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleDelete(item.productId, item.productName)
                        }
                      >
                        <MdDelete size={20}></MdDelete>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Totals</h2>
                <div className="cart-totals-details">
                  <p>Subtotal</p>
                  <p>₹{totalPrice}</p>
                </div>
                <hr />
                <div className="cart-totals-details">
                  <p>Delivery Fee</p>
                  <p>₹{totalPrice === 0 ? 0 : deliveryFee}</p>
                </div>
                <hr />
                <div className="cart-totals-details">
                  <p>Discount</p>
                  <p>₹{discount.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-totals-details">
                  <b>Total</b>
                  <b>₹{finalTotalPrice.toFixed(2)}</b>
                </div>
                <div className="checkout-container">
                  <button
                    className="checkout-button"
                    onClick={() => navigate("/placeorder")}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>

              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, enter it here.</p>
                  <div className="cart-promocode-input">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={handlePromoCodeSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Cart is empty</p>
        )}
      </section>
    </>
  );
};

export default AddCart;
