import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers } from "../../services/userService";

import {
  FaUsers,
  FaProjectDiagram,
  FaDollarSign,
  FaTasks,
} from "react-icons/fa";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH REAL USERS
  const fetchUsersCount = async () => {
    try {
      const res = await getUsers();
      setUsersCount(res.data.length);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersCount();
  }, []);

  const stats = [
    { title: "Users", value: usersCount, icon: FaUsers },
    { title: "Projects", value: "320", icon: FaProjectDiagram }, // still mock (no API yet)
    { title: "Revenue", value: "$12,400", icon: FaDollarSign },
    { title: "Tasks", value: "89", icon: FaTasks },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-light-background dark:bg-dark-background min-h-screen">

        {/* HEADER */}
        <div className="mb-6 p-5 rounded-xl
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-md
          border border-gray-200 dark:border-gray-800">

          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Dashboard Overview
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time system statistics
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group p-6 rounded-2xl shadow-md
                bg-white dark:bg-gray-900
                border border-gray-100 dark:border-gray-800
                hover:shadow-xl hover:scale-[1.02]
                transition-all duration-200"
              >
                {/* ICON */}
                <div className="p-3 w-fit rounded-xl
                  bg-light-primary/10 dark:bg-dark-primary/10">
                  <Icon className="text-light-primary dark:text-dark-primary text-xl" />
                </div>

                {/* TITLE */}
                <p className="text-sm mt-4 text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>

                {/* VALUE */}
                <h3 className="text-2xl font-bold mt-1 text-light-text dark:text-dark-text">
                  {loading && item.title === "Users"
                    ? "Loading..."
                    : item.value}
                </h3>
              </div>
            );
          })}
        </div>

        {/* WELCOME SECTION */}
        <div className="p-6 rounded-2xl shadow-md
          bg-white dark:bg-gray-900
          border border-gray-100 dark:border-gray-800">

          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
            Welcome 👋
          </h3>

          <p className="mt-2 text-gray-500 dark:text-gray-400 leading-relaxed">
            This dashboard shows real system data like users count.
            More metrics can be connected from your backend later (projects, tasks, revenue).
          </p>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;