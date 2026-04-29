import React, { useState } from "react";
import { updateUser } from "../../services/userService";

const EditUser = ({ user, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    username: user.username || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser(user.id, form);
      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="w-[420px] rounded-xl p-6 shadow-xl
        bg-light-background dark:bg-dark-background
        text-light-text dark:text-dark-text
        border border-gray-200 dark:border-gray-700">

        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 rounded-md border bg-transparent
            border-gray-300 dark:border-gray-700 outline-none"
          />

          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 rounded-md border bg-transparent
            border-gray-300 dark:border-gray-700 outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded-md border bg-transparent
            border-gray-300 dark:border-gray-700 outline-none"
          />

          <input
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 rounded-md border bg-transparent
            border-gray-300 dark:border-gray-700 outline-none"
          />

          <div className="flex justify-end gap-2 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-400 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md
              bg-light-primary dark:bg-dark-primary
              text-black font-semibold"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditUser;