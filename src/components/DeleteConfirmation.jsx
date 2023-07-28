import React,{useState,useRef} from "react";
import "./DeleteConfirmation.css";
import axios from "axios";

function DeleteConfirmation({isOpen, onClose, detail,fetchdat}) {
  const fetchDataRef = useRef(null);
  const closeModalaRef = useRef(null);
  const baseURL = "https://rccgadonai.org/api";
  const [isDelete, setdelete] = useState(false); 
  const [loading, setLoading] = useState(false); 
  async function deleteData(selectedUserId) {
    if (isDelete == true) {
      try {
        const response = await axios.delete(
          baseURL + "/newcomers/" + selectedUserId
        );
        closeModalaRef.current.click();
        fetchDataRef.current.click();

        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return "Failed To Delete";
    }
  }
  const handleDelete = (selectedUserId) => {
    setLoading(true);
    setdelete(true);
    const data = deleteData(selectedUserId);
    setLoading(false);
  };
  
  return (
    <>
      {isOpen && (
        <div key={detail.id} className="delete-Container-body">
          <div className="delete-body">
            <div className="delete-header">Confirm Delete</div>
            <div className="delete-question">
              Are you sure you <br></br>you want to delete
            </div>
            <div className="delete-name">{detail.surname} {detail.othername}</div>
            <div className="delete-button-section">
              <button ref={fetchDataRef} id="fetchdata" onClick={fetchdat} className="hidden-buttons delete-button delete-cancel">fetchData</button>
              <button ref={closeModalaRef} id="closemodal" onClick={onClose} className="delete-button delete-cancel">Cancel</button>
              <button onClick={() => handleDelete(detail.id)} className="delete-button delete-proceed">Delete {loading && <div class="lds-dual-ring"></div>}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmation;
