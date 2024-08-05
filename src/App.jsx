// import React from 'react'
// import LandingPage from './foodie/pages/LandingPage'
// import { Routes,Route} from 'react-router-dom'
// import './App.css'
// import ProductMenu from './foodie/components/ProductMenu'
// const App = () => {
//   return (
//     <div>
//     <Routes>
//       <Route path='/' element={ <LandingPage></LandingPage>}></Route>
//       <Route path='/products/:firmId/:firmName'  element={<ProductMenu></ProductMenu>}></Route>
//     </Routes>
   
//     </div>
//   )
// }

// export default App




// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './foodie/pages/LandingPage';
import ProductMenu from './foodie/components/ProductMenu';
import AddCart from './foodie/components/AddCart';
import './App.css';
import { CartProvider } from './foodie/context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductMenu />} />
        <Route path='/cart' element={<AddCart />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
