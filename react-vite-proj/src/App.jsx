import MainComponent from "./components/MainComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={ <MainComponent />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
    </Routes>
  );
}
