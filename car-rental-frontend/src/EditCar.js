import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCar = ({ carId, onClose }) => {
  const [car, setCar] = useState({
    Make: "",
    Model: "",
    Year: "",
    PricePerDay: "",
    AvailabilityStatus: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch car details to populate the form
    axios
      .get(`http://localhost:3001/cars/${carId}`)
      .then((response) => setCar(response.data[0])) // Correctly access the first object in the response
      .catch((err) => setError("Error fetching car details: " + err.message));
  }, [carId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/cars/${carId}`, car);
      alert("Car updated successfully!");
      onClose(); // Close the edit form after success
    } catch (err) {
      alert("Error updating car: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Car</h3>
      {error && <p>{error}</p>}
      <div>
        <label>Make:</label>
        <input
          type="text"
          name="Make"
          value={car.Make}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          name="Model"
          value={car.Model}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          name="Year"
          value={car.Year}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price per Day:</label>
        <input
          type="number"
          name="PricePerDay"
          value={car.PricePerDay}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Availability Status:</label>
        <input
          type="checkbox"
          name="AvailabilityStatus"
          checked={car.AvailabilityStatus}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditCar;
