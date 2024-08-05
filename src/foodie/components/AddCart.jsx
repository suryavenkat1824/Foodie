import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import TopBar from './TopBar';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
const AddCart = () => {
  const { cart, totalPrice, removeFromCart, updateQuantity } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {})
  );

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Ensure minimum quantity is 1
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    updateQuantity(productId, newQuantity);
  };

  const handleIncrement = (productId) => {
    const newQuantity = (quantities[productId] || cart.find(item => item.productId === productId)?.quantity || 1) + 1;
    handleQuantityChange(productId, newQuantity);
  };

  const handleDecrement = (productId) => {
    const currentQuantity = quantities[productId] || cart.find(item => item.productId === productId)?.quantity || 1;
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire(
          'Deleted!',
          `${productName} has been removed from your cart.`,
          'success'
        );
      }
    });
  };

  return (
    <>
      <TopBar />
      <section className="cartSection">
        <h3>Cart</h3>
        {cart.length > 0 ? (
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
                    <span className="quantityNumber">{quantities[item.productId] || item.quantity}</span>
                    <button onClick={() => handleIncrement(item.productId)}>
                      <FaPlus />
                    </button>
                  </td>
                  <td>₹{item.price * (quantities[item.productId] || item.quantity)}</td>
                  <td>
                    <button onClick={() => handleDelete(item.productId, item.productName)}>
                      <MdDelete size={20}></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4"><strong>Total Price:</strong></td>
                <td><strong>₹{totalPrice}</strong></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>Cart is empty</p>
        )}
      </section>
    </>
  );
};

export default AddCart;
