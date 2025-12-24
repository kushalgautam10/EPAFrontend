import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/Admin/AdminLayout';
import DashboardPage from '../pages/Common/Dashbard';
import UserLayout from '../layout/users/UserLayout';
import UsersPage from '../pages/Common/UserPage';
import ForgotPassword from '../pages/Auth/ForgetPassword';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ProtectedRoute from './ProtectedRoute';
import CategoryList from '../pages/Category/categoryList';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Admin area with drawer + navbar; nested routes render into Outlet */}
       
      <Route path="/admin/*" element={<AdminLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="settings">
          <Route path="categories" element={<CategoryList/>} />
        </Route> 
        <Route path="users" element={<UsersPage />} />
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