// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TopBar from './TopBar';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:4000/api/order', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(response.data.orders);
//       } catch (err) {
//         setError('Failed to fetch orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <TopBar />
//       <div className="my-orders">
//         <h1>Your Orders</h1>
//         <div className="container">
//           {orders.map((order) => (
//             <div className="my-orders-order" key={order._id}>
//               <p><b>Ordered on:</b> {order.date}</p>
//               <p><b>Amount:</b> ₹{Number(order.amount).toFixed(2)}</p>
//               <div>
//                 <table className="orders-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                       <th>Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {order.items.map((item, index) => (
//                       <tr key={item._id || index}>
//                         <td>{item.productName}</td>
//                         <td>₹{Number(item.price).toFixed(2)}</td>
//                         <td>{item.quantity}</td>
//                         <td>₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <p><b>Address:</b> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { url } from '../api';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleDropdown = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <>
      <TopBar />
      <div className="my-orders">
        <h1>Your Orders</h1>
        <div className="container">
          {orders.map((order) => (
            <div className="my-orders-order" key={order._id}>
              <p><b>Ordered on:</b> {order.date}</p>
              <p><b>Amount:</b> ₹{Number(order.amount).toFixed(2)}</p>
              <p><b>Address:</b> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}</p>
              <button className='old-order-button' onClick={() => toggleDropdown(order._id)}>
                {openOrderId === order._id ? 'Hide Items' : 'View Items'}
              </button>
              {openOrderId === order._id && (
                <div className="order-items-dropdown">
                  <h2>Order Items</h2>
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={item._id || index}>
                          <td>{item.productName}</td>
                          <td>₹{Number(item.price).toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <hr></hr>
            </div>
           
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
