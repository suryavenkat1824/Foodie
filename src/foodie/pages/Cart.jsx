import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        {food_list.map((item) => {
          if (cartItems[item._id]) {
            return (
              <div className="cart-item" key={item._id}>
                <div className="item-img">
                  <img src={`${url}/uploads/${item.image}`} alt="Food item" />
                </div>
                <p className="item-title">{item.productName}</p>
                <p className="item-price">₹{item.price}</p>
                <p className="item-quantity">{cartItems[item._id]}</p>
                <p className="item-total">₹{cartItems[item._id] * item.price}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-total">
        <h3>Total: ₹{getTotalCartAmount()}</h3>
        <button className="cart-checkout" onClick={() => navigate("/")}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
