import React from 'react';
import './Header.css';
import RccgLogo from "../Images/RCCG logo.jpg";

const Header = () => {
  const handleButtonClick = () => {
    // Navigate to a new site when the button is clicked
    window.location.href = 'http://localhost:3001/';
    // or
    // window.location.assign('https://www.example.com');
  };
  return (
    <div className="header"><img onClick={handleButtonClick} src={RccgLogo} alt="" className='img'/>
        <div className='welcome'>Welcome! <span className='header-msg'>We're Glad To Have You Here</span></div>
    </div>
  )
}

export default Header