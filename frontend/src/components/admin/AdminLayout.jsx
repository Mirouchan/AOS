import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar (self-managed hover state) */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar (no sidebar control needed) */}
        <AdminNavbar />

        {/* Content */}
        <main className="flex-1 bg-gray-50 dark:bg-dark-background overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;