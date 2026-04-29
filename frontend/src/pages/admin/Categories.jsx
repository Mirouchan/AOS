import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import PRODUCT_API from "../../services/productApi";

import { FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  // ---------------- FETCH ----------------
  const loadCategories = async () => {
    try {
      const res = await PRODUCT_API.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ---------------- ADD ----------------
  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await PRODUCT_API.post(
        "/categories/",
        { name },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setName("");
      loadCategories();
    } catch (err) {
      console.log("CATEGORY ERROR:", err.response?.data || err.message);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await PRODUCT_API.delete(`/categories/${id}/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">

        {/* HEADER */}
        <div className="mb-6 p-5 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <p className="text-sm text-gray-500">Manage product categories</p>
        </div>

        {/* FORM */}
        <div className="mb-6 p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">

          <h2 className="font-bold mb-3">Add Category</h2>

          <div className="flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="p-2 flex-1 bg-gray-100 dark:bg-gray-800 rounded"
            />

            <button
              onClick={handleSubmit}
              className="bg-yellow-500 text-black px-5 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-light-background dark:bg-gray-800 text-left">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4 font-medium">{cat.id}</td>

                    <td className="p-4 font-semibold">{cat.name}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500 text-white"
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

      </div>
    </AdminLayout>
  );
};

export default Categories;