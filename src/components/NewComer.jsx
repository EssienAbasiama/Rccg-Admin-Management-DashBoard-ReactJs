import React, { useState, useEffect } from "react";
import "./NewComer.css";
import axios from "axios";
import Popup from "./Popup";
import BroadCast from "./BroadCast";
import ScrollableModal from "./ScrollableModal";

// import { Link } from 'react-router-dom';

function NewComer() {
  const baseURL = "http://rccgadonai.org/api";
  const [newComerList, setNewComerList] = useState([]);
  const [newComerListempty, setNewComerListEmpty] = useState(true);
  const [noOne, setNoOne] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBroadcastPopupOpen, setBroadCastPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [wannaDelete, setWannaDelete] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const openModal = (newcomer) => {
    setModalOpen(true);
    setSelectedUser(newcomer)
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };
  const handleOpenPopup = (newcomer) => {
    setPopupOpen(true);
    setSelectedEmail(newcomer)
  };
  const handleBroadCastOpenPopup = () => {
    setBroadCastPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedEmail(null);
  };
  const handleBroadCastClosePopup = () => {
    setBroadCastPopupOpen(false);
  };
  async function deleteData(id) {
    setWannaDelete(
      prompt("Are you sure you want to delete? Enter 1 if so, Cancel if not")
    );
    if ((wannaDelete = 1)) {
      try {
        const response = await axios.delete(baseURL + "/newcomers/" + id);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return "";
    }
  }
  const handleDelete = (id) => {
    const data = deleteData(id);
    fetchData();
  };

  const handleSubmit = (value,id) => {
    axios
      .post(baseURL + "/emails/"+id, {
        message: value,
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        alert("Email Sent");
      })
      .catch((error) => {
        // Handle the error
        alert("Failed Sent Email");
        console.error(error);
      });
  };
  const handleBroadCastSubmit = (value) => {
    axios
      .post(baseURL + "/sendbulk-email", {
        message: value,
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        alert("Success");
      })
      .catch((error) => {
        // Handle the error
        alert("failure");
        console.error(error);
      });
  };
  async function fetchSearchData() {
    try {
      const response = await axios.get(
        baseURL + "/newcomers/search/" + inputValue
      );
      setNewComerList(response.data);
      setNewComerListEmpty(false);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearchResult = () => {
    fetchSearchData();
  };

  async function fetchData() {
    try {
      const response = await axios.get(baseURL + "/newcomers");
      setNewComerList(response.data);
      setNewComerListEmpty(false);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("An Error Occured "+error);

    }
  }

  function checkIfEmpty() {
    if (newComerList.length === 0 && newComerListempty == false) {
      setNoOne(true);
    } else {
      setNoOne(false);
    }
  }
  useEffect(() => {
    fetchData();
    checkIfEmpty();
  }, []);

  return (
    <div className="newcomers-body">
      <div class="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
          placeholder="Search By Email"
        />
        <button class="search-button" onClick={handleSearchResult}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
      <button
        broadcast
        onClick={handleBroadCastOpenPopup}
        className="messgae-btn"
      >
        Send Broadcast Message
      </button>
      {noOne ? <h3 className="nonewcomer">No NewComer</h3> : ""}

      {newComerListempty ? (
        <div class="lds-dual-ring"></div>
      ) : (
        <div class="grid-container">
          {newComerList.map((newcomer) => {
            return (
              <>
                <div key={newcomer.id} class="grid-item">
                  <a
                    className="detail-icon"
                    href="#"
                    onClick={() => {
                      openModal(newcomer);
                    }}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </a>
                  <ScrollableModal detail={selectedUser} isOpen={modalOpen} onClose={closeModal} />

                  <a
                    className="delete"
                    onClick={() => handleDelete(newcomer.id)}
                    href="#"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </a>
                  <div
                    className="profilePicture"
                    style={{
                      backgroundImage: `url(http://rccgadonai.org/api/profile_pictures/${newcomer.profile_picture})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      /* additional background properties */
                    }}
                  ></div>
                  <div className="newcomer-detail">
                    <div className="new-comer-name">
                      <span>{newcomer.title} </span>
                      {newcomer.surname} {newcomer.othername}
                    </div>
                    <div className="email">{newcomer.email}</div>
                    <div className="phoneNumber">{newcomer.phonenumber}</div>
                    <button onClick={() => {handleOpenPopup(newcomer)}} className="messgae-btn">
                      Send Message
                    </button>
                    {isPopupOpen && (
                      <Popup
                        email={selectedEmail.id}
                        onClose={handleClosePopup}
                        onSubmit={handleSubmit}
                      />
                      
                    )}
                    {isBroadcastPopupOpen && (
                      <BroadCast
                        onClose={handleBroadCastClosePopup}
                        onSubmit={handleBroadCastSubmit}
                      />
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NewComer;
