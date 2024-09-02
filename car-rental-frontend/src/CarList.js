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
      fetchCars();
    } catch (err) {
      setError("Error deleting car: " + err.message);
    }
  };

  const handleCloseEdit = () => {
    setSelectedCarId(null);
    fetchCars();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Car List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {cars.map((car) => (
          <li key={car.CarID} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                {car.Make} {car.Model} ({car.Year}) - ${car.PricePerDay} per day
              </div>
              <div>
                <button
                  onClick={() => handleEditClick(car.CarID)}
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(car.CarID)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
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
