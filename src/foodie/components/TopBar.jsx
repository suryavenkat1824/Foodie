import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import LoginPopup from '../components/LoginPopup';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TopBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        localStorage.removeItem('token');
        setToken('');
        toast.success("Logged out successfully");
      }
    });
  };
  

  return (
    <section className='topBarSection'>
      <div className='companyTitle'>
        <Link to='/' className='link'>
          <h1>Foodie</h1>
        </Link>
      </div>

      <div className='navbar-right'>
        {token && (
          <>
            <div className='cartLogo'>
              <Link to='/cart' className='cartLink'>
                <IoCartOutline size={35} className='cartIcon' />
              </Link>
            </div>

            <div className='order-logout'>
              <Link className='orders-link' to="/orders">
              <img  className='img-logo' src={assets.bag_icon} alt="" />
                {/* <h3 className='orders-span'>Orders</h3> */}
              </Link>
              <button className='login-button' onClick={logout}>
              Logout</button>
            </div>
          </>
        )}
        {!token && (
          <button className='login-button' onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>

      {showLogin && <LoginPopup setShowLogin={setShowLogin} setToken={setToken} />}
    </section>
  );
};

export default TopBar;
