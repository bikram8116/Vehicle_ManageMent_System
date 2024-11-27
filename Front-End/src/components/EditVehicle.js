import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditVehicle = () => {
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [yearOfMfg, setYearOfMfg] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5205/api/vehicle/${id}`);
        const vehicle = response.data;
        setCarModel(vehicle.carModel);
        setCarMake(vehicle.carMake);
        setYearOfMfg(vehicle.yearOfMfg);
        setBasePrice(vehicle.basePrice);
      } catch (error) {
        console.error("There was an error fetching the vehicle details!", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedVehicle = {
      id,
      carModel,
      carMake,
      yearOfMfg,
      basePrice,
    };

    try {
      await axios.put(`http://localhost:5205/api/vehicle/${id}`, updatedVehicle);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("There was an error updating the vehicle!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Vehicle</h2>
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
          <div className="text-center">
            <button type="submit" className="btn btn-primary me-2">
              Update Vehicle
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;
