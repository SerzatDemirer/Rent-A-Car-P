import React from "react";
import RegisterCar from "./RegisterCar";
import CarList from "./CarList";

const Admin = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <RegisterCar />
      <CarList />
    </div>
  );
};

export default Admin;
