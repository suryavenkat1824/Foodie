// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

// Create Context
export const CartContext = createContext();

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // Add discount state

  // Function to add items to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.productId === product._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.productId === product._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...product, productId: product._id, quantity }];
    });
  };

  // Function to update the quantity of items in the cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  // Function to clear the cart and reset discount
  const clearCart = () => {
    setCart([]);
    setDiscount(0); // Reset discount
  };

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, totalPrice, discount, setDiscount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
