import { useEffect, useState } from "react";
import api from "../api/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h3>Manage Users</h3>
      {users.map(u => (
        <div key={u.id}>
          {u.email} — {u.role}
        </div>
      ))}
    </div>
  );
}
