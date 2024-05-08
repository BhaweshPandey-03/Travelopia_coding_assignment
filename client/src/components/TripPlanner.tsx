import React, { useState } from 'react';
import '../styles/tripPlanner.css'; // Import CSS file

const TripPlanner: React.FC = () => {
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    interest: '',
    travelers: '',
    budget: 0,
  });

  const [tripPreferences, setTripPreferences] = useState({
    duration: '',
    date: '',
    notes: '',
  });

  
  const [tripDetailsSubmitted, setTripDetailsSubmitted] = useState(false);

  const handleTripDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  const handleTripDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submitting trip details
    console.log('Trip Details Submitted:', tripDetails);
    setTripDetailsSubmitted(true);
  };

  const handleTripPreferencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripPreferences(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleTripPreferencesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submitting trip preferences
    alert("Trip Preferences Submitted");
    setTripPreferences({ duration: '', date: '', notes: '' });
    setTripDetails({ destination: '', interest: '', travelers: '', budget: 0 });
    setTripDetailsSubmitted(false);
    console.log('Trip Preferences Submitted:', tripPreferences);

  };

  return (
    <div className="containerTP">
    {!tripDetailsSubmitted ? (
      <div className="form-section">
        {/* <h2>Section 1: Trip Details</h2> */}
        <form className="formTP" onSubmit={handleTripDetailsSubmit}>
          <select id="destination" name="destination" value={tripDetails.destination} onChange={handleTripDetailsChange} required>
            <option value="">Where do you want to go?</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            {/* Add more countries as needed */}
          </select>
  
          <select id="interest" name="interest" value={tripDetails.interest} onChange={handleTripDetailsChange} required>
            <option value="">Your Interest</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            {/* Add more interests as needed */}
          </select>
  
          <select id="travelers" name="travelers" value={tripDetails.travelers} onChange={handleTripDetailsChange} required>
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
  
          <select id="budget" name="budget" value={tripDetails.budget} onChange={handleTripDetailsChange} required>
            <option value="">Budget per Person</option>
            <option value="$1000-$1500">$1000 - $1500</option>
            <option value="$1501-$2000">$1501 - $2000</option>
            <option value="$2001-$2500">$2001 - $2500</option>
            <option value="$2501-$3000">$2501 - $3000</option>
            <option value="$2501-$3000">more then $3000</option>
            {/* Add more budget options as needed */}
          </select>
  
          <button type="submit" className="btn">Create My Trip</button>
        </form>
      </div>
    ) : (
      <div className="form-section">
        {/* <h2>Section 2: Trip Preferences</h2> */}
        <form className="formTP" onSubmit={handleTripPreferencesSubmit}>
          <input type="Text" placeholder="Duration (days)" name="duration" value={tripPreferences.duration} onChange={handleTripPreferencesChange}  required />
          <input type="date" placeholder="When?" name="date" value={tripPreferences.date} onChange={handleTripPreferencesChange} min={getCurrentDate()} required />
          <textarea placeholder="Any Notes or Special Requests?" name="notes"
          //  value={tripPreferences.notes} 
          // onChange={handleTripPreferencesChange}
          ></textarea>
          <button type="submit" className="btn">Let's Go</button>
        </form>
      </div>
    )}
  </div>
  

  
  );
};

export default TripPlanner;
