import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function DoctorLayout() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Doctor Panel</h2>
      <nav>
        <Link to="/doctor">Dashboard</Link> |{" "}
        <Link to="/doctor/patients">Patients</Link>
      </nav>
      <button onClick={logout}>Logout</button>
      <hr />
      <Outlet />
    </div>
  );
}

