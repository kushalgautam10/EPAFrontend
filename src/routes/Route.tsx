import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../features/Admin/Dashboard/Dashbard';
import ForgotPassword from '../pages/Auth/ForgetPassword';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ProtectedRoute from './ProtectedRoute';
import CategoryList from '../features/Admin/Category/categoryList';
import AdminLayout from '../components/layout/Admin/AdminLayout';
import UserLayout from '../components/layout/users/UserLayout';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Admin area with drawer + navbar; nested routes render into Outlet */}
       
      <Route path="/admin/*" element={<AdminLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<CategoryList/>} />
        <Route path="roles" element={<CategoryList/>} />
        <Route path="settings">
          <Route path="categories" element={<CategoryList/>} />
        </Route> 
      </Route>
      </Route>

      {/* Users area — full width layout (no admin drawer) */}
      <Route path="/users" element={<UserLayout />}>
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/users" replace />} />

      {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;