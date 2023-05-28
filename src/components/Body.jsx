import React, { useState } from "react";
import "./Body.css";
import axios from "axios";

function Body() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const baseURL = "http://127.0.0.1:8000/api";
  const [formData, setFormData] = useState({
    title: "",
    surname: "",
    othername: "",
    gender: "",
    phonenumber: "",
    email: "",
    marital_status: "",
    age_bracket: "",
    occupation: "",
    nationality: "",
    state_of_residence: "",
    nearest_bus_stop: "",
    prayer_request: "",
    house_address: "",
    profile_picture: null,
    special_message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profile_picture: file,
      }));
      console.log(formData);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("About to Make request");
      const response = await axios.post(baseURL + "/newcomers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      // Handle success or any other logic after the request is sent
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Validation errors occurred
        setErrors(error.response.data.errors);
      } else {
        alert("Error");
        console.error(error);
        // Handle other types of errors
      }
    }
  };

  return (
    <div className="bodyform">
      <div className="bodyformcontainer">
        <div className="bodyformcontainer-sub cl-white">
          <div className="bodyform-greeting">
            We are Glad To have you with Us Today
          </div>
          <div className="subheader">Kindly Let's Know you better</div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {selectedImage && (
            
            <div
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="profile-picture-container"
            ></div>
          )}
          <div className="image-container">
          <input
            required
            className="file"
            name="profile_picture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.profile_picture && (
            <div className="error" id="error-profile_picture">
              {errors.profile_picture}
            </div>
          )}
          </div>

          <div className="form-container">
            <div className="select-wrapper">
              <select
                required
                className="custom-select"
                name="title"
                value={formData.title}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  Title
                </option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>

              <div className="select-arrow"></div>
              {errors.title && (
                <div className="error" id="error-title">
                  {errors.title}
                </div>
              )}
            </div>
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
              />
              {errors.surname && (
                <div className="error" id="error-surname">
                  {errors.surname}
                </div>
              )}
              {/* <label className="input-label cl-white">Surname</label> */}
            </div>
          </div>
          <div className="mg-t form-container">
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="othername"
                value={formData.othername}
                onChange={handleChange}
                placeholder="OtherNames"
              />
              {errors.othername && (
                <div className="error" id="error-othername">
                  {errors.othername}
                </div>
              )}
              {/* <label className="input-label cl-white">Other Name</label> */}
            </div>
            <div className="select-wrapper">
              <select
                required
                className="custom-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="select-arrow"></div>
              {errors.gender && (
                <div className="error" id="error-gender">
                  {errors.gender}
                </div>
              )}
            </div>
          </div>
          <div className="mg-t form-container">
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              {errors.phonenumber && (
                <div className="error" id="error-phonenumber">
                  {errors.phonenumber}
                </div>
              )}
              {/* <label className="input-label cl-white">Phone Number</label> */}
            </div>
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && (
                <div className="error" id="error-email">
                  {errors.email}
                </div>
              )}
              {/* <label className="input-label cl-white">Email Address</label> */}
            </div>
          </div>
          <div className="mg-t form-container">
            <div className="select-wrapper">
              <select
                required
                className="custom-select"
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
              <div className="select-arrow"></div>
              {errors.marital_status && (
                <div className="error" id="error-marital_status">
                  {errors.marital_status}
                </div>
              )}
            </div>
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="age_bracket"
                value={formData.age_bracket}
                onChange={handleChange}
                placeholder="Input Your Age"
              />
              {errors.age_bracket && (
                <div className="error" id="error-age_bracket">
                  {errors.age_bracket}
                </div>
              )}
              {/* <label className="input-label cl-white">Occupation</label> */}
            </div>
          </div>
          <div className="mg-t form-container">
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
              />
              {errors.occupation && (
                <div className="error" id="error-occupation">
                  {errors.occupation}
                </div>
              )}
              {/* <label className="input-label cl-white">Occupation</label> */}
            </div>
            <div className="input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Nationality"
              />
              {errors.nationality && (
                <div className="error" id="error-nationality">
                  {errors.nationality}
                </div>
              )}
              {/* <label className="input-label cl-white">Nationality</label> */}
            </div>
          </div>
          <div className="mg-t form-container bus-stop">
            <div className="residence input-wrapper">
              <input
                required
                type="text"
                className="custom-input"
                name="state_of_residence"
                value={formData.state_of_residence}
                onChange={handleChange}
                placeholder="State of Residence"
              />
              {errors.state_of_residencee && (
                <div className="error" id="error-state_of_residence">
                  {errors.state_of_residence}
                </div>
              )}
              {/* <label className="input-label cl-white">State OF Residence</label> */}
            </div>
          </div>
          <div className="mg-t form-container bus-stop">
            <div className="input-wrapper-bustop">
              <input
                type="text"
                className="custom-input"
                name="nearest_bus_stop"
                value={formData.nearest_bus_stop}
                onChange={handleChange}
                placeholder="Nearest Bus Stop"
              />
              {errors.nearest_bus_stop && (
                <div className="error" id="error-nearest_bus_stop">
                  {errors.nearest_bus_stop}
                </div>
              )}
              {/* <label className="input-label cl-white">Nearest Bus Stop</label> */}
            </div>
          </div>
          <div className="mg-t">
            <div className="input-wrapper-bustop">
              <input
                required
                type="text"
                className="custom-input"
                name="prayer_request"
                value={formData.prayer_request}
                onChange={handleChange}
                placeholder="Special Prayer Request"
              />
              {errors.prayer_request && (
                <div className="error" id="error-prayer_request">
                  {errors.prayer_request}
                </div>
              )}
              {/* <label className="input-label cl-white">Nearest Bus Stop</label> */}
            </div>
          </div>
          <div className="mg-t ">
            <div className="textarea-wrapper mg-t">
              <textarea
                required
                className="custom-textarea"
                name="house_address"
                value={formData.house_address}
                onChange={handleChange}
                placeholder="Enter House Address"
              ></textarea>
              <label className="textarea-label">Enter Address</label>
              {errors.house_address && (
                <div className="error" id="error-house_address">
                  {errors.house_address}
                </div>
              )}
            </div>
          </div>
          <div className="mg-t ">
            <div className="textarea-wrapper mg-t">
              <textarea
                required
                className="custom-textarea"
                name="special_message"
                value={formData.special_message}
                onChange={handleChange}
                placeholder="Special Message"
              ></textarea>
              <label className="textarea-label">
                Send Us a Special Message
              </label>
              {errors.special_message && (
                <div className="error" id="error-special_message">
                  {errors.special_message}
                </div>
              )}
            </div>
            <div className="buttonsection">
              <button
                className="button-30"
                role="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Body;
