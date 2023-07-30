import React, { useState } from "react";

const Popup = ({ onSubmit, onClose, email ,error ,success}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    onSubmit(inputValue, email);
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="sendIconContainer">
          <i class="fa-sharp fa-solid fa-paper-plane"></i>
        </div>
        <textarea
          className="textareat"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your Message"
        ></textarea>
        <button onClick={handleSubmit} class="button-30" role="button">
          {success ? (
            <span>Message Sent</span>
          ) : error ? (
            <span>Message Failed</span>
          ) : (
            <span>
              {loading ? (
                <span>
                  Sending{" "}
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </span>
              ) : (
                <span>Send Message</span>
              )}
            </span>
          )}
        </button>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
};

export default Popup;
