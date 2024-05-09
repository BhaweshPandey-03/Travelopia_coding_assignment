import React, { useState } from "react";
import "../styles/tripPlanner.css"; // Import CSS file
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const TripPlanner: React.FC = () => {
  const URL = "https://travelopia-coding-assignment-3.onrender.com";
;
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    interest: "",
    travelers: "",
    budget: "",
  });

  const [tripPreferences, setTripPreferences] = useState({
    duration: "",
    date: "",
    notes: "",
  });

  const [tripDetailsSubmitted, setTripDetailsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false); 
  const [adminErrorToastOpen, setAdminErrorToastOpen] = useState(false); 

  const handleTripDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTripDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); 
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleTripDetailsSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
   
    const mail = localStorage.getItem("email");
    if(mail !== 'admin@travelopia.com'){
      console.log("Trip Details Submitted:", tripDetails);
      setTripDetailsSubmitted(true);
    } else {
      console.log("Admin can't submit trip details");
      setAdminErrorToastOpen(true); 
    }


  };

  const handleTripPreferencesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTripPreferences((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTripPreferencesSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        email: localStorage.getItem("email"),
        destination: tripDetails.destination,
        interest: tripDetails.interest,
        travelers: tripDetails.travelers,
        budget: tripDetails.budget,
        duration: tripPreferences.duration,
        date: tripPreferences.date,
        notes: tripPreferences.notes,
      };
      console.log(data);
      const token = localStorage.getItem("token");
      console.log(token);

      if (token) {
        const res = await axios.post(`${URL}/enquiry`, data, {
          headers: { Authorization: token },
        });
        if (res) {
          console.log(res.data);
          setToastOpen(true); 
          setTimeout(() => {
            setToastOpen(false); 
          }, 2000);
        }
        setTripPreferences({ duration: "", date: "", notes: "" });
        setTripDetails({
          destination: "",
          interest: "",
          travelers: "",
          budget: "",
        });
        setTripDetailsSubmitted(false);
        setLoading(false);
        console.log("Trip Preferences Submitted:", tripPreferences);
      } else {
        console.log("no token");
      }
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  return (
    <div className="containerTP">
      {!tripDetailsSubmitted ? (
        <div className="form-section">
          <form className="formTP" onSubmit={handleTripDetailsSubmit}>
            <select
              id="destination"
              name="destination"
              value={tripDetails.destination}
              onChange={handleTripDetailsChange}
              required
            >
              <option value="">Where do you want to go?</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Japan">Japan</option>
            </select>

            <select
              id="interest"
              name="interest"
              value={tripDetails.interest}
              onChange={handleTripDetailsChange}
              required
            >
              <option value="">Your Interest</option>
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
              <option value="City">City</option>
              <option value="Nature">Nature</option>
              <option value="Other">Other</option>
            </select>

            <select
              id="travelers"
              name="travelers"
              value={tripDetails.travelers}
              onChange={handleTripDetailsChange}
              required
            >
              <option value="">Number of Travelers</option>
              <option value="1">1 traveler</option>
              <option value="2">2 travelers</option>
              <option value="3">3 travelers</option>
              <option value="4">4 travelers</option>
              <option value="5">5 travelers</option>
              <option value="6">6 travelers</option>
              <option value="7">7 travelers</option>
              <option value="8">8 travelers</option>
              <option value="9">9 travelers</option>
              <option value="10">10 or more travelers</option>
            </select>

            <select
              id="budget"
              name="budget"
              value={tripDetails.budget}
              onChange={handleTripDetailsChange}
              required
            >
              <option value="">Budget per Person</option>
              <option value="$1000-$1500">$1000 - $1500</option>
              <option value="$1501-$2000">$1501 - $2000</option>
              <option value="$2001-$2500">$2001 - $2500</option>
              <option value="$2501-$3000">$2501 - $3000</option>
              <option value="$2501-$3000">more then $3000</option>
              
            </select>

            <button type="submit" className="btn">
              {loading ? <CircularProgress size={24} /> : "Create My Trip"}
            </button>
          </form>
        </div>
      ) : (
        <div className="form-section">
          <form className="formTP" onSubmit={handleTripPreferencesSubmit}>
            <input
              type="Text"
              placeholder="Duration (days)"
              name="duration"
              value={tripPreferences.duration}
              onChange={handleTripPreferencesChange}
              required
            />
            <label
              style={{ display: "block", paddingTop: "10px" }}
              htmlFor="date"
              className="date-label"
            >
              {!tripPreferences.date && "Enter date"}
            </label>
            <input
              type="date"
              name="date"
              value={tripPreferences.date}
              onChange={handleTripPreferencesChange}
              min={getCurrentDate()}
              required
              className={tripPreferences.date ? "has-value" : ""}
            />

            <textarea
              placeholder="Any Notes or Special Requests?"
              name="notes"
            ></textarea>
            <button type="submit" className="btn">
              {loading ? <CircularProgress size={24} /> : "Let's Go"}
            </button>
          </form>
        </div>
      )}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success">
          Trip Preferences Submitted!
        </Alert>
      </Snackbar>
      <Snackbar
        open={adminErrorToastOpen}
        autoHideDuration={2000}
        onClose={() => setAdminErrorToastOpen(false)}
      >
        <Alert onClose={() => setAdminErrorToastOpen(false)} severity="error">
          Admin can't submit trip details.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TripPlanner;
