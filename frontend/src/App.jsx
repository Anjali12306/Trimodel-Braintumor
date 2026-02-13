import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

import DoctorLayout from "./layouts/DoctorLayout";
import ReceptionistLayout from "./layouts/ReceptionistLayout";
import AdminLayout from "./layouts/AdminLayout";

import DoctorDashboard from "./doctor/Dashboard";
import PatientList from "./doctor/PatientList";
import PatientHistory from "./doctor/PatientHistory";


import ReceptionistDashboard from "./receptionist/Dashboard";
import RegisterPatient from "./receptionist/RegisterPatient";
import CreateVisit from "./receptionist/CreateVisit";
import UploadMRI from "./receptionist/UploadMRI";

import AdminDashboard from "./admin/Dashboard";
import ManageUsers from "./admin/ManageUsers";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="patient/:patientId" element={<PatientHistory />} />

        </Route>

        {/* Receptionist */}
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute role="RECEPTIONIST">
              <ReceptionistLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ReceptionistDashboard />} />
          <Route path="register" element={<RegisterPatient />} />
          <Route path="visit" element={<CreateVisit />} />
          <Route path="upload" element={<UploadMRI />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
