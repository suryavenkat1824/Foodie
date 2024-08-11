import React, { useState, useEffect } from 'react';
import './LoginPopup.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { url } from '../api';
// const url = "https://foodie-backend-wqpo.onrender.com";

const LoginPopup = ({ setShowLogin, setToken }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        Swal.fire("Welcome to Foodie!", "Login Success", "success");
        toast.success("Login Success");
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        setShowLogin(false);
      } else {
        handleLoginErrors(response.data.message);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
  };

  const handleLoginErrors = (message) => {
    switch (message) {
      case "User doesn't exist":
        toast.info("User doesn't exist");
        Swal.fire("Please Register!", "User name doesn't exist.", "info");
        break;
      case "Password not matching":
        toast.error("Password Wrong");
        Swal.fire("Wrong Password", "Password not matching", "error");
        break;
      case "User Already Exist":
        toast.info("Email already exists");
        Swal.fire("User exists", "Login to your Account", "warning");
        break;
      case "Password should have at least 5 characters":
        toast.info("Invalid Password");
        Swal.fire("Invalid Password", "Password should have at least 5 characters", "info");
        break;
      default:
        alert(message);
    }
  };

  const handleVendorClick = () => {
    Swal.fire({
      title: 'Are you on a laptop?',
      text: 'This link is optimized for laptop view.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, open it',
      cancelButtonText: 'No, thanks'
    }).then((result) => {
      if (result.isConfirmed) {
        window.open('https://vendor-dash-board.vercel.app/', '_blank');
      }
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className='login-popup-inputs'>
          {currentState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
        </div>
        <button type="Submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currentState === 'Login'
          ? <p>Create a New Account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
          : <p>Already have an account <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
        }
        <p className='vendor-linkup'>
          Are You a Vendor? <span onClick={handleVendorClick}>Visit Vendor Dashboard</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
