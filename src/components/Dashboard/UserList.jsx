"use client";
import { useState } from "react";
import UserEditModal from "./UserEditModal";
import { Trash } from "@phosphor-icons/react";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    await fetch(`/api/v1/admin/users/${id}`, { method: "DELETE" });
    location.reload();  // Reload the page after deletion
  };

  return (
    <div className="mt-6">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-color-accent">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Password</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id } className="text-color-primary">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.username || "N/A"}</td>
              <td className="border px-4 py-2">{user.password || "N/A"}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button onClick={() => setSelectedUser(user)} className="mr-4">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <Trash size={16} weight="fill" className="text-color-red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserEditModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserList;
