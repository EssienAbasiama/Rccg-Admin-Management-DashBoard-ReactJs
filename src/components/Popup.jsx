import React, { useState } from "react";

const Popup = ({onSubmit, onClose,email}) => {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
      onSubmit(inputValue,email);
    };

    return (
        <div className="popup-container">
      <div className="popup-content">
        <div className='sendIconContainer'>

        <i class="fa-sharp fa-solid fa-paper-plane"></i>
        </div>
        <textarea className='textareat'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your Message"
        ></textarea>
<button onClick={handleSubmit} class="button-30" role="button">Send Message</button>
        
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
    )
}

export default Popup