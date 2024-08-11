import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './foodie/pages/LandingPage';
import ProductMenu from './foodie/components/ProductMenu';
import AddCart from './foodie/components/AddCart';
import PlaceOrder from './foodie/pages/PlaceOrder'; // Import PlaceOrder component
import Orders from './foodie/components/Orders'; // Import Orders component
import './App.css';
import { CartProvider } from './foodie/context/CartContext';
import NotFound from './foodie/components/NotFound';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductMenu />} />
        <Route path='/cart' element={<AddCart />} />
        <Route path='/placeorder' element={<PlaceOrder />} /> {/* Existing route */}
        <Route path='/orders' element={<Orders />} /> {/* Add this route */}
        <Route path='/*' element={ <NotFound></NotFound> }></Route>
      </Routes>
    </CartProvider>
  );
};

export default App;
