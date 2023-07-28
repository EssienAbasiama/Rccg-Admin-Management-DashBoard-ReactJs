import React, { useState } from 'react';

const BroadCast = ({ onClose, onSubmit,error ,success}) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Call the submit function passed as a prop and pass the input value
    onSubmit(inputValue);
    setLoading(false);
    setSent(true);
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
        <button onClick={handleSubmit} class="button-30">{success ? <span>BroadCast Sent</span>:error ? <span>Broadcast Failed</span>:<span>{loading ? <span>Sending <div class="lds-dual-ring"></div></span>:<span>Send Message</span>}</span>}</button>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
};

export default BroadCast;
