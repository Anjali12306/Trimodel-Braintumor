import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
      <hr />
      <Outlet />
    </div>
  );
}
