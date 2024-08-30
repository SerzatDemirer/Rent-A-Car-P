import React, { useState } from 'react';
import axios from 'axios';

const RegisterCar = () => {
  const [car, setCar] = useState({
    Make: '',
    Model: '',
    Year: '',
    PricePerDay: '',
    AvailabilityStatus: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/cars', {
        ...car,
        AvailibilityStatus: car.AvailabilityStatus, // Send with the correct column name
      });
      alert('Car registered successfully!');
    } catch (err) {
      alert('Error registering car: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Register Car</button>
    </form>
  );
};

export default RegisterCar;