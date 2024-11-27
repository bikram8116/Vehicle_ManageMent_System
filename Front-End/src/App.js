import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleList from "./components/VehicleList";
import AddVehicle from "./components/AddVehicle";
import EditVehicle from "./components/EditVehicle";

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<VehicleList />} />
          <Route path="/add" element={<AddVehicle />} />
          <Route path="/edit/:id" element={<EditVehicle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
