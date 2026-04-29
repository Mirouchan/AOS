import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Product";
import Categories from "../pages/admin/Categories";
import Settings from "../pages/admin/Settings";

import UserDashboard from "../pages/user/Dashboard";


const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* User routes */}
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;