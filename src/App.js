import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Vehicle from "./pages/Vehicle";
import ChargingHub from "./pages/ChargingHub";
import EnvironmentalPage from "./pages/EnvironmentalPage";
import Tips from "./pages/Tips";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/charginghub" element={<ChargingHub />} />{" "}
          <Route path="/environmental" element={<EnvironmentalPage />} />
          <Route path="/caretips" element={<Tips />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
