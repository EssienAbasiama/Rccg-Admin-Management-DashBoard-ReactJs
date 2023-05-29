import React from 'react'

function ScrollableDetail(props) {
  return (
    <div key={props.detail.id} className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>NewComer Details</h2>

        <button className="close-btn" onClick={props.onClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <div className="scrollable-content">
          <div className="centent-body">
            <div
              className="modal-detail-content-image"
              style={{
                backgroundImage: `url(https://rccgadonai.org/api/profile_pictures/${props.detail.profile_picture})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="modal-details-content">
              <div className="subject-name"><strong>{props.detail.title} </strong><strong>{props.detail.surname} </strong><strong>{props.detail.othername}</strong></div>
              
              <div className="flex">
              <div className="gender"><strong>Gender </strong>{props.detail.gender}</div>
                <div className="email">{props.detail.email}</div>
                <div className="email">{props.detail.phonenumber}</div>
              </div>
              <div className="flex">
              <div className="email"><strong>Occupation </strong>{props.detail.occupation}</div>
              <div className="email"><strong>Nationality </strong>{props.detail.nationality}</div>
              <div className="email"><strong>Age </strong>{props.detail.age_bracket}</div>
              </div>

              
              <div className="email"><strong>Marital Status </strong>{props.detail.marital_status}</div>
              <div className="email"><strong>State of Residence </strong>{props.detail.state_of_residence}</div>
              {/* <div className="email">Single</div> */}
              <div className="person-name email"><strong>Nearest Bus Stop </strong><br></br>
                {props.detail.nearest_bus_stop}
              </div>
              <div className="person-name email"><strong>Address </strong><br></br>
                {props.detail.house_address}
              </div>
              <div className="person-name email"><strong>Special Message :</strong><br></br>
                {props.detail.special_message}
              </div>
              <div className="person-name email"><strong>Prayer Request :</strong><br></br>
                {props.detail.prayer_request}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ScrollableDetail