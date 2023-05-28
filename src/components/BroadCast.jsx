import React, { useState } from 'react';

const BroadCast = ({ onClose, onSubmit}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    // Call the submit function passed as a prop and pass the input value
    onSubmit(inputValue);
    // Clear the input value
    // setInputValue('');
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
  );
};

export default BroadCast;
