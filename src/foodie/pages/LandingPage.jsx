import React,{useState} from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
import ProductMenu from '../components/ProductMenu'
import LoginPopup from '../components/LoginPopup'
import Footer from '../components/Footer'
const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <div>
     {showLogin?<LoginPopup setShowLogin={setShowLogin}></LoginPopup>: <></>}
        <TopBar setShowLogin={setShowLogin}></TopBar>
        <div className='landingSection'>
        <ItemsDisplay></ItemsDisplay>
        <Chains></Chains>
        <FirmCollections></FirmCollections>
        
        </div>
        {/* <Footer></Footer> */}
    </div>
  )
}

export default LandingPage