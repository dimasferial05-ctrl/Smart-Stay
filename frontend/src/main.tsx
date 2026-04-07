import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";
import "./index.css";
import Dashboard from "./views/Dashboard";
import DataPengguna from "./views/DataPenghuni";
import LogAktivitas from "./views/LogAktivitas";
import Login from "./views/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Route setelah login */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="data-penghuni" element={<DataPengguna />} />
          <Route path="log-aktivitas" element={<LogAktivitas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
