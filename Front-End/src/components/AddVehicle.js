import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const AddVehicle = () => {
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [yearOfMfg, setYearOfMfg] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = {
      carModel,
      carMake,
      yearOfMfg,
      basePrice,
    };

    try {
      await axios.post("http://localhost:5205/api/vehicle", newVehicle);
      navigate("/");
    } catch (error) {
      console.error("There was an error adding the vehicle!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Car Model:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Car Model"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Car Make:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Car Make"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Year of Manufacture:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Year of Manufacture"
              value={yearOfMfg}
              onChange={(e) => setYearOfMfg(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Base Price:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Base Price"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-100">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
