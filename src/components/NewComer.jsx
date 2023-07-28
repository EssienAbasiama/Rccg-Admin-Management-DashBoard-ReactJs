import React, { useState, useEffect } from "react";
import "./NewComer.css";
import axios from "axios";
import Popup from "./Popup";
import BroadCast from "./BroadCast";
import ScrollableModal from "./ScrollableModal";
import DeleteConfirmation from "./DeleteConfirmation";
import { useAuth } from './api/AuthContext';
import { fetchNewComerData } from './api/api';
// import { Link } from 'react-router-dom';

function NewComer() {
  // const baseURL = "https://rccgadonai.org/api";
  const baseURL = "http://127.0.0.1:8000/api";
  const [newComerList, setNewComerList] = useState([]);
  const { token, isAuthenticated, handleLogout } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);
  const [newComerListempty, setNewComerListEmpty] = useState(true);
  const [noOne, setNoOne] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBroadcastPopupOpen, setBroadCastPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [deleteModalOpen,setDeleteModalOpen] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastError, setBroadCastError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNewComerData(token)
        .then((data) => {
          setNewComerList(data);
          setNewComerListEmpty(false);
          // fetchData();
          checkIfEmpty();
        })
        .catch((error) => setError(error.message));
    } else {
      // Handle the case when the user is not authenticated
      setNewComerList([]);
      setNewComerListEmpty(true);
    }
  }, [isAuthenticated, token]);

  const openModal = (newcomer) => {
    setModalOpen(true);
    setSelectedUser(newcomer)
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };
  
  const openDeleteModal = (newcomer) => {
    setDeleteModalOpen(true);
    setSelectedUser(newcomer);
  }
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
    fetchData();
  }


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
        setBroadcastSent(true);
        
      })
      .catch((error) => {
        setBroadcastSent(false);
        alert("Broadcast Failed to send");
        setBroadCastError(true);
        console.log(error);
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
      if(response.data.length > 0) {
        setNoOne(false);
        setNewComerList(response.data);
        setNewComerListEmpty(false);
        console.log(response.data);
        return response.data;
      }else {
        setNoOne(true);
        setNewComerListEmpty(false);
        console.log(response.data);
        return response.data;
      }
      
    } catch (error) {
      console.log("An Error Occured while fetching Newcomers");
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
                    onClick={() => {
                      openDeleteModal(newcomer);
                    }}
                    // onClick={() => handleDelete(newcomer.id)}
                    href="#"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </a>
                  <DeleteConfirmation detail={selectedUser} isOpen={deleteModalOpen} onClose={closeDeleteModal} fetchdat={fetchData}/>
                  <div
                    className="profilePicture"
                    style={{
                      backgroundImage: `url(https://rccgadonai.org/api/profile_pictures/${newcomer.profile_picture})`,
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
                        error ={broadcastError}
                        success ={broadcastSent}
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
