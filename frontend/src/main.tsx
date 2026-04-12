import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router"; // Navigate dihapus karena sementara tidak dipakai di root
import { AppLayout } from "./components/AppLayout";
import "./index.css";
import Dashboard from "./views/Dashboard";
import DataPengguna from "./views/DataPenghuni";
import LandingPage from "./views/LandingPage"; // Import komponen Landing Page yang baru
import LogAktivitas from "./views/LogAktivitas";
import Login from "./views/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rute untuk Landing Page (Tampil pertama kali saat buka localhost:5173) */}
        <Route path="/" element={<LandingPage />} />

        {/* Rute Login Admin */}
        <Route path="/login" element={<Login />} />

        {/* Route Dashboard & Sistem Admin Bumi Rafka Kost */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-penghuni" element={<DataPengguna />} />
          <Route path="/log-aktivitas" element={<LogAktivitas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
