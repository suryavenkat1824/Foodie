import React from 'react'
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
const TopBar = () => {
  return (
   <section className='topBarSection'>
    <div className='companyTitle'>
    <Link to='/' className='link'>
    <h1>Foodie</h1>
    </Link>
       
    </div>
    <div className='cartLogo'>
        <Link to='/cart' className='cartLink'>
          <h3 className='cartText'>View Cart</h3>
          <IoCartOutline className='cartIcon' />
        </Link>
      </div>
    
    {/* <div className='userAuth'>
        Login/SignUp
    </div> */}
   </section>
  )
}

export default TopBar