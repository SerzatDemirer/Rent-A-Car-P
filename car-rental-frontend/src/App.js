import React from 'react';
import RegisterCar from './RegisterCar';
import CarList from './CarList'; // Import the new component

const App = () => {
  return (
    <div>
      <h1>Car Rental Application</h1>
      <RegisterCar />
      <CarList /> {/* Include the CarList component to display all cars */}
    </div>
  );
};

export default App;