import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5205/api/vehicle");
      setVehicles(response.data);
    } catch (error) {
      console.error("There was an error fetching the vehicles!", error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/vehicle/${id}`);
      fetchVehicles(); // Refresh the list after deletion
    } catch (error) {
      console.error("There was an error deleting the vehicle!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Vehicle List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Car Model</th>
                <th>Car Make</th>
                <th>Year of Manufacture</th>
                <th>Base Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.carModel}</td>
                  <td>{vehicle.carMake}</td>
                  <td>{vehicle.yearOfMfg}</td>
                  <td>${vehicle.basePrice}</td>
                  <td>
                    <Link
                      to={`/edit/${vehicle.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <Link to="/add" className="btn btn-success">
            Add New Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
