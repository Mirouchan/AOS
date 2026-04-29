import React, { useState } from "react";
import { FaTachometerAlt, FaUsers, FaCog, FaList, FaBox  } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo/img.png";

const menu = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/admin", end: true },
  { name: "Users", icon: FaUsers, path: "/admin/users" },
  { name: "Categories", icon: FaList, path: "/admin/categories" },
  { name: "Products", icon: FaBox, path: "/admin/products" },
  { name: "Settings", icon: FaCog, path: "/admin/settings" },
];

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let timeout;

  return (
    <aside
      onMouseEnter={() => {
        clearTimeout(timeout);
        setSidebarOpen(true);
      }}
      onMouseLeave={() => {
        timeout = setTimeout(() => setSidebarOpen(false), 100);
      }}
      className={`
        flex flex-col flex-shrink-0
        ${sidebarOpen ? "w-64" : "w-20"}
        h-screen
        transition-all duration-300 ease-in-out
        bg-light-background dark:bg-dark-background
        text-light-text dark:text-dark-text
        shadow-lg
      `}
    >
      {/* LOGO */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        {sidebarOpen ? (
          <span className="text-lg font-bold text-light-primary dark:text-dark-primary transition-all duration-300">
            Kavanal Admin
          </span>
        ) : (
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 object-contain transition-all duration-300"
          />
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.end}
              title={!sidebarOpen ? item.name : ""}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-light-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${!sidebarOpen ? "justify-center" : ""}
                `
              }
            >
              <Icon className="w-5 h-5" />

              {sidebarOpen && (
                <span className="text-sm font-medium transition-all duration-300">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;