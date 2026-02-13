import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ReceptionistLayout() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Receptionist Panel</h2>
      <button onClick={logout}>Logout</button>
      <hr />
      <Outlet />
    </div>
  );
}
