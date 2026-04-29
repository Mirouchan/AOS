import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers, deleteUser } from "../../services/userService";
import EditUser from "../../components/admin/EditUser";

import { FaEdit, FaTrash, FaUser } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">

        <div className="mb-6 p-5 rounded-xl
  bg-white/70 dark:bg-gray-900/70
  backdrop-blur-md
  border border-gray-200 dark:border-gray-800">

  <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
    Users Management
  </h1>

  <p className="text-sm text-gray-500 dark:text-gray-400">
    Control user accounts and permissions
  </p>
</div>

        {/* TABLE CARD */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : (
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-light-background dark:bg-gray-800 text-left">
                <tr className="text-light-text dark:text-dark-text">
                  <th className="p-4">ID</th>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4 font-medium">{user.id}</td>

                    <td className="p-4 font-semibold">
                      {user.first_name} {user.last_name}
                    </td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">{user.phone_number || "-"}</td>

                    <td className="p-4 flex gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex items-center gap-2 px-3 py-1 rounded-md
                        bg-light-primary dark:bg-dark-primary
                        text-black font-medium hover:opacity-90 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-2 px-3 py-1 rounded-md
                        bg-red-500 hover:bg-red-600 text-white transition"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

        {/* EDIT MODAL */}
        {isEditOpen && selectedUser && (
          <EditUser
            user={selectedUser}
            onClose={() => setIsEditOpen(false)}
            onUpdated={handleUpdated}
          />
        )}

      </div>
    </AdminLayout>
  );
};

export default Users;