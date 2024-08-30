import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCar from "./EditCar";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios
      .get("http://localhost:3001/cars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => {
        setError("Error fetching cars: " + err.message);
      });
  };

  const handleEditClick = (carId) => {
    setSelectedCarId(carId);
  };

  const handleDeleteClick = async (carId) => {
    try {
      await axios.delete(`http://localhost:3001/cars/${carId}`);
      alert("Car deleted successfully!");
      fetchCars(); // Refresh the car list after deletion
    } catch (err) {
      setError("Error deleting car: " + err.message);
    }
  };

  const handleCloseEdit = () => {
    setSelectedCarId(null);
    fetchCars(); // Refresh the car list after editing
  };

  return (
    <div>
      <h2>Car List</h2>
      {error && <p>{error}</p>}
      <ul>
        {cars.map((car) => (
          <li key={car.CarID}>
            {car.Make} {car.Model} ({car.Year}) - ${car.PricePerDay} per day
            <button onClick={() => handleEditClick(car.CarID)}>Edit</button>
            <button onClick={() => handleDeleteClick(car.CarID)}>
              Delete
            </button>{" "}
            {/* Add Delete Button */}
          </li>
        ))}
      </ul>
      {selectedCarId && (
        <EditCar carId={selectedCarId} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default CarList;
